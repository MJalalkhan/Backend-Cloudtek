const Orders = require("../models/orderModel");
exports.addOrder = async (req, res) => {
  const { userID, productID, totalAmount, status } = req.body;
  console.log("sasasasa", productID);
  const newOrders = new Orders({
    userID: userID,
    productID: productID,
    totalAmount: totalAmount,
    status: status,
  });
  newOrders
    .save()
    .then((data) => {
      res.status(200).send({ message: "User Added", data });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

exports.allOrders = async (req, res) => {
  const order = await Orders.find();
  if (!order) {
    res.status(401).send({ Error: "No Orders" });
    return;
  }

  try {
    res.status(200).send({
      message: `All Orders displayed`,
      status: 200,
      order,
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

exports.editOrder = async (req, res) => {
  const id = req.params.id;
  const { orderName } = req.body;

  try {
    const response = await Orders.findByIdAndUpdate(
      id,
      { $set: { orderName: orderName } },
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
          message: "order Updated Successfully",
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

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  console.log("idddd", id);
  const order = await Orders.findById(id);
  if (!order) {
    res.send("order not found with this id");
    return;
  }

  try {
    const response = await Orders.findOneAndDelete({ _id: id });
    if (response) {
      res
        .send({
          message: "order Deleted Successfully",
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
