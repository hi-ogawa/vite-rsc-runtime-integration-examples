import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr'],
      },
    }),
    reactRouterRSC(),
    rsc(),
    devtoolsJson(),
  ],
  environments: {
    ssr: {
      optimizeDeps: {
        exclude: ['react-router'],
        entries: ['./app/entry.ssr.ts'],
      },
    },
    rsc: {
      optimizeDeps: {
        exclude: ['react-router'],
      },
    },
  }
});
