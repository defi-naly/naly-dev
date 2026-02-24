import type { NalyApi } from '../../preload/index'

declare global {
  interface Window {
    api: NalyApi
  }
}

export const api = window.api
