type ThemeMode = "auto" | "light" | "dark"
type ResolvedTheme = "light" | "dark"

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"

const getResolvedTheme = (mode: ThemeMode): ResolvedTheme =>
  mode === "auto" ? getSystemTheme() : mode

let currentMode = (localStorage.getItem("theme") as ThemeMode | null) ?? "auto"
document.documentElement.setAttribute("data-theme-mode", currentMode)
document.documentElement.setAttribute("saved-theme", getResolvedTheme(currentMode))

const emitThemeChangeEvent = (theme: ResolvedTheme) => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const applyMode = (mode: ThemeMode) => {
    currentMode = mode
    const resolvedTheme = getResolvedTheme(mode)
    document.documentElement.setAttribute("data-theme-mode", mode)
    document.documentElement.setAttribute("saved-theme", resolvedTheme)
    localStorage.setItem("theme", mode)
    emitThemeChangeEvent(resolvedTheme)
  }

  const switchTheme = () => {
    const nextMode: ThemeMode =
      currentMode === "auto" ? "dark" : currentMode === "dark" ? "light" : "auto"
    applyMode(nextMode)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    if (currentMode !== "auto") return
    const newTheme: ResolvedTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
