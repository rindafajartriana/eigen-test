const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - borrowedBooks
 *         - penaltyEndDate
 *       properties:
 *         code:
 *           type: string
 *           description: The code of the member
 *         name:
 *           type: string
 *           description: The name of the member
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of borrowed book codes
 *         penaltyEndDate:
 *           type: string
 *           format: date
 *           description: The end date of the penalty
 *       example:
 *         code: "M001"
 *         name: "Angga"
 *         borrowedBooks: []
 *         penaltyEndDate: null
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The members managing API
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Returns the list of all the members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of the members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get("/", memberController.getAllMembers);

/**
 * @swagger
 * /members/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *             example:
 *               memberCode: "M001"
 *               bookCode: "JK-45"
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error message
 *       404:
 *         description: Member or book not found
 */
router.post("/borrow", memberController.borrowBook);

/**
 * @swagger
 * /members/return:
 *   post:
 *     summary: Return a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *               returnDate:
 *                 type: string
 *                 format: date
 *             example:
 *               memberCode: "M001"
 *               bookCode: "JK-45"
 *               returnDate: "2024-07-02"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error message
 *       404:
 *         description: Member or book not found
 */
router.post("/return", memberController.returnBook);

module.exports = router;
