export class ThemeSelector {
  static setTheme(themeName) {
    document.body.setAttribute("data-theme", themeName);
  }
}
