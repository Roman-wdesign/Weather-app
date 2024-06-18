import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@/shared/composables/localstorage/localStorage'


export const useNavbar=()=> {
  const showMenu = ref(false);
  const { storedValue: isDarkMode, setValue: setDarkMode } = useLocalStorage('theme', false);

  const toggleNav = () => {
    showMenu.value = !showMenu.value;
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode.value;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  onMounted(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  });

  return {
    showMenu,
    isDarkMode,
    toggleNav,
    toggleDarkMode
  };
}