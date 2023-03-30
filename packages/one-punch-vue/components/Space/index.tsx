import { 
    defineComponent,  
    computed,
    type PropType,
} from "vue"

import "./index.scss"

export default defineComponent({
    name: 'opSpace',
    props: {
        direction: {
            type: String as PropType<'vertical' | 'horizontal'>,
            default: 'horizontal'
        },
        size: {
            type: Number,
            default: 8
        }
    },
    setup(props, { slots }) {
        return () => {
            const { direction, size } = props
            const classes = computed(() => {
                return {
                    'ant-space': true,
                    [`ant-space-${direction}`]: direction,
                }
            })
            return <div class={classes.value} style={{gap: size + 'px'}}>{ slots.default?.() }</div>
        }
    }
})