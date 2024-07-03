const books = require("../models/book");
const members = require("../models/member");

const findMember = (memberCode) => members.find((m) => m.code === memberCode);
const findBook = (bookCode) => books.find((b) => b.code === bookCode);
const isBookBorrowedByOtherMember = (bookCode) =>
  members.some((m) => m.borrowedBooks.includes(bookCode));
const isBookBorrowedByMember = (member, bookCode) =>
  member.borrowedBooks.includes(bookCode);

const borrowBook = (req, res) => {
  const { memberCode, bookCode } = req.body;
  const member = findMember(memberCode);
  const book = findBook(bookCode);

  if (!member || !book) {
    return res.status(404).json({ message: "Member or book not found" });
  }

  if (member.penaltyEndDate && new Date(member.penaltyEndDate) > new Date()) {
    return res
      .status(400)
      .json({ message: "Member is currently being penalized" });
  }

  if (member.borrowedBooks.length >= 2) {
    return res.status(400).json({ message: "Cannot borrow more than 2 books" });
  }

  if (isBookBorrowedByOtherMember(bookCode)) {
    return res
      .status(400)
      .json({ message: "Book is already borrowed by another member" });
  }

  member.borrowedBooks.push({
    code: bookCode,
    borrowDate: new Date().toISOString().split("T")[0],
  });
  book.stock -= 1;
  res.status(200).json({ message: "Book borrowed successfully" });
};

const returnBook = (req, res) => {
  const { memberCode, bookCode, returnDate } = req.body;
  const member = findMember(memberCode);
  const book = findBook(bookCode);

  if (!member || !book) {
    return res.status(404).json({ message: "Member or book not found" });
  }

  if (!isBookBorrowedByMember(member, bookCode)) {
    return res
      .status(400)
      .json({ message: "This book was not borrowed by this member" });
  }

  const borrowRecord = member.borrowedBooks.find((b) => b.code === bookCode);
  const daysBorrowed = Math.ceil(
    (new Date(returnDate) - new Date(borrowRecord.borrowDate)) /
      (1000 * 60 * 60 * 24)
  );

  if (daysBorrowed > 7) {
    member.penaltyEndDate = new Date(
      new Date().setDate(new Date().getDate() + 3)
    )
      .toISOString()
      .split("T")[0];
  }

  member.borrowedBooks = member.borrowedBooks.filter(
    (b) => b.code !== bookCode
  );
  book.stock += 1;
  res.status(200).json({ message: "Book returned successfully" });
};

const getAllMembers = (req, res) => {
  const memberDetails = members.map((member) => ({
    code: member.code,
    name: member.name,
    borrowedBooks: member.borrowedBooks.length,
  }));
  res.status(200).json(memberDetails);
};

module.exports = {
  borrowBook,
  returnBook,
  getAllMembers,
};
