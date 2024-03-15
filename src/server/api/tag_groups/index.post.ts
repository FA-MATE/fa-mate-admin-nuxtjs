import { snakeToCamelCase, camelToSnakeCase } from '~/utils/'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  const tag_group = {
    name: body.tagGroup.name,
    orderNo: body.tagGroup.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/tag_groups', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ tag_group })),
  })

  return snakeToCamelCase(response)
})
