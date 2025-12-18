# Pengu Plugin Hub

## Development

- Install .NET 9.0 runtime
- Download this [debug-toolset.zip](https://github.com/user-attachments/files/24238760/debug-toolset.zip) and extract
- Run install.bat as admin
- Run loader.exe
- Run `pnpm dev` (in this repo)
- Open Riot Client
- Press D in loader.exe's console to open DevTools

## Notes

- Cannot use TailwindCSS V4 (Riot Client is Chromium 108)
- Use UnoCSS + Wind3 preset (already added)
- Use font family RiotSans or Inter
- Resue Riot Client CSS --var (see its styles.css)
- The core types `@pengu/*` are not implemented