import LinkedList from './linked-list.js'

const list = LinkedList()
const str1 = 'Hello, World!'
const str2 = 'Goodbye, World!'

list.append(str1)
list.append(str2)

list.insertAt(1, 'Wait...')

console.log(list.toString())

list.removeAt(-1)

console.log(list.toString())
