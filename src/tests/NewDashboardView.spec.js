import {mount } from '@vue/test-utils';
import {describe, it, expect, beforeEach, afterEach} from 'vitest';

import NewDashboard from "../views/NewDashboardView.vue";

describe('NewDashboard', async()=>{
    expect(NewDashboard).toBeTruthy();

    const wrapper = mount(NewDashboard);

    it('is defined', async()=>{
        expect(wrapper).toBeDefined();
    });
    it('has an outer container', async()=>{
        expect(wrapper.find('.outer-container').exists()).toBe(true);
    });

    it('has a sidebar', async()=>{
        expect(wrapper.find('.sidebar').exists()).toBe(true)
    });


});
