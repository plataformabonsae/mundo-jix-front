
export const getLocalStorage = (key, initial) => {
    try {
      return window.localStorage.getItem(key)
    } catch (error) {
      return initial
    }
}