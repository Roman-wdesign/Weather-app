import { ref } from 'vue';
import type { Ref } from 'vue'

export const useFetch = () => {
  const data: Ref<string | null> = ref(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);


  async function fetchData(url:string) {
    loading.value = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      data.value = await response.json();
    } catch (err) {
       if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unknown error occurred';
      }
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, fetchData };
}