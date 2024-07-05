const reverseAlphabet = (input) => {
  const matches = input.match(/([A-Za-z]+)(\d+)?/);

  let result = "";
  let numberPart = "";

  if (matches) {
    const letters = matches[1];
    const number = matches[2];

    if (letters) {
      result = letters.split("").reverse().join("");
    }

    if (number) {
      numberPart = number;
    }
  }

  return result + numberPart;
};

const string = "NEGIE1";
const hasil = reverseAlphabet(string);
console.log(hasil);
