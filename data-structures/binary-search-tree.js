/*
Iniitialize start = 0, end = length of the array -1
mid = (start+end)/2
Create a tree node with mid as root (lets call it A)
Recursively do following steps:
Calculate mid of left subarray and make it root of left subtree of A
Calculate mid of right subarray and make it root of right subtree of A
*/


const Node = (data, left = null, right = null) => {
    return {
        data: data,
        left: left,
        right: right,
    }
}

const createBST = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
}


if(start>end) return null
int treenode root
root.setLeft(createBST(array, start, mid-1)
root.setRight(createBST(array, mid+1, end))