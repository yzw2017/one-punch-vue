import {
    defineComponent,
    computed,
    type PropType,
} from "vue"

import "./index.scss"

export default defineComponent({
    name: 'opInput',
    props: {
        modelValue: {
            type: String,
        },
        size: {
            type: String as PropType<'lg' | 'md' | 'sm'>,
            default: 'md',
        },
        status: {
            type: String as PropType<'error' | 'warning'>
        },
    },
    emits: ['update:modelValue', 'change', 'blur'],
    setup(props, { emit }) {
        return () => {
            const { size, status, modelValue } = props
            const classes = computed(() => {
                return {
                    'ant-input': true,
                    [`ant-input-${size}`]: size,
                    [`ant-input-status-${status}`]: status,
                }
            })

            const onInputChange = (e: Event) => {
                const target = e.target as HTMLInputElement
                emit('change', target.value)
                emit('update:modelValue', target.value)
            }

            const onBlur = (e: Event) => {
                const target = e.target as HTMLInputElement
                emit('blur', target.value)
            }

            return <input 
                class={classes.value} 
                value={modelValue} 
                onInput={onInputChange} 
                onBlur={onBlur}
            />;
        }
    }
})