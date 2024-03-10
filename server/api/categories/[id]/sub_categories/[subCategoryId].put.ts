import { camelToSnakeCase, snakeToCamelCase } from "~/utils/snake_camel_converter";

export default defineEventHandler(async (event) => {
  const id: string | undefined = event.context.params?.subCategoryId;
  const body = await readBody(event);
  const subCategory = {
      name: body.subCategory.name,
      orderNo: body.subCategory.orderNo,
  }
  const response = await $fetch('https://fa-mate-rails.onrender.com/admin/sub_categories/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ subCategory }))
  })

  return snakeToCamelCase(response);
});