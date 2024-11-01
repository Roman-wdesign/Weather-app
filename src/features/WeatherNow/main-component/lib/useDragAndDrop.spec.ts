import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useDragAndDrop } from '@/features/WeatherNow/main-component/lib'

describe('useDragAndDrop', () => {
  let savedCities: Ref<string[]>
  let dragAndDrop: any

  beforeEach(() => {
    savedCities = ref(['City1', 'City2', 'City3'])
    dragAndDrop = useDragAndDrop(savedCities)
  })

  it('should prevent default action on drag over', () => {
    const mockEvent = { preventDefault: vi.fn() }

    dragAndDrop.handleDragOver(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('should not update cities if dropped in the same position', () => {
    const mockEvent = {
      target: { dataset: { index: '1' } },
      preventDefault: vi.fn()
    }

    dragAndDrop.handleDrop(mockEvent)

    expect(savedCities.value).toEqual(['City1', 'City2', 'City3'])
  })
})
