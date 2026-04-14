import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { FileTrieNode } from "../util/fileTrie"
import OverflowListFactory from "./OverflowList"
import { concatenateResources } from "../util/resources"

type OrderEntries = "sort" | "filter" | "map"

export interface Options {
  title?: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
  sortFn: (a: FileTrieNode, b: FileTrieNode) => number
  filterFn: (node: FileTrieNode) => boolean
  mapFn: (node: FileTrieNode) => void
  order: OrderEntries[]
}

const defaultOptions: Options = {
  folderDefaultState: "collapsed",
  folderClickBehavior: "link",
  useSavedState: true,
  mapFn: (node) => {
    return node
  },
  sortFn: (a, b) => {
    // Sort order: folders first, then files. Sort folders and files alphabeticall
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
      // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (!a.isFolder && b.isFolder) {
      return 1
    } else {
      return -1
    }
  },
  filterFn: (node) => node.slugSegment !== "tags",
  order: ["filter", "map", "sort"],
}

export type FolderState = {
  path: string
  collapsed: boolean
}

let numExplorers = 0
export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const Explorer: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
    const id = `explorer-${numExplorers++}`

    return (
      <div
        class={classNames(displayClass, "explorer")}
        data-behavior={opts.folderClickBehavior}
        data-collapsed={opts.folderDefaultState}
        data-savestate={opts.useSavedState}
        data-data-fns={JSON.stringify({
          order: opts.order,
          sortFn: opts.sortFn.toString(),
          filterFn: opts.filterFn.toString(),
          mapFn: opts.mapFn.toString(),
        })}
      >
        <div id={id} class="explorer-content" aria-expanded={true} role="group">
          <OverflowList class="explorer-ul" />
        </div>
        <template id="template-file">
          <li>
            <a href="#"></a>
          </li>
        </template>
        <template id="template-folder">
          <li>
            <div class="folder-container">
              <div>
                <button class="folder-button">
                  <span class="folder-title"></span>
                </button>
              </div>
            </div>
            <div class="folder-outer">
              <ul class="content"></ul>
            </div>
          </li>
        </template>
      </div>
    )
  }

  Explorer.css = style
  Explorer.afterDOMLoaded = concatenateResources(script, overflowListAfterDOMLoaded)
  return Explorer
}) satisfies QuartzComponentConstructor
