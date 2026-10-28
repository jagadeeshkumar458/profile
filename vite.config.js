import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build work at a domain root (Vercel, Netlify)
// and under a sub-path (GitHub Pages: username.github.io/repo-name/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
