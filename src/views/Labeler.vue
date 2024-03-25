<script setup>

/*
* TODO: If there are labeled tracks in the database, but no unlabeled tracks, show a message to the user
* TODO: When there are no more tracks to label, show a message to the user
* TODO: Show error message
* TODO: Standardize string messages
*
*/
    import { ref, onBeforeMount, onMounted, computed} from 'vue';
    import TrackCardLabeler from '../components/TrackCardLabeler.vue';
    //Firebase and Firestore
    import {collection, query, limit, where, addDoc, getDocs, doc, updateDoc, orderBy, deleteDoc, getCountFromServer} from 'firebase/firestore';
    import db from '../helpers/firebase/init.js';


    import audioFeatures from '../assets/audio_features.json';

    const isPopulating = ref(false);
    const isPopulated = ref(false);
    const loadingPop = ref(true);
    const currentIdx = ref(0);
    const currentTracks = ref([]);
    const localLabeledTracks = ref([]);

    const uiMessages = ref([]);

    const hasUIMessages = computed(()=>{
        return uiMessages.value.length > 0;
    })
    

    onBeforeMount(async () => {
        //Check if the database already has unlabeled tracks
        try{
            const trackPage = await fetchNewTrackPage();
            if(trackPage !== null){// there are tracks to label
                isPopulated.value = true;
                currentTracks.value = trackPage;
            }else{//No tracks in the page
                //Check if there are any labeled tracks in the database at all
                const q = query(collection(db, 'audio_features'), where('label.mood', '!=', ''));
                const querySnapshot = await getCountFromServer(q);
                if(querySnapshot.data().count > 0){
                    isPopulated.value = true;
                    //There are labeled tracks in the database
                    uiMessages.value.push("There are labeled tracks in the database, but no more unlabeled tracks. Please check back later.");
                }else{
                    //No tracks in the database
                    isPopulated.value = false;
                    uiMessages.value.push("No tracks in the database, it's time to populate it.");
                }
            }
            loadingPop.value = false;
            
        }catch(e){
            console.error("Error fetching unlabeled tracks: ", e);
            //#TODO: Show a message to the user
            uiMessages.value.push("Error fetching tracks. Please try again later.");
        }

    });


    onMounted(async () => {

    });

    async function fetchNewTrackPage() {

        try {
            const q = query(collection(db, 'audio_features'), where('label.mood', '==', ''), limit(5), orderBy('popularity'));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size > 0) {
                const newTracks = querySnapshot.docs.map(doc => {
                    return { docId: doc.id, ...doc.data() };
                });
                return newTracks;
            } else {
                return null;
            }
        } catch (e) {
            console.error("Error fetching tracks: ", e);
            uiMessages.value.push("Error fetching tracks. Please try again later.");
            return null;
        }

    }


    async function populateDB() {
        isPopulating.value = true;
        const keysToKeep = ['id','artists','name','album','audio_features','popularity','uri','external_ids'];
        for (const track of audioFeatures) {
            const newTrack = {};
            for (const key of keysToKeep) {
                if(track.hasOwnProperty(key)) {
                    newTrack[key] = track[key];
                }
            }
            newTrack['label'] = {mood: ''};
            //Try to add the track to the database
            try {
                const docRef = await addDoc(collection(db, "audio_features"), newTrack);
                console.log("Document written with ID: ", docRef.id);
                currentIdx.value++;
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }
        isPopulating.value = false;
        isPopulated.value = true;


    }
    async function assignMood(docId, mood) {
        
        //Push the labeled track to the local array
        const track = currentTracks.value.find(track => track.docId === docId);
        track.label.mood = mood;
        localLabeledTracks.value.push(track);
        //Remove the track from the currentTracks array
        currentTracks.value = currentTracks.value.filter(track => track.docId !== docId);

        //Save the labeled track to the database
        const trackRef = doc(db, "audio_features", docId);
        try{
            await updateDoc(trackRef, {
                "label.mood": mood
            });
            //Remove track from local track array
            localLabeledTracks.value = localLabeledTracks.value.filter(track => track.docId !== docId);
            console.log(localLabeledTracks.value);
        }catch(e){
            console.error("Error assigning mood: ", e);
            //userFeedback.value = "Error assigning mood";
            uiMessages.value.push("Error assigning mood.");
            return false;
        }

        //If there are no more tracks to label, fetch a new page
        if(currentTracks.value.length == 0){
            const newTracks = await fetchNewTrackPage();
            if(newTracks !== null) {
                currentTracks.value = newTracks;
            }else{
                uiMessages.value.push('No more tracks to label');
            }
        }
    }
    
    async function discardTrack(docId){
        try{
            console.log(currentTracks.value);
            await deleteDoc(doc(db, "audio_features", docId));

            //Remove track from currentTrack
            currentTracks.value = currentTracks.value.filter(track => track.docId !== docId);
            //console.log("Document successfully deleted!");
            uiMessages.value.push("Track discarded.");
            //If there are no more tracks to label, fetch a new page
            if(currentTracks.value.length == 0){
                const newTracks = await fetchNewTrackPage();
                if(newTracks !== null) {
                    currentTracks.value = newTracks;
                }else{
                    uiMessages.value.push('No more tracks to label');
                }
            }
        }catch(e){
            console.error("Error removing document: ", e);
            uiMessages.value.push("Error removing track.");
        }
    }
</script>

<template>
<div class="container mx-auto h-screen">
    <div v-if="hasUIMessages" class="toast toast-top toast-start">
        
    </div>
    <div class=" p-4 flex">
        <div class="flex-col w-3/4">
            <h1 class="text-2xl">Maestro: Labeler</h1>
            <p v-if="!isPopulated && !isPopulating" class="text-sm">No items in the database. Please start populating it.</p>
            <p v-if="isPopulating" class="text-sm">Lean back and relax. We're doing the hard work.</p>
            <p v-if="isPopulated && !isPopulating" class="text-sm">You may now proceed with labeling your dataset. Thanks for your hard work.</p>
        </div>

        <div v-if="loadingPop" class="flex-col w-1/4 text-center content-center">
            <p>Checking DB <span class="loading loading-xs loading-dots"></span></p>
            
        </div>
        <div class="flex-col w-1/4 text-center content-center" v-show="!loadingPop">
            <button v-if="!isPopulating && !isPopulated" class="btn btn-accent" @click="populateDB">Populate DB</button>
            <div v-if="isPopulating">
                <p class="text-center pt-2 -mb-1">{{currentIdx}} of {{ audioFeatures.length }} records</p>
                <progress v-if="isPopulating" class="progress w-56" :value="currentIdx" :max="audioFeatures.length"></progress>
            </div>
            <div v-if="isPopulated" class="badge badge-success">Database Populated</div>
        </div>
    </div>

    <div v-if="isPopulated && !isPopulating && !loadingPop" class="flex flex-col place-items-center space-y-4">
      <TrackCardLabeler
            v-for="track in currentTracks"
            :key="track.id"
            :docId="track.docId"
            :trackId="track.id"
            :trackName="track.name"
            :artistName="track.artists[0].name"
            :albumName="track.album.name"
            :albumImage="track.album.images[1].url"
            @assignMood="assignMood"
            @discardTrack="discardTrack"
            />
    </div>

    
</div>
</template>

<style scoped>

</style>