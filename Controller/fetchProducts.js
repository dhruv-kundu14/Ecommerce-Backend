const { MongoConnection, getDb } = require('../Configurations/mongo');

// Function to fetch products based on filters
const fetchProducts = async (size, price, color) => {
  try {
    const db = getDb(); // Get the database connection
    const productsCollection = db.collection('userProducts'); // Access the 'userProducts' collection

    // Clean and parse price range
    const cleanPrice = price.replace(/\s+/g, '').trim();
    const priceRange = cleanPrice.split(',').map(p => parseInt(p.trim()));

    // Build the query object based on provided filters
    let query = {};

    // Handle size filter
    if (size) {
      const sizeArray = size.split(',').map(s => s.trim());
      query.sizes = { $in: sizeArray };
    }

    // Handle price filter
    if (price && priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1])) {
      query.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }

    // Handle color filter
    if (color) {
      const colorArray = color.split(',').map(c => c.trim());
      query.colors = { $in: colorArray };
    }

    // Fetch products based on the query
    const products = await productsCollection.find(query).toArray();

    return products;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
};

// Route handler to get products based on filters via GET method
exports.fetchProducts = async (req, res) => {
  const { size, price, color } = req.query; // Extract query parameters

  try {
    // Fetch products
    const products = await fetchProducts(size, price, color);

    // If no data is found, send a 404 status
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found matching the criteria.' });
    }else{
        console.log("fetchProducts")
    }

    // Send a 200 status with the data if found
    return res.status(200).json({ products });
  } catch (error) {
    // Log the error and send a 500 status for internal server errors
    console.error('Internal Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
