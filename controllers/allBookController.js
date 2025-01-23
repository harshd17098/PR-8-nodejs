const Books = require('../models/bookStoreModel');

exports.allBooks = async (req, res) => {
    try {
        let books = await Books.find({}).populate('categoryId').populate('subcategoryId');

        const sort = req.query.sort; 

        if (sort === 'low-to-high') {
            books.sort((a, b) => a.price - b.price);
        } else if (sort === 'high-to-low') {
            books.sort((a, b) => b.price - a.price);
        }

        res.render('userBook/userBookAll', { book: books });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send('Error fetching products');
    }
};

exports.singleBook = async (req, res) => {
    try {
        let books = await Books.findById(req.params.id)
            .populate('categoryId')
            .populate('subcategoryId');
            console.log(books,"hyyyyyy");
            
        if (!books) {
            return res.status(404).render('error', { message: 'Book not found' });
        }
        return res.render('userBook/singleBook', { books });
        
    } catch (error) {
        console.error(error);
        return res.status(500).render('error', { message: 'An error occurred while fetching the book' });
    }
};