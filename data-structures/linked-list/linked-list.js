import Node from './node.js'

export default (initialValue) => {
  let HEAD = Node(initialValue) || null
  let length = initialValue ? 1 : 0

  const append = (value) => {
    console.log('APPENDING')
    const newNode = Node(value)
    length++
    if (HEAD === null) {
      return (HEAD = newNode)
    }
    let pointer = HEAD
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode
    }
    pointer.nextNode = newNode
  }

  const prepend = (value) => {
    const newNode = Node(value)
    length++
    if (HEAD === null) {
      return (HEAD = newNode)
    }
    newNode.nextNode = HEAD
    HEAD = newNode
  }

  const size = () => length

  const head = () => (HEAD ? HEAD.value : null)

  const tail = () => {
    if (!HEAD) return null
    let pointer = HEAD
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode
    }
    return pointer.value
  }

  const at = (index) => {
    if (!HEAD) return null

    let pointer = HEAD
    for (let i = 0; i <= index; i++) {
      if (i === index) return pointer

      if (!pointer.nextNode) throw new Error('indexOutOfBounds')

      pointer = pointer.nextNode
    }
    return null
  }

  const pop = () => {
    if (!HEAD) return null

    let popped

    // Case for list with a single node
    if (!HEAD.nextNode) {
      popped = HEAD
      HEAD = null
    } else {
      // Case for a list with mutiple nodes
      popped = at(length - 2).nextNode
      at(length - 2).nextNode = null
    }
    length--
    return popped ? popped.value : null
  }

  const contains = (value) => {
    let pointer = HEAD
    while (pointer !== null) {
      if (pointer.value === value) return true
      pointer = pointer.nextNode
    }
    return false
  }

  const find = (value) => {
    for (let i = 0, pointer = HEAD; i < length; i++, pointer = pointer.nextNode) {
      if (pointer.value === value) return i
    }
    return null
  }

  const toString = () => {
    let str = ''
    let pointer = HEAD
    while (pointer !== null) {
      str += `( ${pointer.value} ) -> `
      pointer = pointer.nextNode
    }
    return (str += 'null')
  }

  const insertAt = (index, value) => {
    if (index > length) throw new Error('indexOutOfBounds')
    if (index === 0 || index === length) return append(value)

    const newNode = Node(value)
    let pointer = HEAD
    for (let i = 0; i < index - 1; i++) {
      pointer = pointer.nextNode
    }
    newNode.nextNode = pointer.nextNode
    pointer.nextNode = newNode
    length++
  }

  const removeAt = (index) => {
    if (index > length) throw new Error('indexOutOfBounds')
    if (index === 0 || index === length - 1) return pop()

    let pointer = HEAD
    for (let i = 0; i < index - 1; i++) {
      pointer = pointer.nextNode
    }
    pointer.nextNode = pointer.nextNode.nextNode
    length--
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  }
}
