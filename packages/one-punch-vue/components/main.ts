import type { App } from "vue"
import Button from './Button'
import Space from './Space'
import Input from './Input'
import Validate from './Validate/index.vue'

import Loading from './Loading'
import directivesLoading from './Loading/create-loading-like-directive'

export { Button, Space, Input, Validate }

export default {
    install(app: App) {
        app.component(Button.name, Button)
        app.component(Space.name, Space)
        app.component(Input.name, Input)
        app.component(Validate.name, Validate)
        app.directive('loading', directivesLoading(Loading))
    }
}