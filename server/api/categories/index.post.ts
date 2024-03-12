import { snakeToCamelCase, camelToSnakeCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body  = await readBody(event);
  const category = {
      name: body.category.name,
      orderNo: body.category.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/categories', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ category }))
  })

  return snakeToCamelCase(response);
});