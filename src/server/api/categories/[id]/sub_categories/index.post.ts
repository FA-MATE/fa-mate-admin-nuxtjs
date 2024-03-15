import { snakeToCamelCase, camelToSnakeCase } from '~/utils/'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  const subCategory = {
    name: body.subCategory.name,
    categoryId: body.subCategory.categoryId,
    orderNo: body.subCategory.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/sub_categories', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ subCategory })),
  })

  return snakeToCamelCase(response)
})
