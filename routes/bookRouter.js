const express = require("express");

function routes(Book) {
	const bookRouter = express.Router();

	bookRouter
		.route("/books")
		.post((req, res) => {
			const book = new Book(req.body);
			book.save(); // for saving it in database
			return res.status(201).json(book); // 201 code for creation
		})
		.get((req, res) => {
			//const {query} = req;
			const query = {};
			if (req.query.genre) {
				query.genre = req.query.genre;
			}
			Book.find(query, (err, books) => {
				if (err) {
					return res.send(err);
				}
				return res.json(books);
			});
		});

	bookRouter.route("/books/:bookId").get((req, res) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				return res.send(err);
			}
			return res.json(book);
		});
	});

	return bookRouter;
}

module.exports = routes;