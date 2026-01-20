// re-export react-router's SSR entry
export { generateHTML } from "@react-router/dev/config/default-rsc-entries/entry.ssr";

// Nitro uses SSR entry as the main entry point, which delegates to RSC
export default {
  fetch: async (request: Request) => {
    const rscEntryModule = await import.meta.viteRsc.loadModule<any>('rsc', 'index')
    return rscEntryModule.default.fetch(request)
  },
}
