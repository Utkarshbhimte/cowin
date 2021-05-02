export const getWindow = (): Window & typeof globalThis | undefined => {
    return typeof window == 'undefined' && window || undefined
}