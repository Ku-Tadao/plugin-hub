import path from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
// import tailwindcss from '@tailwindcss/vite'
import unocssPlugin from '@unocss/vite'
import yaml from 'yaml'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    solidPlugin(),
    // tailwindcss(),
    unocssPlugin(),
    yamlLoader(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib/'),
      '@pengu': path.resolve(__dirname, 'src/lib/pengu/'),
      '@components': path.resolve(__dirname, 'src/components/'),
    },
  },
})

/**
 * Vite plugin to load YAML files
 * @returns Vite plugin to load YAML files
 */
function yamlLoader() {
  return {
    name: 'yaml-loader',
    transform(src: string, id: string) {
      if (id.endsWith('.yaml') || id.endsWith('.yml')) {
        const data = yaml.parse(src)
        return {
          code: `export default ${JSON.stringify(data)};`,
          map: null,
        }
      }
    },
  }
}