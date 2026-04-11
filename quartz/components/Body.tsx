// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Body: QuartzComponent = ({ children, displayClass }: QuartzComponentProps) => {
  return <div id="quartz-body" class={classNames(displayClass)}>{children}</div>
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
