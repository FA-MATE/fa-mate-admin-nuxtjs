import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id
  const body = await readBody(event)
  const condition = {
    conditionGroupId: body.condition.conditionGroupId,
    name: body.condition.name,
    orderNo: body.condition.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/conditions/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ condition })),
  })

  return snakeToCamelCase(response)
})
