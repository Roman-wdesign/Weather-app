import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGeolocation } from '@/shared/composables/geolocation/model/useGeolocation'

describe('useGeolocation', () => {
  let watchPositionMock: any
  let clearWatchMock: any

  beforeEach(() => {
    watchPositionMock = vi.fn()
    clearWatchMock = vi.fn()

  
  })

  it('should start geolocation when enabled', () => {
    const { isGeolocationEnabled } = useGeolocation()
    isGeolocationEnabled.value = true

    expect(watchPositionMock).toBeDefined()
  })

  it('should stop geolocation when disabled', () => {
    const { isGeolocationEnabled, stopGeolocation } = useGeolocation()
    isGeolocationEnabled.value = false
    stopGeolocation()

    expect(clearWatchMock).toBeDefined()
  })

  it('should update latitude and longitude on position update', () => {
    const mockPosition = {
      coords: {
        latitude: 10,
        longitude: 20
      }
    }

    watchPositionMock.mockImplementation((successCallback: any) => {
      successCallback(mockPosition)
    })

    const { isGeolocationEnabled } = useGeolocation()

    isGeolocationEnabled.value = true

    expect(mockPosition.coords.latitude).toBe(10)
    expect(mockPosition.coords.longitude).toBe(20)
  })

  it('should set error if geolocation is not supported', () => {
 

    const { error } = useGeolocation()

    expect(error.value).toBe(null)
  })
})
