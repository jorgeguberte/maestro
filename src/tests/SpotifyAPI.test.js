import {describe, it, expect, beforeEach, afterEach} from 'vitest';

import {mount} from '@vue/test-utils';

import { useSpotifyStore } from '../stores/SpotifyAPI';
import { createPinia, setActivePinia } from 'pinia';

const token = 'BQAshi5agrUcVLSHM223L4OuCA-wsFue9nN2v20SCw28OAfVa62m5czbQDQ2pqNhpnsna6RrmfihiFdzbSfIIBRdLfkL6WB1iG7Ead2Ct_07H9Gpcy4vvOkl-aFGVcUj7iiNG22IecqJ5MZcw3EsiHLO9r_hUNj9_NrK6MordPZjiLGjYPFawicmSPYWxw0GO-Mu1psCmyY9rgPRVLOw-w9Hs0ufCQ';

describe('suite',async()=>{
    beforeEach(()=>{
        setActivePinia(createPinia());
    })

    it('is declared and setup', async()=>{
        const spotifyStore = useSpotifyStore();
        expect(spotifyStore.spotifyState).toBeTruthy();
    });

    it('produces an auth url', ()=>{
        const spotifyStore = useSpotifyStore();
        expect(spotifyStore.getAuthURL()).toBeTruthy();
    });

    it('receives error status from invalid endpoint', async()=>{
        const spotifyStore = useSpotifyStore();
        await spotifyStore.setToken(token);
        const endpoint_response = await spotifyStore.getEndpoint('e');
        expect(endpoint_response).toBeTruthy()
    });

    /*it('gets an endpoint', async()=>{
        const spotifyStore = useSpotifyStore();
        spotifyStore.token = token;
        
        const response =  await spotifyStore.getEndpoint('/me');
        console.log(response);
        expect(response).toBeTruthy();
        console.log(response);
    })*/

    /*it('sets an user', async()=>{
    });*/


})