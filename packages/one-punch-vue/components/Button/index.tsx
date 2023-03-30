import { 
    defineComponent,  
    computed,
    type PropType,
} from "vue"

import "./index.scss"

export default defineComponent({
    name: 'opButton',
    props: {
        type: {
            type: String as PropType<'normal' | 'primary' | 'dashed' | 'link' | 'text'>,
            default: 'normal'
        },
        size: {
            type: String as PropType<'lg' | 'md' | 'sm'>,
            default: 'md'
        },
        htmlType: {
            type: String as PropType<'button' | 'submit' | 'reset'>,
            default: 'button'
        },
    },
    setup(props, { slots, emit }) {
        return () => {
            const { type, size, htmlType } = props
            const classes = computed(() => {
                return {
                    'ant-btn': true,
                    [`ant-btn-${type}`]: type,
                    [`ant-btn-${size}`]: size,
                }
            })
            const clickFn = () => {
                emit('click')
            }
            return <button class={classes.value} onClick={clickFn} type={htmlType}>{ slots.default?.() }</button>
        }
    }
})