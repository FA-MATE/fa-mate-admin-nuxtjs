import { snakeToCamelCase } from "~/utils/snake_camel_converter"

export default defineEventHandler(async (event) => {
  return snakeToCamelCase(await $fetch('https://fa-mate-rails.onrender.com/admin/categories'))
})