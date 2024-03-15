import { h, ref } from 'vue'
import SingleSelectableTextInput from '~/components/ui-part/SingleSelectableTextInput.vue'

export const useSingleSelectableTextInput = (items: any[], nameColumn: string, selectedItem: Ref): any => {
  const filteredItems = ref<any[]>([])

  function onSearchKeywordChanged(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onFocusChanged(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onItemChecked(e: any, item: any): void {
    if (e.target.checked) {
      selectedItem.value = item
    } else {
      selectedItem.value = {}
    }
  }

  function onItemDismiss(): void {
    selectedItem.value = {}
  }

  const render = (): any =>
    h(SingleSelectableTextInput, {
      selectedItem: selectedItem.value,
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchKeywordChanged,
      onFocusChanged,
      onItemChecked,
      onItemDismiss,
    })

  const UseSingleSelectableTextInputComponent = defineComponent({ render })
  return UseSingleSelectableTextInputComponent
}
