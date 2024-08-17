## tauri-react-playground

### Based on Tauri packaging: https://github.com/tauri-apps/tauri

### A local playground for real-time development of simple components
### Playground moved to course

### The editor initialization will automatically download the dependent ts type package, and it is necessary to ensure that the network is functioning properly

## Start
Install `node_modules`:

```bash
pnpm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
pnpm run dev
```

## Packaging for Production

To package apps for the local platform:

```bash
pnpm tauri build
```