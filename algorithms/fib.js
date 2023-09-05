// (.703ms)
function slowIter(n) {
  if (n < 2) {
    if (n === 0) return []
    if (n === 1) return [0]
  } else {
    const result = [0, 1]

    for (let i = 2; i < n; i++) {
      result.push(result[i - 2] + result[i - 1])
    }

    return result
  }
}

// (.363ms)
function fastIter(n) {
  let result = []
  let a = 0
  let b = 1

  for (let i = 0; i < n; i++) {
    result.push(a)
    // [a, b] = [b, a + b] not allowed by prettier
    let temp = a
    a = b
    b = temp + b
  }
  return result
}

// Generator function that creates a sequence of fib numbers of length n (.36ms using array.from)
function* fibsGen(n) {
  let a = 0
  let b = 1

  for (let i = 0; i < n; i++) {
    yield a
    const temp = a
    a = b
    b = temp + b
  }
}

// const result = Array.from(fibsGen(8));

// Generator function to generate fibonacci numbers
function* fibGenerator() {
  let a = 0
  let b = 1

  while (true) {
    yield a
    const temp = a
    a = b
    b = temp + b
  }
}
// Creates an array of fibonacci numbers using the generator (.399ms)
function getFibArray(n) {
  let fib = fibGenerator()
  let result = []
  for (let i = 0; i < n; i++) {
    result.push(fib.next().value)
  }
  return result
}

// Recursive function to return nth fib (really slow)
const recursiveFibs = (n) => (n > 2 ? recursiveFibs(n - 1) + recursiveFibs(n - 2) : n > 1 ? 1 : 0)

// Doesn't finish in test
function loopRecursiveFibs(n) {
  let arr = []
  for (let i = 1; i < n; i++) {
    arr.push(recursiveFibs(i))
  }
  return arr
}

// Recursive function to return a sequence of n fib numbers (1.234ms)
function recursiveFibsArray(n) {
  if (n === 0) return [0]
  if (n === 1) return [0, 1]
  let arr = recursiveFibsArray(n - 1)
  return [...arr, arr[n - 1] + arr[n - 2]]
}

// Same speed but syntax is slightly different
recursiveFibsArray2 = (n) => {
  if (n > 2) {
    let arr = recursiveFibsArray(n - 1)
    return [...arr, arr[n - 1] + arr[n - 2]]
  } else {
    return n === 2 ? [0, 1] : [0]
  }
}

// Recursive function to return a sequence of n fib numbers (4.054)
const fib = (n, a = 0, b = 1) => (n > 0 ? [a, ...fib(n - 1, b, a + b)] : [])

// Testing
// console.time('slowIter')
// console.log(slowIter(500))
// console.timeEnd('slowIter')

// console.time('fastIter')
// console.log(fastIter(500))
// console.timeEnd('fastIter')

// console.time('Array.from(fibsGen)')
// const result = Array.from(fibsGen(500))
// console.log(result)
// console.timeEnd('Array.from(fibsGen)')

console.time('getFibArray')
console.log(getFibArray(500))
console.timeEnd('getFibArray')

console.time('recursiveFibsArray')
console.log(recursiveFibsArray(500))
console.timeEnd('recursiveFibsArray')

console.time('fib')
console.log(fib(500))
console.timeEnd('fib')

// console.time('loopFibs')
// console.log(loopRecursiveFibs(43))
// console.timeEnd('loopFibs')
