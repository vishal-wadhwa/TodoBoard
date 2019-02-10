const flatten = (arr, depth = -1) => {
  if (depth === 0 || !Array.isArray(arr)) return arr

  return arr.reduce((acc, val) => acc.concat(flatten(val, depth - 1)), [])
}

const uniq = (arr, key) => {
  const uniqs = arr.reduce((acc, val) => {
    acc[val[key]] = val
    return acc
  }, {})
  return Object.values(uniqs)
}

const utils = {
  flatten,
  uniq
}

export default utils
export const {
  flatten,
  uniq
}
