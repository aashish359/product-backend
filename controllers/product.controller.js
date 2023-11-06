const axios = require('axios');

const get = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');

    const data = response.data;
    data.products = data.products.map((product) => {
      return {
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category
      }
    })

    return res.status(200).json({ success: true, data: data })
  } catch (err) {
    console.log('Error at productsController.get', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { get }