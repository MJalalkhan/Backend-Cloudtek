const Products = require("../models/productModel");
exports.addProduct = async (req, res) => {
  const { productName, category, type, price, quantity } = req.body;

  const product = await Products.findOne({ productName: productName });

  if (product) {
    return res
      .status(401)
      .send(`product already exist with this name ${product.productName}`);
  }

  const newProducts = new Products({
    productName: productName,
    category: category,
    type: type,
    price: price,
    quantity: quantity,
  });
  newProducts
    .save()
    .then((data) => {
      res.status(200).send({ message: "User Added", data });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

exports.allProducts = async (req, res) => {
  const product = await Products.find();
  if (!product) {
    res.status(401).send({ Error: "No Products" });
    return;
  }

  try {
    res.status(200).send({
      message: `All Products displayed`,
      status: 200,
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};

exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const { productName } = req.body;

  try {
    const response = await Products.findByIdAndUpdate(
      id,
      { $set: { productName: productName } },
      { new: true }
    );
    console.log("res", response);
    if (response === null) {
      return res
        .status(400)
        .send({ message: `No data found against this id ${id}` });
    }
    if (response) {
      res
        .send({
          message: "Product Updated Successfully",
        })
        .status(200);
    }
  } catch (error) {
    console.log("error", error);
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("idddd", id);
  const product = await Products.findById(id);
  if (!product) {
    res.send("Product not found with this id");
    return;
  }

  try {
    const response = await Products.findOneAndDelete({ _id: id });
    if (response) {
      res
        .send({
          message: "Product Deleted Successfully",
        })
        .status(200);
    }
  } catch (error) {
    res
      .send({
        message: "Something went wrong",
      })
      .status(500);
    return false;
  }
};
