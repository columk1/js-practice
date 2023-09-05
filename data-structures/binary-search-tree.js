/*
Balanced Binary Search Tree
*/

const Node = (data, left = null, right = null) => {
  return {
    data: data,
    left: left,
    right: right,
  }
}

const Tree = (arr) => {
  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
    const root = Node(arr[mid])

    root.left = buildTree(arr, start, mid - 1)
    root.right = buildTree(arr, mid + 1, end)

    return root
  }

  let root = buildTree(arr)

  // Look at this function carefully to understand how it works
  const insertNode = (value, rootNode = root) => {
    if (rootNode === null) return (rootNode = Node(value))

    if (value < rootNode.data) {
      rootNode.left = insert(value, rootNode.left)
    } else if (value > rootNode.data) {
      rootNode.right = insert(value, rootNode.right)
    }
    return rootNode
  }

  const deleteNode = (value, rootNode = root) => {
    if (rootNode === null) return null
  }

  return {
    root,
    insertNode,
    deleteNode,
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

const tree = Tree([1, 2, 4, 5, 6, 7, 8, 9])
prettyPrint(tree.root)
console.log(tree.insert(3))
prettyPrint(tree.root)
