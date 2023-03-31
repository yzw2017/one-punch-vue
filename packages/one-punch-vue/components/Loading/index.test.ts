import { describe, expect, test } from "vitest"
import { shallowMount } from "@vue/test-utils"
import Loading from './index'
import directivesLoading from './create-loading-like-directive'

const Component = {
    data() {
        return {
            show: true
        }
    },
    template: '<div v-loading="show">Foo</div>'
}

describe('Loading', () => {
    const wrapper = shallowMount(Component, {
        global: {
            directives: {
                loading: directivesLoading(Loading)
            }
        }
    })

    test('loading', async () => {
        expect(wrapper.find('.g-relative').exists()).toBeTruthy()
        expect(wrapper.find('svg').exists()).toBeTruthy()

        await wrapper.setData({ show: false })

        expect(wrapper.find('svg').exists()).toBeFalsy()
    })
})