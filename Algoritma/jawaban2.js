const longestWord = (sentence) => {
  const cleaned = sentence.replace(/[^\w\s]/g, "");

  const words = cleaned.split(" ");

  let longestWord = "";

  for (let word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return longestWord;
};

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const hasil = longestWord(sentence);
console.log(hasil);
