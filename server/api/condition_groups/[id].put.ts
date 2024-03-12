import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id;
  const body  = await readBody(event);
  const conditionGroup = {
      name: body.conditionGroup.name,
      orderNo: body.conditionGroup.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/condition_groups/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ conditionGroup }))
  })

  return snakeToCamelCase(response);
});