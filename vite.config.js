import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Quantori_JS_Boot_Camp",
  plugins: [react()],
})
