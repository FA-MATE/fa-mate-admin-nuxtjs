export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.subCategoryId
  const response = await $fetch(config.apiBase + '/admin/sub_categories/' + id, {
    method: 'DELETE',
  })

  return response
})
