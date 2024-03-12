export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id;
  const response = await $fetch(config.apiBase + '/admin/tags/' + id, {
    method: 'DELETE'
  })

  return response;
});