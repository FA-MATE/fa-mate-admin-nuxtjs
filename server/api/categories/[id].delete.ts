export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.id;
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/categories/' + id, {
    method: 'DELETE'
  })

  return response;
});