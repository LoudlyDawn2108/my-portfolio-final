import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Use the repository subpath for GitHub Pages so runtime asset references
  // that include `import.meta.env.BASE_URL` resolve correctly.
  base: '/my-portfolio-final/',
});
