import { camelToSnakeCase, snakeToCamelCase } from "~/utils/snake_camel_converter";

export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.id;
  const body  = await readBody(event);
  const category = {
      name: body.category.name,
      orderNo: body.category.orderNo,
  }
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/categories/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ category }))
  })

  return snakeToCamelCase(response);
});