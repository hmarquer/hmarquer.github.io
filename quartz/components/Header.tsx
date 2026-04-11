import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  flex-wrap: nowrap;
  gap: 1.5rem;
}

header .page-title {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

header .search {
  flex: 0 1 12rem;
  min-width: 8rem;
}

header .explorer {
  flex: 0 1 auto;
}

@media all and (max-width: 800px) {
  header {
    gap: 0.75rem;
    align-items: center;
    flex-wrap: nowrap;
  }

  header .page-title {
    flex: 1 1 auto;
  }

  header .search {
    flex: 0 1 10rem;
    min-width: 7rem;
  }

  header > * {
    flex-shrink: 1;
  }

  header .spacer {
    display: none;
  }
}

@media all and (max-width: 700px) {
  header .explorer {
    display: none;
  }
}

@media all and (max-width: 520px) {
  header .search {
    display: none;
  }
}
`

export default (() => Header) satisfies QuartzComponentConstructor
