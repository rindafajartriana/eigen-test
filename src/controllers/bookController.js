const books = require("../models/book");
const members = require("../models/member");

const getAllBooks = (req, res) => {
  res.status(200).json(books);
};

module.exports = {
  getAllBooks,
};
