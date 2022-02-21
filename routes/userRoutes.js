module.exports = (app) => {
  const users = require("../cotrollers/userController");
  const products = require("../cotrollers/productController");
  const Orders = require("../cotrollers/orderController");
  const verifyToken = require("../middleware/jwt");

  // Create a new user
  app.post("/userSignup", users.signUp);
  app.post("/userSignin", users.signIn);
  app.get("/allUsers", verifyToken, users.allUsers);
  app.put("/editUser/:id", verifyToken, users.editUser);
  app.delete("/deleteUser/:id", verifyToken, users.deleteUser);

  // Create new product
  app.post("/addProduct", verifyToken, products.addProduct);
  app.get("/allProducts", verifyToken, products.allProducts);
  app.put("/editProduct/:id", verifyToken, products.editProduct);
  app.delete("/deleteProduct/:id", verifyToken, products.deleteProduct);

  // Create new Order
  app.post("/addOrder", verifyToken, Orders.addOrder);
  app.get("/allOrders", verifyToken, Orders.allOrders);
  app.put("/editOrder/:id", verifyToken, Orders.editOrder);
  app.delete("/deleteOrder/:id", verifyToken, Orders.deleteOrder);
};
