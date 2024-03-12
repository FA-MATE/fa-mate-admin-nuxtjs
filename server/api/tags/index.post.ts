import { snakeToCamelCase, camelToSnakeCase } from '~/utils/';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body  = await readBody(event);
  const tag = {
      tagGroupId: body.tag.tagGroupId,
      name: body.tag.name,
      orderNo: body.tag.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/tags', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ tag }))
  })

  return snakeToCamelCase(response);
});