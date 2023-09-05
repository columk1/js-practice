// First console.time() tends to run slower than subsequent calls

let testArray = new Array(1000)
testArray = testArray.fill(0).map(() => Math.floor(Math.random() * 100))

function sort(array) {
  return array.sort((a, b) => a - b)
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array
  } else {
    const middle = Math.floor(array.length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
  }
}

function merge(a, b) {
  const result = []
  while (a.length > 0 && b.length > 0) result.push(a[0] < b[0] ? a.shift() : b.shift())
  return result.concat(a.length ? a : b)
}

// Alternate syntax for merge function, same speed
function mergeAlt(a, b) {
  let arr = []
  while (a.length && b.length) {
    if (a[0] < b[0]) {
      arr.push(a.shift())
    } else {
      arr.push(b.shift())
    }
  }
  return [...arr, ...a, ...b]
}

console.time()
console.log(sort([4359, 34, 3, 13, 9, 345, 0, 82, 4, 6]))
console.timeEnd()

console.time()
console.log(mergeSort([1, 7, 3, 10, 9, 5, 0, 8, 4, 6]))
console.timeEnd()

console.time()
console.log(sort(testArray))
console.timeEnd()

console.time()
console.log(mergeSort(testArray))
console.timeEnd()
