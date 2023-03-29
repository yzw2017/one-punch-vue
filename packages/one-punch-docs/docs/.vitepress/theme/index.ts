import DefaultTheme from 'vitepress/theme'
import OnePunchVue from 'one-punch-vue'

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.use(OnePunchVue)
    }
}