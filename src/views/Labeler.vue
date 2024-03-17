<script setup>
    import { ref, onBeforeMount} from 'vue';
    
    //Firebase and Firestore
    import {collection, addDoc, getDocs} from 'firebase/firestore';
    import db from '../helpers/firebase/init.js';


    import audioFeatures from '../assets/audio_features.json';
    const availableLabels = ref(['Happy','Sad']);
    const isPopulating = ref(false);
    const isPopulated = ref(false);
    const loadingPop = ref(true);
    const currentIdx = ref(0);

    onBeforeMount(async () => {
        //Check firestore if the database is already populated
        const querySnapshot = await getDocs(collection(db, "audio_features"),{ limit: 10});
        if(querySnapshot.size > 0) {
            isPopulated.value = true;
            //isPopulated.value = true;
        }else{
            isPopulated.value = false;
        }
        loadingPop.value = false;
    });


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

            //Try to add the track to the database
            try {
                const docRef = await addDoc(collection(db, "audio_features"), newTrack);
                console.log("Document written with ID: ", docRef.id);
                currentIdx.value++;
            } catch (e) {
                console.error("Error adding document: ", e);
            }


            //currentIdx.value++;

                /*const docRef = await addDoc(collection(db, "audio_features"), track);
                console.log("Document written with ID: ", docRef.id);*/
        

            //Below, a placeholder for the actual process of adding the data to the database
            /*await new Promise(resolve => setTimeout(resolve, 50));
            if(currentIdx.value == audioFeatures.length) {
                isPopulating.value = false;
                isPopulated.value = true;
            }*/
        }
        isPopulating.value = false;
        isPopulated.value = true;


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
</div>
</template>

<style scoped>

</style>