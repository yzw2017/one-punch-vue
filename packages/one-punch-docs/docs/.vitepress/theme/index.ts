import DefaultTheme from 'vitepress/theme'
import OnePunchVue from 'one-punch-vue'
import "one-punch-vue/css"

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.use(OnePunchVue)
    }
}