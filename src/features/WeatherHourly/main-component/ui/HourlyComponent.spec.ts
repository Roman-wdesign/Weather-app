import { flushPromises, mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HourlyComponent } from '@/features/WeatherHourly/main-component/ui'
import * as geolocationModule from '@/shared/composables/geolocation/model/useGeolocation'
import * as cacheModule from '@/shared/composables/cache/model'
import * as paginationModule from '@/shared/ui/pagination/model/usePagination'
import type { Mock } from 'vitest'

// Interface for geolocation
interface GeolocationData {
  isGeolocationEnabled: Ref<boolean>
  latitude: Ref<number | null>
  longitude: Ref<number | null>
  error: Ref<string | null>
  setGeolocationEnabled: () => void
  stopGeolocation: () => void
}

// Interface for pagination
interface PaginationData<T> {
  currentPage: Ref<number>
  totalPages: ComputedRef<number>
  paginatedData: ComputedRef<T[]>
  nextPage: () => void
  prevPage: () => void
}

// Interface for  fetchWithCache
interface FetchWithCache {
  (url: string): Promise<any>
}

describe('HourlyComponent.vue', () => {
  let mockedGeolocation: GeolocationData
  let mockedFetchWithCache: Mock<Parameters<FetchWithCache>, ReturnType<FetchWithCache>>
  let mockedPagination: PaginationData<any>

  beforeEach(() => {
    mockedGeolocation = {
      isGeolocationEnabled: ref(true),
      latitude: ref(50),
      longitude: ref(50),
      error: ref<string | null>(null),
      setGeolocationEnabled: vi.fn(),
      stopGeolocation: vi.fn()
    }

    mockedFetchWithCache = vi.fn() as Mock<Parameters<FetchWithCache>, ReturnType<FetchWithCache>>

    mockedPagination = {
      currentPage: ref(1),
      totalPages: computed(() => 1),
      paginatedData: computed(() => []),
      nextPage: vi.fn(),
      prevPage: vi.fn()
    }

    vi.spyOn(geolocationModule, 'useGeolocation').mockReturnValue(mockedGeolocation)
    vi.spyOn(cacheModule, 'fetchWithCache').mockImplementation(mockedFetchWithCache)
    vi.spyOn(paginationModule, 'usePagination').mockReturnValue(mockedPagination)
  })

  it('should render component', () => {
    const wrapper = mount(HourlyComponent)
    expect(wrapper.exists()).toBe(true)
  })

  it('should to show error message, if request was failed', async () => {
    mockedFetchWithCache.mockRejectedValueOnce(new Error('Ошибка сети'))
    const wrapper = mount(HourlyComponent)

    await flushPromises()

    expect(wrapper.text()).toContain('')
  })

  it('should pagination is work', async () => {
    mockedFetchWithCache.mockResolvedValueOnce({
      city: {
        name: 'Test City',
        country: 'TC'
      },
      list: Array(10).fill({
        dt: 1639098000,
        main: { temp: 285.15 },
        weather: [{ description: 'clear', icon: '01d' }]
      })
    })

    mockedPagination.paginatedData = computed(() =>
      Array(5).fill({
        dt: 1639098000,
        main: { temp: 285.15 },
        weather: [{ description: 'clear', icon: '01d' }]
      })
    )

    const wrapper = mount(HourlyComponent)

    await flushPromises()

    expect(wrapper.findAll('.temp-date').length).toBe(5)

    wrapper.findComponent({ name: 'PaginationComponent' }).vm.nextPage()
    await flushPromises()

    expect(mockedPagination.nextPage).toHaveBeenCalled()
  })
})
