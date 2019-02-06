const readBoolean = (key, defaultV) => {
  return localStorage.getItem(key) || defaultV
}
const readString = (key, defaultV) => {
  return localStorage.getItem(key) || defaultV
}
const readInt = (key, defaultV) => {
  return Number(localStorage.getItem(key)) >> 0 || defaultV
}
const readDouble = (key, defaultV) => {
  return Number(localStorage.getItem(key)) || defaultV
}
const readObject = (key, defaultV) => {
  return JSON.parse(localStorage.getItem(key)) || defaultV
}

const writeBoolean = (key, val) => {
  localStorage.setItem(key, val)
}
const writeString = (key, val) => {
  localStorage.setItem(key, val)
}
const writeInt = (key, val) => {
  localStorage.setItem(key, val)
}
const writeDouble = (key, val) => {
  localStorage.setItem(key, val)
}
const writeObject = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}

const clear = key => localStorage.removeItem(key)

const storage = {
  readBoolean,
  readString,
  readInt,
  readDouble,
  readObject,
  writeBoolean,
  writeString,
  writeInt,
  writeDouble,
  writeObject,
  clear
}

export default storage
export {
  readBoolean,
  readString,
  readInt,
  readDouble,
  readObject,
  writeBoolean,
  writeString,
  writeInt,
  writeDouble,
  writeObject,
  clear
}
