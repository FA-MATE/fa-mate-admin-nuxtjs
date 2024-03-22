import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

type useSelectableTextInputOptionsType = {
  uniqueColumn?: string
}

export function useSelectableTextInput<T>(
  items: any[],
  nameColumn: string,
  options?: useSelectableTextInputOptionsType
): any {
  const filteredItems = ref<any[]>([])
  const { uniqueColumn } = options || {}

  function onSearchByKeyword(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onChangedInputTextFocus(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onChangedItemSelectState(selectedItemIds: Ref<T>, e: any, item: any): void {
    if (e.target.checked) {
      if (uniqueColumn) {
        selectedItemIds.value = [
          item.id.toString(),
          ...((selectedItemIds.value || []) as []).filter(
            (selectedItemId) => getItemById(selectedItemId)[uniqueColumn] !== item[uniqueColumn]
          ),
        ] as T
      } else {
        selectedItemIds.value = item.id as T
      }
    } else {
      if (uniqueColumn) {
        selectedItemIds.value = ((selectedItemIds.value || []) as []).filter(
          (selectedItemId) => selectedItemId !== item.id.toString()
        ) as T
      } else {
        selectedItemIds.value = undefined as T
      }
    }
  }

  function onDismissItem(selectedItemIds: Ref<T>, item: any): void {
    if (typeof selectedItemIds.value === 'string' || typeof selectedItemIds.value === 'number') {
      selectedItemIds.value = undefined as T
    } else {
      selectedItemIds.value = (selectedItemIds.value as []).filter(
        (selectedItemId) => selectedItemId !== item.id.toString()
      ) as T
    }
  }

  function getItemById(itemId: string): any {
    return items.find((item) => item.id.toString() === itemId)
  }

  const render = (): any => {
    return h(SelectableTextInput<T>, {
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchByKeyword,
      onChangedInputTextFocus,
      onChangedItemSelectState,
      onDismissItem,
    })
  }

  return defineComponent({ render })
}
