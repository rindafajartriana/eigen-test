const diagonalDifference = (matrix) => {
  let pertama = 0;
  let kedua = 0;
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    pertama += matrix[i][i];
    kedua += matrix[i][n - 1 - i];
  }

  console.log(pertama);
  console.log(kedua);
  return Math.abs(pertama - kedua);
};

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const hasil = diagonalDifference(matrix);
console.log(hasil);
