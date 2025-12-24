import {
    type Editor,
    type EditorState,
    isActive,
    mergeAttributes,
    Node,
    type Range,
    ToolboxItem,
    VueNodeViewRenderer
} from "@halo-dev/richtext-editor";
import {markRaw} from "vue";
import MdiDeleteForeverOutline from "~icons/mdi/delete-forever-outline?color=red";
import MdiArrowULeftBottom from "~icons/mdi/arrow-u-left-bottom";
import MdiDownloadCircleOutline from "~icons/mdi/download-circle-outline";
import {deleteNode} from "@/utils/delete-node";
import DownloadLinksView from "@/editor/DownloadLinksView.vue";

export interface DownloadLinkItemAttr {
    url: string;
    filename: string;
    source: string;
    code?: string;
    icon?: string;
}

declare module "@halo-dev/richtext-editor" {
    interface Commands<ReturnType> {
        "download-links": {
            addDownloadLinks: () => ReturnType;
            setDownloadLinksAttrs: (attrs: { links: DownloadLinkItemAttr[] }) => ReturnType;
        };
    }
}

const DownloadLinks = Node.create({
    name: "download-links",
    group: "block",
    atom: true,
    selectable: true,
    draggable: true,

    addAttributes() {
        return {
            links: {
                default: [] as DownloadLinkItemAttr[],
                parseHTML: (element: HTMLElement) => {
                    const data = element.getAttribute("data-links");
                    try {
                        return data ? JSON.parse(data) : [];
                    } catch (e) {
                        return [];
                    }
                },
                renderHTML: (attributes: { links: DownloadLinkItemAttr[] }) => {
                    return {"data-links": JSON.stringify(attributes.links || [])};
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "download-links",
            },
        ];
    },

    renderHTML({HTMLAttributes}) {
        return ["download-links", mergeAttributes(HTMLAttributes)];
    },

    addCommands() {
        return {
            addDownloadLinks:
                () =>
                    ({commands}: { commands: any }) => {
                        return commands.insertContent({type: this.name, attrs: {links: []}});
                    },
            setDownloadLinksAttrs:
                (attrs: { links: DownloadLinkItemAttr[] }) =>
                    ({commands}: { commands: any }) => {
                        return commands.updateAttributes(this.name, attrs);
                    },
        };
    },

    addNodeView() {
        return VueNodeViewRenderer(DownloadLinksView as any);
    },

    addOptions() {
        return {
            ...this.parent?.(),
            getToolboxItems({editor}: { editor: Editor }) {
                return {
                    priority: 122520,
                    component: markRaw(ToolboxItem),
                    props: {
                        editor,
                        icon: markRaw(MdiDownloadCircleOutline),
                        title: "插入下载信息",
                        action: () => {
                            editor.chain().focus().addDownloadLinks().run();
                        },
                    },
                };
            },
            getCommandMenuItems() {
                return {
                    priority: 122520,
                    icon: markRaw(MdiDownloadCircleOutline),
                    title: "插入下载信息",
                    keywords: ["url", "download", "云盘"],
                    command: ({editor, range}: { editor: Editor; range: Range }) => {
                        editor.chain().focus().deleteRange(range).addDownloadLinks().run();
                    },
                };
            },
            getBubbleMenu({editor}: { editor: Editor }) {
                return {
                    pluginKey: "downloadLinksBubbleMenu",
                    shouldShow: ({state}: { state: EditorState }) => {
                        return isActive(state, DownloadLinks.name);
                    },
                    items: [
                        {
                            priority: 122521,
                            props: {
                                icon: markRaw(MdiDeleteForeverOutline),
                                title: "删除",
                                action: ({editor}: { editor: Editor }) => {
                                    deleteNode(DownloadLinks.name, editor);
                                },
                            },
                        },
                        {
                            priority: 122522,
                            props: {
                                icon: markRaw(MdiArrowULeftBottom),
                                title: "换行",
                                action: ({editor}: { editor: Editor }) => {
                                    editor.commands.insertContentAt(
                                        editor.state.selection.$from.pos + 1,
                                        [{type: "paragraph", content: ""}],
                                        {updateSelection: true}
                                    );
                                    editor.commands.focus(editor.state.selection.$from.pos, {scrollIntoView: true});
                                },
                            },
                        },
                    ],
                };
            },
        };
    },
});

export default DownloadLinks;



