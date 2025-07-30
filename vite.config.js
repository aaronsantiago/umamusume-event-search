import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV === 'production'
      ? '"production"'
      : '"development"'
  },
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
        /* other options */
      }
    }),
  ],
});
