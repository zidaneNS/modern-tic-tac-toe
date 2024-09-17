// ini gae simulasi logic ai ne sebelum dipake ndek ai.js

const fs = require("fs");
const path = require("path");

// ini function ngerandom str2 dengan memperhatikan str1 sebagai perbandingan
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
        temp[5] -= 1; // Memperbaiki index array di sini
      }
      result.push(temp);
    }
  }

  return result;
};

// PR bikin decision tree nya
// class decision tree
class Tree {
  constructor(str, lvl) {
    this.str = str;
    this.child = [];
    this.level = lvl;
  }

  getNode(str) {
    const newTree = new Tree(str, this.level + 1);
    this.child.push(newTree);
    return newTree; // Return new node so it can be used for further operations
  }
}

// baris ini seterusnya masih belum jelas soale belum nemu function bikin decision tree nya
const replaceStr = (str, index, newstr) => {
  const raw = str.split("").map(Number);

  raw[index] = newstr;

  const result = raw.join("");
  return result;
};
// Fungsi untuk membangun pohon keputusan secara rekursif
const decTree = (comp, tree, visited = new Set()) => {
  // Dapatkan node child baru berdasarkan fungsi rand
  const nodes = rand(comp, tree.str);

  if (tree.level % 2 == 0) {
    nodes.forEach((node) => {
      node[6] = 1;
    });
  } else {
    nodes.forEach((node) => {
      node[6] = 0;
    });
  }

  nodes.forEach((node) => {
    const nodeStr = node.join("");

    if (!visited.has(nodeStr)) {
      visited.add(nodeStr);
      const newNode = tree.getNode(nodeStr); // Tambahkan node baru ke pohon
      decTree(comp, newNode, visited); // Rekursi pada child
    }
  });
};

// Inisialisasi root dan bangun pohon keputusan
const root = new Tree("0003320", 0);
decTree("0003321", root);

// Fungsi untuk mencetak pohon keputusan
const printTree = (tree, branch = "") => {
  console.log(branch + tree.str);

  // Menulis ke file
  const filePath = path.join("data.txt");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
  fs.appendFileSync(filePath, branch + tree.str + "\n");

  tree.child.forEach((child) => {
    printTree(child, branch + "--");
  });
};

printTree(root);
