import {describe, it, expect, beforeEach, afterEach} from 'vitest';

import {mount} from '@vue/test-utils';
import DummyComponent from "../components/DummyComponent.vue";


describe('suite',async()=>{
    let wrapper = null;

    const strings = {
        header: 'Ohai'
    };
    beforeEach(async()=>{
        wrapper = mount(DummyComponent, {propsData:{header: strings.header}});
    });

    afterEach(async()=>{
        wrapper.unmount();
        wrapper = null;
    });
    
    it('is defined', async()=>{
        expect(wrapper).toBeDefined();
    });

    it('displays the header', async()=>{
        expect(wrapper.find('h1').text()).toBe(strings.header);
    } )

})