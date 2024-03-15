import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id
  const body = await readBody(event)
  const category = {
    name: body.category.name,
    orderNo: body.category.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/categories/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ category })),
  })

  return snakeToCamelCase(response)
})
