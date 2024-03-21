import { snakeToCamelCase, camelToSnakeCase } from '~/utils/'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.subCategoryId
  const body = await readBody(event)
  const subCategory = {
    categoryId: body.subCategory.categoryId,
    name: body.subCategory.name,
    orderNo: body.subCategory.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/sub_categories/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ subCategory })),
  })

  return snakeToCamelCase(response)
})
