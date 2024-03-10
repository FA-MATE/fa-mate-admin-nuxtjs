export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.subCategoryId;
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/sub_categories/' + id, {
    method: 'DELETE'
  })

  return response;
});