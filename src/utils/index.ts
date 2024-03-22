export function snakeToCamelCase(data: any): any {
  if (data instanceof Array) {
    return data.map((item) => snakeToCamelCase(item))
  } else if (data instanceof Object) {
    const camelCaseData: any = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
        camelCaseData[camelKey] = snakeToCamelCase(data[key])
      }
    }
    return camelCaseData
  }
  return data
}

export function camelToSnakeCase(data: any): any {
  if (data instanceof Array) {
    return data.map((item) => camelToSnakeCase(item))
  } else if (data instanceof Object) {
    const snakeCaseData: any = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
        snakeCaseData[snakeKey] = camelToSnakeCase(data[key])
      }
    }
    return snakeCaseData
  }
  return data
}

export function mapToQueryString(hash: any): string {
  const keys = Object.keys(hash)
  const queryString = keys.map((key) => key + '=' + hash[key]).join('&')

  return queryString
}

export function createQueryStrings(
  by: Record<string, number | string | string[] | undefined> = {}
): Record<string, number | string | string[]> {
  const to: Record<string, number | string | string[]> = {}
  Object.keys(by).forEach((key) => {
    const value = by[key]
    if (value !== undefined) to[key] = value
  })

  return to
}
