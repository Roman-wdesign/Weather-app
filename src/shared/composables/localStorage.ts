import { ref, watch } from 'vue';

export function useLocalStorage(key: string, initialValue: any) {
  const storedValue = ref(initialValue);

  const readValue = () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const setValue = (value: any) => {
    storedValue.value = value;
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const removeValue = () => {
    storedValue.value = initialValue;
    window.localStorage.removeItem(key);
  };

  storedValue.value = readValue();

  watch(storedValue, (newValue) => {
    setValue(newValue);
  });

  return {
    storedValue,
    setValue,
    removeValue
  };
}