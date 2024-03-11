import { snakeToCamelCase, camelToSnakeCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  const body  = await readBody(event);
  const category = {
      name: body.category.name,
      orderNo: body.category.orderNo,
  }
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/categories', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ category }))
  })

  return snakeToCamelCase(response);
});