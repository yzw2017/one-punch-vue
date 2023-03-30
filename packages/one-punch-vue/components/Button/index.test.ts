import { describe, expect, test, vi } from "vitest"
import { shallowMount } from "@vue/test-utils"
import Button from './index'

describe('Button', () => {
    const fn = vi.fn()
    const wrapper = shallowMount(Button, {
        props: {
            type: 'primary',
            onClick: fn
        },
        slots: {
            default: 'Hello'
        }
    })

    test('theme', () => {
        expect(wrapper.text()).toBe('Hello')
        expect(wrapper.classes('ant-btn-primary')).toBeTruthy()
    })

    test('click', () => {
        wrapper.trigger('click')
        expect(fn).toHaveBeenCalled()
    })
})