import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}