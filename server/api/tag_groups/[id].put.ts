import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const id: string | undefined = event.context.params?.id;
  const body  = await readBody(event);
  const tag_group = {
      name: body.tagGroup.name,
      orderNo: body.tagGroup.orderNo,
  }
  const response = await $fetch(config.apiBase + '/admin/tag_groups/' + id, {
    method: 'PUT',
    body: JSON.stringify(camelToSnakeCase({ tag_group }))
  })

  return snakeToCamelCase(response);
});