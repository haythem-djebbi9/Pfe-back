const Panier = require('../models/panier');
const Product = require('../models/produit');

const createPanier = async (req, res, fileName) => {
  try {
    // Find the cart belonging to the user
    let cart = await Panier.findOne({ user: req.body._id });
    if (!cart) {
      cart = new Panier({
        user: req.body._id
      });
    }
    cart.itemsnumber++;
    // Check if the item is already in the cart
    const existingItem = cart.items.find(item => item.product.toString() === req.body.productId);

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      existingItem.quantity += +req.body.quantity;
      console.log(typeof(req.body.quantity))
      console.log(typeof(existingItem.quantity))
    } else {
      // If the item is not in the cart, add it
      const product = await Product.findById(req.body.productId);
      cart.items.push({ product: req.body.productId, quantity: req.body.quantity, name: product.name, image: product.image, category: product.category, price: product.price });
    }
    cart.total += req.body.price * req.body.quantity;
    // Save the updated cart to the database
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(400).send(error);
  }

  
}
module.exports = {
    createPanier
   
}
