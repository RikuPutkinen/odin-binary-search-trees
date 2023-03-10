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
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      root.data = this.findMax(root.left);
      root.left = this.delete(root.data, root.left);
    }

    return root;
  }

  findMax(root=this.root) {
    while (root.right !== null) {
      root = root.right;
    }
    return root.data;
  }

  find(value) {
    let current = this.root || null;

    while (current !== null && current.data !== value) {
      if (current.data < value) current = current.right;
      else if (current.data > value) current = current.left;
    }

    return current;
  }

  levelOrder(cb=null) {
    if (!this.root) return;

    let queue = [];
    let nodeArr = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let current = queue[0];
      nodeArr.push(current);
      if (cb) cb(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      queue.shift();
    }

    if (!cb) return nodeArr.map(node => node.data);
  }

  inorder(cb=null) {
    if (!this.root) return;
    let stack = [];
    let nodeArr = [];

    let current = this.root;

    while (stack.length > 0 || current) {
      if (current) {
        stack.push(current);
        current = current.left;
      }
      else {
        current = stack.pop();
        if (!cb) nodeArr.push(current);
        else cb(current);
        
        current = current.right;
      }
    }

    if (!cb) return nodeArr.map(node => node.data);
  }

  preorder(cb=null) {
    if (!this.root) return;
    let stack = [];
    let nodeArr = [];

    let current = this.root;

    while (stack.length > 0 || current) {
      if (current) {
        stack.push(current);
        if (!cb) nodeArr.push(current);
        else cb(current);
        current = current.left;
      }
      else {
        current = stack.pop();
        current = current.right;
      }
    }

    if (!cb) return nodeArr.map(node => node.data);
  }

  postorder(cb=null) {
    if (!this.root) return;
    let traversalStack = [];
    let nodeStack = [];
    let nodeArr = [];

    traversalStack.push(this.root);

    while (traversalStack.length > 0) {
      let current = traversalStack.pop();
      nodeStack.push(current);

      if (current.left) traversalStack.push(current.left);
      if (current.right) traversalStack.push(current.right);
    }

    while (nodeStack.length > 0) {
      let current = nodeStack.pop();
      if (cb) cb(current);
      else nodeArr.push(current);
    }

    if (!cb) return nodeArr.map(node => node.data);
  }

  height(node=this.root) {
    if (!node) return -1;

    return Math.max(
      this.height(node.left),
      this.height(node.right)
    ) + 1;
  }

  depth(node=this.root) {
    if (!node) return;

    let depth = 0;
    let current = this.root; 

    while (current !== node && current) {
      if (current.data > node.data) current = current.left;
      else current = current.right;
      depth++;
    }
    if (current === node) return depth;
    else return;
  }

  isBalanced(node=this.root) {
    if (!node) return true;

    let heightLeft = this.height(node.left);
    let heightRight = this.height(node.right);

    return Math.abs(heightLeft - heightRight) <= 1
      && this.isBalanced(node.left)
      && this.isBalanced(node.right);
  }

  rebalance() {
    this.root = buildTree(this.inorder());
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
  
  if (start > end) return null;
  const middle = parseInt((start + end) / 2);

  const newNode = new Node(arr[middle]);
  newNode.left = build(arr, start, middle-1);
  newNode.right = build(arr, middle+1, end);

  return newNode;
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
  }
}



function randArray(max, len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(randInt(0, max));
  }

  return arr;
}

function randInt(min, max) {
  return min + Math.round(Math.random() * (max - min))
}

const arr = randArray(50, 20);
const newTree = new Tree(arr);
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preorder());
console.log(newTree.postorder());
console.log(newTree.inorder());

for (let i = 0; i < 10; i++) {
  newTree.insert(randInt(100, 200))
}

console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preorder());
console.log(newTree.postorder());
console.log(newTree.inorder());