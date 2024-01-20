import linkedList from '../linked-list/linked-list.js'

export default function HashMap(size) {
  const LOAD_FACTOR = 0.75
  const DEFAULT_SIZE = size || 16

  let map = new Array(DEFAULT_SIZE)
  let length = 0

  function hash(string) {
    let hash = 0
    for (let i = 0; i < string.length; i++) {
      hash += (hash << 3) + string[i].toUpperCase().charCodeAt()
    }
    return hash % map.length
  }

  function set(key, value) {
    resizeIfLoaded()
    const index = hash(key)
    const list = map[index]

    if (!list) {
      length++
      return (map[index] = linkedList({ key, value }))
    } else {
      let current = list.head()

      while (current) {
        if (current.key === key) {
          current.value = value
          return
        }
        current = current.next
      }
      list.append({ key, value })
      length++
    }
  }

  function get(key) {
    const index = hash(key)
    const list = map[index]
    if (!list) return null

    let current = list.head() // { key: <key>, value: <value> }

    while (current) {
      if (current.key === key) {
        return current.value
      }
      current = current.next
    }
    return null
  }

  const has = (key) => !!get(key)

  function remove(key) {
    const index = hash(key)
    const list = map[index]
    if (!list) return false

    let current = list.head()
    let i = 0

    while (current) {
      if (current.key === key) {
        list.removeAt(i)
        length--
        return
      }
      current = current.next
    }
  }

  function resize() {
    const temp = map
    map = Array((map.length *= 2))
    length = 0

    temp.forEach((list) => {
      while (list.head()) {
        const node = list.pop()
        set(node.key, node.value)
      }
    })
  }

  const clear = () => {
    map = new Array(DEFAULT_SIZE)
    length = 0
  }

  function keys() {
    let keys = []

    map.forEach((list) => {
      let node = list.head()

      while (node) {
        keys.push(node.key)
        node = node.next
      }
    })
    return keys
  }

  function values() {
    let values = []

    map.forEach((list) => {
      let node = list.head()

      while (node) {
        values.push(node.value)
        node = node.next
      }
    })
    return values
  }

  function entries() {
    let entries = []

    map.forEach((list) => {
      let node = list.head()

      while (node) {
        entries.push([node.key, node.value])
        node = node.next
      }
    })
    return entries
  }

  const resizeIfLoaded = () => length / map.length > LOAD_FACTOR && resize()
  const getSize = () => map.length
  const getLength = () => length

  return { hash, set, get, has, remove, getLength, getSize, clear, keys, values, entries }
}
