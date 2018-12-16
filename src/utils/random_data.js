import Chance from 'chance'
/**
 *
 * @param {Object} attr Contains keynames with their type.
 * Example:
```
{
  key1: String,
  key2: Number,
  key3: {
    _type: Array,
    _len: 10,
    _valType: Boolean
  },
  key4: {
    _type: Object,
    _len: 2,
    _keyType: String,
    _valType: {
      key1: String,
      key2: Boolean
    },
    keyx: Boolean
  }
}
```
 */

const randomData = attr => {
  let chance = new Chance()

  const generator = attr => {
    let start = null

    if (typeof (attr) !== 'function') {
      if (attr['_type'] && !attr['_valType']) {
        throw new ReferenceError(`Could not find param _valType for ${attr['_type']}`)
      }

      let len = attr['_len'] || 0

      if (!!attr['_type'] && Array.isArray(attr['_type']())) {
        start = []
        for (let i = 0; i < len; ++i) {
          start.push(generator(attr['_valType']))
        }
      } else if (!attr['_type'] || typeof (attr['_type']()) === 'object') {
        start = Object.keys(attr)
          .filter(k => typeof (k) === 'string' && !k.startsWith('_'))
          .reduce((acc, k) => {
            acc[k] = generator(attr[k])
            return acc
          }, {})

        let keyType = attr['_keyType'] || String
        for (let i = 0; i < len; ++i) {
          start[generator(keyType)] = generator(attr['_valType'])
        }
      }
    } else {
      // eslint-disable-next-line
			let instAttr = new attr()
      if (instAttr instanceof Boolean) start = chance.bool()
      else if (instAttr instanceof Number) start = chance.integer() // add support for double
      else if (instAttr instanceof String) start = chance.word()
      else throw new TypeError(`Unknown type: ${typeof (attr)}`)
    }
    return start
  }

  return generator(attr)
}

export {
  randomData
}

// console.log(listRandom())
