import { defineComponent } from "vue"

import "./index.scss"

export default defineComponent({
    name: "opLoading",
    render() {
        return (
            <div class="el-loading-mask">
                <div class="el-loading-spinner">
                <svg viewBox="25 25 50 50" class="circular">
                    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                </svg>
                </div>
            </div>
        )
    }
})