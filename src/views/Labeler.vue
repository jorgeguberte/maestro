<script setup>
    import { ref, onBeforeMount, onMounted} from 'vue';
    import TrackCardLabeler from '../components/TrackCardLabeler.vue';
    //Firebase and Firestore
    import {collection, query, limit, where, addDoc, getDocs, doc, updateDoc} from 'firebase/firestore';
    import db from '../helpers/firebase/init.js';


    import audioFeatures from '../assets/audio_features.json';
    const availableLabels = ref(['Upbeat','Cheerful','Calm','Meditative']);
    const isPopulating = ref(false);
    const isPopulated = ref(false);
    const loadingPop = ref(true);
    const currentIdx = ref(0);
    const currentTracks = ref([]);

    onBeforeMount(async () => {
        //Check firestore if the database is already populated
        const querySnapshot = await getDocs(collection(db, "audio_features"),{ limit: 1});
        if(querySnapshot.size > 0) {
            isPopulated.value = true;
        }else{
            isPopulated.value = false;
        }
        loadingPop.value = false;
    });

    onMounted(async () => {
        /*const tracksRef = collection(db, "audio_features");
        const q = query(tracksRef, where("label.mood", "==", ""), limit(10));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            currentTracks.value.push(doc.data());
        });*/
        await fetchNewTrackPage();
    });

    async function fetchNewTrackPage(){
        const tracksRef = collection(db, "audio_features");
        const q = query(tracksRef, where("label.mood", "==", ""), limit(10));

        const querySnapshot = await getDocs(q);
        if(querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                let track = {docId: doc.id, ...doc.data()};
                currentTracks.value.push(track);
            });
            console.log(currentTracks.value)
        }else{
            console.log('No more tracks to label');
            return;
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
        console.log('Assigning mood to track', docId, mood);
        //Update the track in the database
        const trackRef = doc(db, "audio_features", docId);
        try{
            await updateDoc(trackRef, { "label.mood": mood });
            currentTracks.value = currentTracks.value.filter(track => track.docId !== docId);

        }catch(e){
            console.error("Error updating document: ", e);
        }
        //Remove the track from the currentTracks array
        //currentTracks.value = currentTracks.value.filter(track => track.id !== trackId);
        //Fetch a new page of tracks
        //await fetchNewTrackPage();
    }
    
</script>

<template>
<div class="container mx-auto h-screen">
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
            />
    </div>

    
</div>
</template>

<style scoped>

</style>