import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id
  const body = await readBody(event)
  const tag = {
    tagGroupId: body.tag.tagGroupId,
    name: body.tag.name,
    orderNo: body.tag.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/tags/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ tag })),
  })

  return snakeToCamelCase(response)
})
