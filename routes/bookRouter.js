const express = require("express");

function routes(Book) {
	const bookRouter = express.Router();

	bookRouter
		.route("/books")
		.post((req, res) => { // create a new record
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

	//midlleware
	bookRouter.use("/books/:bookId", (req,res,next)=>{
		Book.findById(req.params.bookId, (err, book) => {
					if (err) {
						return res.send(err);
					}
					if(book){
						req.book = book;
						return next();
					}
					return res.sendStatus(404);
				});
	});
	bookRouter.route("/books/:bookId")
	.get((req, res) => { res.json(req.book); })
	.put((req, res) => { // modify all fields
			const {book} = req;
			book.title = req.body.title;
			book.author = req.body.author;
			book.genre = req.body.genre;
			book.read = req.body.read;
			req.book.save((err)=>{
			if(err)
				return res.send(err);
			return res.json(book);
		});
			return res.json(book);
		})
	
	.patch((req, res) => { // modify only a field
		const{book} = req;
		/*if(req.body.title){
			book.title = req.body.title;
		}*/
		if(req.body._id){
			delete req.body._id;
		}
		Object.entries(req.body).forEach(item=> {
			const key = item[0];
			const value = item[1];
			book[key] = value;
		});
		req.book.save((err)=>{
			if(err)
				return res.send(err);
			return res.json(book);
		});
	});

	return bookRouter;
}

module.exports = routes;