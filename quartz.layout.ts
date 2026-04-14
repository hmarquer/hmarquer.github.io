import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.Explorer({
      filterFn: (node) => node.slugSegment !== "tags" && node.isFolder === true && node.data !== null
    }),
    Component.Search(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/hmarquer",
    //   "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    Component.TagList(), // Uncomment to display tags
  ],
  left: [],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false })
],
  left: [],
  right: [],
}
