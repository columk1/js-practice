/*
Balanced Binary Search Tree
*/

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class Tree {
  constructor(arr) {
    this.root = this._buildTree(arr)
  }
  _buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
    const root = new Node(arr[mid])

    root.left = this._buildTree(arr, start, mid - 1)
    root.right = this._buildTree(arr, mid + 1, end)

    return root
  }

  /* 
  Private helper functions
  */

  _minValue(root) {
    let minV = root.data
    while (root.left !== null) {
      minV = root.left.data
      root = root.left
    }
    return minV
  }

  _deleteNodeWithChildren(node) {
    node.data = this._minValue(node.right)
    node.right = this.deleteVal(node.data, node.right)
    return node
  }

  /* 
  Main functions 
  */

  insertVal(value, root = this.root) {
    if (root === null) return (root = new Node(value))

    if (value < root.data) {
      root.left = this.insertVal(value, root.left)
    } else if (value > root.data) {
      root.right = this.insertVal(value, root.right)
    }
    return root
  }

  deleteVal(value, root = this.root) {
    if (root === null) return null

    if (value < root.data) {
      root.left = this.deleteVal(value, root.left)
    } else if (value > root.data) {
      root.right = this.deleteVal(value, root.right)
    } else {
      return root.left === null
        ? root.right
        : root.right === null
        ? root.left
        : this._deleteNodeWithChildren(root)
    }
    return root
  }

  find(value) {
    let pointer = this.root
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

  levelOrder(callback) {
    if (this.root === null) return []
    const queue = [this.root]
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

  levelOrderRecursive(callback) {
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

  preOrder(callback) {
    const traversal = (root = this.root, array = []) => {
      if (!root) return []
      if (callback) {
        callback(root)
      } else {
        array.push(root.data)
      }
      traversal(root.left, array)
      traversal(root.right, array)
      return array
    }
    return traversal()
  }

  inOrder(callback) {
    const traversal = (root = this.root, array = []) => {
      if (!root) return []
      traversal(root.left, array)
      if (callback) callback(root)
      else array.push(root.data)
      traversal(root.right, array)
      return array
    }
    return traversal()
  }

  postOrder(callback) {
    const traversal = (root = this.root, array = []) => {
      if (!root) return []
      traversal(rootleft, array)
      traversal(root.right, array)
      if (callback) callback(root)
      else array.push(root.data)
      return array
    }
    return traversal()
  }

  // The number of edges in the longest path connecting a node to any leaf node
  height(node) {
    if (node === null || !node || this.find(node) === false) return -1
    return Math.max(this.height(node.left), this.height(node.right)) + 1
  }

  // The number of edges in the path from a node to the tree's root node
  depth(node, root = this.root, depthVal = 0) {
    if (!root || !root) return
    // Base case
    if (node === root) return depthVal

    if (node.data < root.data) {
      return this.depth(node, root.left, (depthVal += 1))
    } else {
      return this.depth(node, root.right, (depthVal += 1))
    }
  }

  // Returns true if the difference between the heights of left and right subtree of every node is not more than 1
  isBalanced(node = this.root) {
    if (node === null) return true

    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)

    if (Math.abs(leftHeight - rightHeight) > 1) return false
    else return this.isBalanced(node.left) && this.isBalanced(node.right)
  }

  rebalance() {
    if (!this.isBalanced()) this.root = this._buildTree(this.inOrder())
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

const tree = new Tree([1, 2, 4, 5, 6, 7, 8, 9])
tree.insertVal(3)
tree.insertVal(10)
tree.deleteVal(2)
prettyPrint(tree.root)
tree.rebalance(tree)
prettyPrint(tree.root)
