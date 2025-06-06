import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/minaroom/",  // THIS IS IMPORTANT: must match your GitHub repo name
  plugins: [react()],
})
