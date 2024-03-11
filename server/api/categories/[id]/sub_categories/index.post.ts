export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const subCategory = {
      name: body.subCategory.name,
      categoryId: body.subCategory.categoryId,
      orderNo: body.subCategory.orderNo,
  }
  const response = await $fetch('https://fa-mate-admin-nuxtjs.onrender.com/admin/sub_categories', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ subCategory }))
  })

  return snakeToCamelCase(response);
});