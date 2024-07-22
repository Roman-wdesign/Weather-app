import { ref } from 'vue'
import type { Ref } from 'vue'

// argument of this funcrtion is saved cities in array

export function useDragAndDrop(savedCities: Ref<string[]>) {
  const draggedIndex = ref<number | null>(null)

  const handleDragStart = (event: DragEvent) => {
    const target = event.target as HTMLElement
    draggedIndex.value = Number(target.dataset.index)
    // dataTransfer for init drag
    event.dataTransfer?.setData('text/plain', '')
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const target = event.target as HTMLElement
    const targetIndex = Number(target.dataset.index)

    // update array after drag

    if (draggedIndex.value !== null && draggedIndex.value !== targetIndex) {
      const updatedCities = [...savedCities.value]
      const [movedItem] = updatedCities.splice(draggedIndex.value, 1)
      updatedCities.splice(targetIndex, 0, movedItem)

      savedCities.value = updatedCities
      draggedIndex.value = null
    }
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDrop
  }
}
