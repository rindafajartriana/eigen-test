const countWordsInQuery = (array1, array2) => {
  const wordCount = {};

  array1.forEach((word) => {
    if (wordCount[word]) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  });

  const output = array2.map((word) => {
    return wordCount[word] || 0;
  });

  return output;
};

const array1 = ["xc", "dz", "bbb", "dz"];
const array2 = ["bbb", "ac", "dz"];

const hasil = countWordsInQuery(array1, array2);
console.log(hasil);
