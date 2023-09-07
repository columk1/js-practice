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

  const insertNode = (value, rootNode = root) => {
    if (rootNode === null) return (rootNode = Node(value))

    if (value < rootNode.data) {
      rootNode.left = insertNode(value, rootNode.left)
    } else if (value > rootNode.data) {
      rootNode.right = insertNode(value, rootNode.right)
    }
    return rootNode
  }

  const deleteNode = (value, rootNode = root) => {
    if (rootNode === null) return null

    if (value < rootNode.data) {
      rootNode.left = deleteNode(value, rootNode.left)
    } else if (value > rootNode.data) {
      rootNode.right = deleteNode(value, rootNode.right)
    } else {
      return rootNode.left === null
        ? rootNode.right
        : rootNode.right === null
        ? rootNode.left
        : deleteNodeWithChildren(rootNode)
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

  const deleteNodeWithChildren = (node) => {
    node.data = minValue(node.right)
    node.right = deleteNode(node.data, node.right)
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

  const rebalance = () => {
    if (!isBalanced()) return (root = buildTree(inOrder()))
  }

  return {
    root,
    insertNode,
    deleteNode,
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
tree.insertNode(3)
tree.insertNode(10)
tree.deleteNode(2)
prettyPrint(tree.root)

// ** Problem here **
tree.rebalance()

// 'root' variable isn't updated by tree.rebalance, tree.root is still the old tree
// I don't really understand because most of the functions (insert, delete, etc)
// are altering or returning a new root and tree.root updates with those.
// If anything rebalance is much simpler and more explicit.
prettyPrint(tree.root)

// This shows what the tree should look like after rebalance:
// prettyPrint(tree.rebalance())
