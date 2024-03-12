import { camelToSnakeCase, snakeToCamelCase } from '~/utils'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body  = await readBody(event);
  const user = {
      nickname: body.user.nickname,
      profile_image_url: body.user.profile_image_url,
  }
  const response = await $fetch(config.apiBase + '/admin/users', {
    method: 'POST',
    body: JSON.stringify(camelToSnakeCase({ user }))
  })

  return snakeToCamelCase(response);
});