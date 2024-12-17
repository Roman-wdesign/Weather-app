import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = ref(initialValue) as Ref<T>

  const readValue = (): T => {
    const item = window.localStorage.getItem(key)
    try {
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error)
      return initialValue
    }
  }

  const setValue = (value: T) => {
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
