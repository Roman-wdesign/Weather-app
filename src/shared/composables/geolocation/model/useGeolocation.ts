import { ref, watch, onMounted } from 'vue'
import { useLocalStorage } from '@/shared/composables/localStorage/storage/model/useLocalStorage'

export function useGeolocation() {
  const { storedValue: isGeolocationEnabled, setValue: setGeolocationEnabled, removeValue } = useLocalStorage('geolocationEnabled', false)
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  const error = ref<string | null>(null)
  let watchId: number | null = null

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser'
      return
    }

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
        error.value = null
      },
      (err) => {
        error.value = err.message
      }
    )
  }

  const stopGeolocation = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
    }
    latitude.value = null
    longitude.value = null
  }

  watch(isGeolocationEnabled, (newValue) => {
    if (newValue) {
      getCurrentPosition()
    } else {
      stopGeolocation()
      removeValue()  // Remove from localStorage
    }
  })

  const handleToggle = (event: Event) => {
    const enabled = (event as CustomEvent).detail
    if (enabled) {
      getCurrentPosition()
    } else {
      stopGeolocation()
      removeValue()
    }
  }

  onMounted(() => {
    if (isGeolocationEnabled.value) {
      getCurrentPosition()
    }
    window.addEventListener('geolocation-toggle', handleToggle)
  })

  return { isGeolocationEnabled, latitude, longitude, error, setGeolocationEnabled, stopGeolocation }
}
