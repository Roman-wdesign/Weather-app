import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import type { Ref} from 'vue'
import { useDragAndDrop } from '@/shared/composables/useDragAndDrop'


describe('useDragAndDrop', () => {
  let savedCities:Ref<string[]>
  let dragAndDrop:any

  beforeEach(() => {
    savedCities = ref(['City1', 'City2', 'City3'])
    dragAndDrop = useDragAndDrop(savedCities)
  })

  it('should set draggedIndex on drag start', () => {
    const mockEvent = {
      target: { dataset: { index: '1' } },
      dataTransfer: { setData: vi.fn() }
    }

    dragAndDrop.handleDragStart(mockEvent)

    expect(dragAndDrop.draggedIndex.value).toBe(1)
    expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '')
  })

  it('should prevent default action on drag over', () => {
    const mockEvent = { preventDefault: vi.fn() }

    dragAndDrop.handleDragOver(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  it('should update cities order on drop', () => {
   
    dragAndDrop.draggedIndex.value = 0

    const mockEvent = {
      target: { dataset: { index: '2' } },
      preventDefault: vi.fn()
    }

    dragAndDrop.handleDrop(mockEvent)

    expect(savedCities.value).toEqual(['City2', 'City3', 'City1'])
    expect(dragAndDrop.draggedIndex.value).toBe(null)
  })

  it('should not update cities if dropped in the same position', () => {
    dragAndDrop.draggedIndex.value = 1

    const mockEvent = {
      target: { dataset: { index: '1' } },
      preventDefault: vi.fn()
    }

    dragAndDrop.handleDrop(mockEvent)

    expect(savedCities.value).toEqual(['City1', 'City2', 'City3'])
    expect(dragAndDrop.draggedIndex.value).toBe(null)
  })
})
