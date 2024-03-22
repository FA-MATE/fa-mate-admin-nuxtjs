import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

type useSelectableTextInputOptionsType = {
  uniqueColumn?: string
}

export const useSelectableTextInput = (
  items: any[],
  nameColumn: string,
  options?: useSelectableTextInputOptionsType
): any => {
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

  function onChangedItemSelectState(selectedItemIds: Ref<string[]>, e: any, item: any): void {
    if (e.target.checked) {
      if (uniqueColumn) {
        selectedItemIds.value = [
          item.id.toString(),
          ...selectedItemIds.value.filter(
            (selectedItemId) => getItemById(selectedItemId)[uniqueColumn] !== item[uniqueColumn]
          ),
        ]
      } else {
        selectedItemIds.value = [item.id.toString()]
      }
    } else {
      if (uniqueColumn) {
        selectedItemIds.value = selectedItemIds.value.filter((selectedItemId) => selectedItemId !== item.id.toString())
      } else {
        selectedItemIds.value = []
      }
    }
  }

  function onDismissItem(selectedItemIds: Ref<string[]>, item: any): void {
    selectedItemIds.value = selectedItemIds.value.filter((selectedItemId) => selectedItemId !== item.id.toString())
  }

  function getItemById(itemId: string): any {
    return items.find((item) => item.id.toString() === itemId)
  }

  const render = (): any => {
    return h(SelectableTextInput, {
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
