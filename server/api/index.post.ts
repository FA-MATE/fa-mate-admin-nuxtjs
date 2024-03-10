import { camelToSnakeCase, snakeToCamelCase } from "~/utils/snake_camel_converter";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const category = {
      name: body.name,
      orderNo: body.orderNo,
  }
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/categories', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ category }))
  })

  return snakeToCamelCase(response);
});