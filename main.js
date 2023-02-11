class Node {
  constructor(data=null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let prev;
    let current = this.root;
    while (current !== null) {
      if (current.data === value) return;
      if (current.data < value) {
        prev = current;
        current = current.right;
      }
      else if (current.data > value)  {
        prev = current;
        current = current.left;
      }
    }
    
    if (prev.data < value) {
      prev.right = newNode;
    }
    else if (prev.data > value)  {
      prev.left = newNode;
    }
  }

  delete(value, root=this.root) {
    if (root === null) return null;

    if (root.data < value) root.right = this.delete(value, root.right);
    else if (root.data > value) root.left = this.delete(value, root.left);
    else {
      console.log('D', root)
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      root.data = this.findMax(root.left);
      root.left = this.delete(root.data, root.left);
    }

    return root;
  }

  findMax(root=this.root) {
    console.log('F', root);
    while (root.right !== null) {
      root = root.right;
    }
    return root.data;
  }
}

function buildTree(arr) {
  const newArr = sortAndRemoveDuplicates(arr);
  return build(newArr);
}

function sortAndRemoveDuplicates(arr) {
  return [...new Set(arr)].sort((a, b) => a - b);
}

function build(arr, start=0, end=arr.length-1) {
  //console.log(arr);
  
  if (start > end) return null;
  const middle = parseInt((start + end) / 2);
  /*console.log('start:', start);
  console.log('end:', end);
  console.log('middle:', middle);*/
  

  const newNode = new Node(arr[middle]);
  newNode.left = build(arr, start, middle-1);
  newNode.right = build(arr, middle+1, end);

  return newNode;
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const newTree = new Tree(arr);
prettyPrint(newTree.root);

newTree.insert(876);
newTree.insert(10);
newTree.insert(8);
prettyPrint(newTree.root);
newTree.delete(876);
newTree.delete(67);

prettyPrint(newTree.root);