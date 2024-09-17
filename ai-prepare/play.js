// const root = new Tree("0022", 0);
// root.getNode("1012");
// root.getNode("0112");
// root.getNode("2021");
// root.getNode("0221");

// root.child[0].getNode("0012");
// root.child[0].getNode("0112");
// root.child[0].child[0].getNode("a");
// root.child[0].child[0].getNode("b");
// root.child[0].child[1].getNode("c");
// root.child[0].child[1].getNode("tujuan");

// ini untuk depth first search
// const dfs = (tree, str, path = []) => {
//   // Cek apakah node saat ini adalah yang dicari
//   if (tree.str === str) {
//     return path; // Kembalikan path jika ditemukan
//   }

//   // Iterasi melalui semua child node
//   for (let i = 0; i < tree.child.length; i++) {
//     const newPath = [...path, i]; // Tambahkan index child ke path
//     const result = dfs(tree.child[i], str, newPath); // Rekursi ke child
//     if (result) {
//       return result; // Kembalikan jalur yang benar saat ditemukan
//     }
//   }

//   return null; // Kembalikan null jika tidak ditemukan
// };

// // Mencari node dengan nilai "c"
// const targetPath = dfs(root, "c");
// console.log("Path to 'c' (index child):", targetPath);
class Tree {
  constructor(str) {
    this.str = str;
    this.child = [];
  }

  addChild(node) {
    this.child.push(node);
  }

  getNode(str) {
    for (let child of this.child) {
      if (child.str === str) {
        return child;
      }
    }
    const newNode = new Tree(str);
    this.addChild(newNode);
    return newNode;
  }
}

const rand = (str1, str2) => {
  const str1Arr = str1.split("").map(Number); // Mengonversi elemen ke angka
  const str2Arr = str2.split("").map(Number); // Mengonversi elemen ke angka

  const pawn = str2Arr[3];
  const warr = str2Arr[4];
  const king = str2Arr[5];

  const result = [];

  if (pawn > 0) {
    for (let i = 0; i < 3; i++) {
      let temp = [...str2Arr]; // Membuat salinan baru dari str2Arr
      if (str1Arr[i] < 1) {
        temp[i] = 1;
        temp[3] -= 1;
      }
      result.push(temp);
    }
  }

  if (warr > 0) {
    for (let i = 0; i < 3; i++) {
      let temp = [...str2Arr]; // Membuat salinan baru dari str2Arr
      if (str1Arr[i] < 2) {
        temp[i] = 2;
        temp[4] -= 1;
      }
      result.push(temp);
    }
  }

  if (king > 0) {
    for (let i = 0; i < 3; i++) {
      let temp = [...str2Arr]; // Membuat salinan baru dari str2Arr
      if (str1Arr[i] < 3) {
        temp[i] = 3;
        temp[5] -= 1;
      }
      result.push(temp);
    }
  }

  return result;
};

const treeO = new Tree("0003320");
const treeX = new Tree("0003321");

const decTree = (tree1, tree2, level = 0, maxDepth = 10) => {
  // Kondisi berhenti: Jika mencapai kedalaman maksimal, hentikan rekursi
  if (level >= maxDepth) return;

  const nodes = rand(tree1.str, tree2.str);

  nodes.forEach((node) => {
    const nodeStr = node.join("");

    // Cek jika node sudah ada sebelumnya untuk mencegah rekursi tanpa henti
    let existingNode = tree2.child.find((child) => child.str === nodeStr);
    if (!existingNode) {
      const nextTree = tree2.getNode(nodeStr);
      if (level % 2 === 0) {
        decTree(nextTree, tree1, level + 1, maxDepth);
      } else {
        decTree(nextTree, tree2, level + 1, maxDepth);
      }
    }
  });
};

// Fungsi untuk mencetak pohon keputusan
const printTree = (tree, branch = "") => {
  console.log(branch + tree.str);

  // // Menulis ke file
  // const filePath = "data.txt";
  // if (!fs.existsSync(filePath)) {
  //   fs.writeFileSync(filePath, "");
  // }
  // fs.appendFileSync(filePath, branch + tree.str + "\n");

  tree.child.forEach((child) => {
    printTree(child, branch + "--");
  });
};

decTree(treeO, treeX);
printTree(treeO);
