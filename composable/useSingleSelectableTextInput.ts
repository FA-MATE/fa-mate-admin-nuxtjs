import { computed, defineComponent, h, ref } from "vue";
import SingleSelectableTextInput from "~/components/ui-part/SingleSelectableTextInput.vue"

export const useSingleSelectableTextInput = (items: any[], nameColumn: string, selectedItem: Ref) => {
  const filteredItems = ref([]);

  function onChangeSearchKeyword(searchKeyword: string) {
    filteredItems.value = items.filter((item) => item[nameColumn].indexOf(searchKeyword) != -1);
  }

  function onFocusChanged(isFocused) {
    if (!isFocused) {
      filteredItems.value = [];
    }
  }

  function onItemChecked(e: Event, item: any) {
    if (e.target.checked) {
      selectedItem.value = item;
    } else {
      selectedItem.value = {}
    }
  }

  function onItemDismiss(item: any) {
    selectedItem.value = {}
  }

  const render = () =>
    h(SingleSelectableTextInput, { 
      selectedItem: selectedItem,
      filteredItems: filteredItems.value,
      items,
      onChangeSearchKeyword,
      onFocusChanged,
      onItemChecked,
      onItemDismiss,
      nameColumn,
     });

  const UseSingleSelectableTextInputComponent = defineComponent({ render });

  return UseSingleSelectableTextInputComponent
}