import { snakeToCamelCase, camelToSnakeCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body  = await readBody(event);
  const condition = {
      conditionGroupId: body.condition.conditionGroupId,
      name: body.condition.name,
      orderNo: body.condition.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/conditions', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ condition }))
  })

  return snakeToCamelCase(response);
});