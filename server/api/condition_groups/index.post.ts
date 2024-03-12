import { snakeToCamelCase, camelToSnakeCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body  = await readBody(event);
  const conditionGroup = {
      name: body.conditionGroup.name,
      orderNo: body.conditionGroup.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/condition_groups', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ conditionGroup }))
  })

  return snakeToCamelCase(response);
});