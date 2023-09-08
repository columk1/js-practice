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

  // Main root variable
  let root = buildTree(arr)

  function insertVal(value) {
    this.root = _insertNode(value)
  }

  const _insertNode = (value, rootNode = root) => {
    if (rootNode === null) return (rootNode = Node(value))

    if (value < rootNode.data) {
      rootNode.left = _insertNode(value, rootNode.left)
    } else if (value > rootNode.data) {
      rootNode.right = _insertNode(value, rootNode.right)
    }
    return rootNode
  }

  function deleteVal(value) {
    this.root = _deleteNode(value)
  }

  const _deleteNode = (value, rootNode = root) => {
    if (rootNode === null) return null

    if (value < rootNode.data) {
      rootNode.left = _deleteNode(value, rootNode.left)
    } else if (value > rootNode.data) {
      rootNode.right = _deleteNode(value, rootNode.right)
    } else {
      return rootNode.left === null
        ? rootNode.right
        : rootNode.right === null
        ? rootNode.left
        : _deleteNodeWithChildren(rootNode)
    }
    return rootNode
  }

  const minValue = (rootNode) => {
    let minV = rootNode.data
    while (rootNode.left !== null) {
      minV = rootNode.left.data
      rootNode = rootNode.left
    }
    return minV
  }

  const _deleteNodeWithChildren = (node) => {
    node.data = minValue(node.right)
    node.right = _deleteNode(node.data, node.right)
    return node
  }

  const find = (value) => {
    let pointer = root
    while (pointer !== null) {
      if (pointer.data === value) return pointer
      if (value < pointer.data) {
        pointer = pointer.left
      } else {
        pointer = pointer.right
      }
    }
    return null
  }

  const levelOrder = (callback) => {
    if (root === null) return []
    const queue = [root]
    const result = []
    while (queue.length > 0) {
      const node = queue.shift()
      if (node.left !== null) queue.push(node.left)
      if (node.right !== null) queue.push(node.right)
      if (callback) {
        callback(node)
      } else {
        result.push(node.data)
      }
    }
    return result
  }

  const levelOrderRecursive = (callback) => {
    const array = []
    const traverse = (node, level) => {
      if (!node) return null
      if (array[level]) {
        array[level].push(node.data)
      } else {
        array[level] = [node.data]
      }

      traverse(node.left, level + 1)
      traverse(node.right, level + 1)
    }
    traverse(root, 0)
    return array.flat()
  }

  const preOrder = (callback) => {
    const traversal = (rootNode = root, array = []) => {
      if (!rootNode) return []
      if (callback) {
        callback(rootNode)
      } else {
        array.push(rootNode.data)
      }
      traversal(rootNode.left, array)
      traversal(rootNode.right, array)
      return array
    }
    return traversal()
  }

  const inOrder = (callback) => {
    const traversal = (rootNode = root, array = []) => {
      if (!rootNode) return []
      traversal(rootNode.left, array)
      if (callback) callback(rootNode)
      else array.push(rootNode.data)
      traversal(rootNode.right, array)
      return array
    }
    return traversal()
  }

  const postOrder = (callback) => {
    const traversal = (rootNode = root, array = []) => {
      if (!rootNode) return []
      traversal(rootNode.left, array)
      traversal(rootNode.right, array)
      if (callback) callback(rootNode)
      else array.push(rootNode.data)
      return array
    }
    return traversal()
  }

  // The number of edges in the longest path connecting a node to any leaf node
  const height = (node) => {
    if (node === null || !node || find(node) === false) return -1
    return Math.max(height(node.left), height(node.right)) + 1
  }

  // The number of edges in the path from a node to the tree's root node
  const depth = (node, rootNode = root, depthVal = 0) => {
    if (!rootNode || !root) return
    // Base case
    if (node === rootNode) return depthVal

    if (node.data < rootNode.data) {
      return depth(node, rootNode.left, (depthVal += 1))
    } else {
      return depth(node, rootNode.right, (depthVal += 1))
    }
  }

  // Returns true if the difference between the heights of left and right subtree of every node is not more than 1
  const isBalanced = (node = root) => {
    if (node === null) return true

    const leftHeight = height(node.left)
    const rightHeight = height(node.right)

    if (Math.abs(leftHeight - rightHeight) > 1) return false
    else return isBalanced(node.left) && isBalanced(node.right)
  }

  function rebalance() {
    if (!isBalanced()) this.root = buildTree(inOrder())
  }

  return {
    root,
    insertVal,
    deleteVal,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
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
tree.insertVal(3)
tree.insertVal(10)
tree.deleteVal(2)
prettyPrint(tree.root)
tree.rebalance(tree)
prettyPrint(tree.root)
