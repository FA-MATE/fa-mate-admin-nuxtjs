import { computed, defineComponent, h, ref } from "vue";
import MultiSelectableTextInput from "~/components/ui-part/MultiSelectableTextInput.vue"

export const useMultiSelectableTextInput = (items: any[], nameColumn: string, selectedItems: Ref<[]>) => {
  const filteredItems = ref([]);

  function onSearchKeywordChanged(searchKeyword: string) {
    filteredItems.value = items.filter((item) => item[nameColumn].indexOf(searchKeyword) != -1);
  }

  function onFocusChanged(isFocused) {
    if (!isFocused) {
      filteredItems.value = [];
    }
  }

  function onItemChecked(e: Event, item: any) {
    if (e.target.checked) {
      selectedItems.value = [item, ...selectedItems.value];
    } else {
      selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id != item.id);
    }
  }

  function onItemDismiss(item: any) {
    selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id != item.id);
  }

  const render = () =>
    h(MultiSelectableTextInput, { 
      selectedItems: selectedItems.value,
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchKeywordChanged,
      onFocusChanged,
      onItemChecked,
      onItemDismiss,
     });

  const UseMultiSelectableTextInputComponent = defineComponent({ render });
  return UseMultiSelectableTextInputComponent
}