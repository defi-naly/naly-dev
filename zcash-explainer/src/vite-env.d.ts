/// <reference types="vite/client" />

declare module 'animejs' {
  export function animate(targets: any, params: Record<string, any>): any
  export function stagger(value: any, options?: Record<string, any>): any
  export function createTimeline(params?: Record<string, any>): {
    add(targets: any, params: Record<string, any>, position?: string | number): any
    set(targets: any, params: Record<string, any>): any
    label(name: string): any
    play(): void
    pause(): void
    seek(time: number): void
  }
  export function onScroll(params: Record<string, any>): any
  export function splitText(targets: any, params?: Record<string, any>): {
    lines: Element[]
    words: Element[]
    chars: Element[]
    revert(): void
    refresh(): void
    addEffect(animation: any): void
  }
}
