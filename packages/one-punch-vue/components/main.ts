import type { App } from "vue"
import Button from './Button'
import Space from './Space'
import Input from './Input'

export { Button, Space, Input }

export default {
    install(app: App) {
        app.component(Button.name, Button)
        app.component(Space.name, Space)
        app.component(Input.name, Input)
    }
}