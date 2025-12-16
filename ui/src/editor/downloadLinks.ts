import {isActive, mergeAttributes, Node, ToolboxItem, VueNodeViewRenderer} from "@halo-dev/richtext-editor";
import {markRaw} from "vue";
import MdiDeleteForeverOutline from "~icons/mdi/delete-forever-outline?color=red";
import MdiArrowULeftBottom from "~icons/mdi/arrow-u-left-bottom";
import MdiDownloadCircleOutline from "~icons/mdi/download-circle-outline";
import type {Editor} from "@tiptap/core";
import type {EditorState} from "@tiptap/pm/state";
import {deleteNode} from "@/utils/delete-node";
import DownloadLinksView from "@/editor/DownloadLinksView.vue";

export interface DownloadLinkItemAttr {
  url: string;
  filename: string;
  source: string; // 例如: 百度网盘、阿里云网盘...
  code?: string;
  icon?: string; // 可选自定义图标 URL 或内置标识
}

declare module "@halo-dev/richtext-editor" {
  interface Commands<ReturnType> {
    DownloadLinks: {
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
          return { "data-links": JSON.stringify(attributes.links || []) };
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

  renderHTML({ HTMLAttributes }) {
    return ["download-links", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      addDownloadLinks:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name, attrs: { links: [] } });
        },
      setDownloadLinksAttrs:
        (attrs: { links: DownloadLinkItemAttr[] }) =>
        ({ commands }) => {
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
      getToolboxItems({ editor }: { editor: Editor }) {
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
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: "downloadLinksBubbleMenu",
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state, DownloadLinks.name);
          },
          items: [
            {
              priority: 122521,
              props: {
                icon: markRaw(MdiDeleteForeverOutline),
                title: "删除",
                action: ({ editor }: { editor: Editor }) => {
                  deleteNode(DownloadLinks.name, editor);
                },
              },
            },
            {
              priority: 122522,
              props: {
                icon: markRaw(MdiArrowULeftBottom),
                title: "换行",
                action: ({ editor }: { editor: Editor }) => {
                  editor.commands.insertContentAt(
                    editor.state.selection.$from.pos + 1,
                    [{ type: "paragraph", content: "" }],
                    { updateSelection: true }
                  );
                  editor.commands.focus(editor.state.selection.$from.pos, { scrollIntoView: true });
                },
              },
            },
          ],
        };
      },
      getDraggable() {
        return {
          getRenderContainer({ dom }: { dom: HTMLElement }) {
            let container = dom;
            while (container && !container.hasAttribute("data-node-view-wrapper")) {
              container = container.parentElement as HTMLElement;
            }
            return { el: container };
          },
          allowPropagationDownward: true,
        };
      },
    };
  },
});

export default DownloadLinks;



