// #1. Sum of multiples of 3 or 5 below 1000

function multiples() {
  let sum = 0
  for (let i = 0; i < 1000; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i
    }
  }
  return sum
}

// #2. Sum of even Fibonacci numbers below 4000000

function evenFibonacci() {
  let sum = 0
  let a = 0
  let b = 1

  for (let i = 0; a < 4000000; i++) {
    if (a % 2 === 0) sum += a
    let temp = a
    a = b
    b = temp + b
  }
  return sum
}

// #3. Largest prime factor
// Alternate method would be to calculate the smallest factor then multiply that out to get the largest (71 * 839 * 1471 * 6857)

function largestPrimeFactor(n) {
  let largest = 0
  for (let i = 2; i * i < n; i = nextPrime(i)) {
    if (n % i === 0) {
      largest = i
    }
  }
  return largest

  function nextPrime(value) {
    if (value > 2) {
      let i, q
      do {
        i = 3
        value += 2
        q = Math.floor(Math.sqrt(value))
        while (i <= q && value % i) {
          i += 2
        }
      } while (i <= q)
      {
        return value
      }
    }
    return value === 2 ? 3 : 2
  }
}

// #4. Largest Palindrome Product

function largestPalindromeProduct() {
  let largest = 0
  for (let i = 100; i < 1000; i++) {
    for (let j = 100; j < 1000; j++) {
      let product = i * j
      if (isPalindrome(product) && product > largest) {
        largest = product
      }
    }
  }
  return largest

  function isPalindrome(value) {
    return value.toString() === value.toString().split('').reverse().join('')
  }
}

// #5. Smallest Multiple. 1-20. Smallest of 1-10 is 2520, must be a multiple of this to be divisible by 1-10.

function smallestMultiple() {
  for (let i = 2520; i < Infinity; i += 2520) {
    let validMultiple = true
    for (let j = 1; j <= 20; j++) {
      if (i % j) {
        validMultiple = false
        break
      }
    }
    if (validMultiple) return i
  }
}

console.log(multiples())
console.log(evenFibonacci())
console.log(largestPrimeFactor(600851475143))
console.log(largestPalindromeProduct())
console.log(smallestMultiple())
