import { describe, expect, test } from "vitest"
import { shallowMount } from "@vue/test-utils"
import Space from './index'

describe('Space', () => {
    const wrapper = shallowMount(Space, {
        props: {
            size: 100
        }
    })

    test('size', () => {
        expect((wrapper.element as HTMLDivElement).style.gap).toBe('100px')
        expect(wrapper.classes('ant-space-horizontal')).toBeTruthy()
    })

    test('direction', () => {
        expect(wrapper.classes('ant-space-horizontal')).toBeTruthy()
    })
})