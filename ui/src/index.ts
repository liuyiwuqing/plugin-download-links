import {definePlugin} from '@halo-dev/ui-shared'
import {DownloadLinksExtension} from "@/editor";

export default definePlugin({
    components: {},
    routes: [],
    extensionPoints: {
        "default:editor:extension:create": () => {
            return [DownloadLinksExtension];
        },
    },
})
