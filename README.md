# Vite RSC and Environment Plugin Examples

This repository demonstrates how to use [`@vitejs/plugin-rsc`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) with different runtime providers that implement the `__VITE_ENVIRONMENT_RUNNER_IMPORT__` convention, including [React Router framework mode](https://reactrouter.com/how-to/react-server-components) examples.

## Background

React Server Components (RSC) require cross-environment module loading - the RSC environment needs to load modules from the SSR environment, and vice versa. Vite's `import.meta.viteRsc.loadModule` API enables this, but by default it assumes all environments run in the main Vite process via `RunnableDevEnvironment`.

Frameworks like Nitro and Cloudflare Workers run environments in separate workers that can't directly access the main Vite process. The `__VITE_ENVIRONMENT_RUNNER_IMPORT__` convention solves this by providing a global function that runtime providers can implement to handle cross-environment module loading in their architecture.

```typescript
globalThis.__VITE_ENVIRONMENT_RUNNER_IMPORT__ = async (
  environmentName: string,
  id: string
): Promise<any> => {
  // Runtime-specific implementation
}
```

### References

- [PR #1037: Introduce `__VITE_ENVIRONMENT_RUNNER_IMPORT__` convention](https://github.com/vitejs/vite-plugin-react/pull/1037)
- [plugin-rsc documentation](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc#__vite_environment_runner_import__)

## Runtime Provider Support

### Nitro

Nitro implements `__VITE_ENVIRONMENT_RUNNER_IMPORT__` in its dev worker, enabling RSC module loading across environments.

- [PR #3919: Experimental RSC plugin support](https://github.com/nitrojs/nitro/pull/3919)

### Cloudflare Workers

Cloudflare's Vite plugin uses the `childEnvironments` option to run multiple environments in a single Worker, enabling RSC support.

- [PR #11879: Child environments support](https://github.com/cloudflare/workers-sdk/pull/11879)

## Examples

| Example | Nitro | Cloudflare |
|---------|-------|------------|
| Starter | [`starter/nitro`](./starter/nitro) | [`starter/cloudflare`](./starter/cloudflare) |
| React Router | [`react-router/nitro`](./react-router/nitro) | [`react-router/cloudflare`](./react-router/cloudflare) |

These examples are slight modifications of:
- **Starter**: [`@vitejs/plugin-rsc` starter example](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc/examples/starter)
- **React Router**: [React Router RSC guide](https://reactrouter.com/how-to/react-server-components)

## Deployed Demos

- Starter (Cloudflare): https://vite-rsc-starter.hiro18181.workers.dev/
- React Router (Cloudflare): https://vite-rsc-react-router-framework-mode.hiro18181.workers.dev/
