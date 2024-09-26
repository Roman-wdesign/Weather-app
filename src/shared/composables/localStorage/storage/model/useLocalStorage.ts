import { ref, watch } from 'vue'

export function useLocalStorage(key: string, initialValue: any) {
  const storedValue = ref(initialValue)

  const readValue = () => {
    const item = window.localStorage.getItem(key)
    try {
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const setValue = (value: any) => {
    storedValue.value = value
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const removeValue = () => {
    storedValue.value = initialValue
    window.localStorage.removeItem(key)
  }

  storedValue.value = readValue()

   watch(storedValue, (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
  })

  return {
    storedValue,
    setValue,
    removeValue
  }
}