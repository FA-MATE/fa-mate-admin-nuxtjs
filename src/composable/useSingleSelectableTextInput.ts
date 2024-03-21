import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

export const useSingleSelectableTextInput = (items: any[], nameColumn: string): any => {
  const filteredItems = ref<any[]>([])

  function onSearchByKeyword(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onChangedInputTextFocus(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onChangedItemSelectState(selectedItemId: Ref<number | null>, e: any, item: any): void {
    if (e.target.checked) {
      selectedItemId.value = item.id
    } else {
      selectedItemId.value = null
    }
  }

  function onDismissItem(selectedItemId: Ref<number | null>): void {
    selectedItemId.value = null
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
