export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.id;
  const body  = await readBody(event);
  const post = body.post
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/posts/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ post }))
  })

  return snakeToCamelCase(response);
});