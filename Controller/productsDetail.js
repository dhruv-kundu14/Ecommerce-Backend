// controllers/productController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../Configurations/mongo');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Sanitize filename
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-z0-9.-]+/gi, '_').toLowerCase();
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    const safeFilename = sanitizeFilename(file.originalname);
    cb(null, `${Date.now()}-${safeFilename}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

// POST route to store product data with image
const enterProducts = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        category: req.body.category,
        brand: req.body.brand,
        inStock: req.body.inStock === 'true',
        stockQuantity: req.body.stockQuantity,
        rating: req.body.rating,
        reviews: req.body.reviews,
        colors: req.body.colors,
        sizes: req.body.sizes,
        images: `/uploads/${req.file.filename}`, // Correct path
        tags: req.body.tags,
        dimensions: req.body.dimensions,
      };

      const result = await getDb().collection('userProducts').insertOne(productData);
      res.status(201).json({ message: 'Product inserted successfully', result });
    } catch (error) {
      console.error('Error saving product data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

// Route to get all products
const getProducts = async (req, res) => {
  try {
    const products = await getDb().collection('userProducts').find({}).toArray();
    res.status(200).json(products); // Send the array of products
    console.log("get product")
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = { enterProducts, getProducts };
