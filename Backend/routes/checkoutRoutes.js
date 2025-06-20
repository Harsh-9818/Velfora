const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//@route POST /api/checkout
//@desc Create a new checkout session
//@access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    // Create a new checkout session
    const checkout = new Checkout({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    // ✅ added missing save
    await checkout.save();

    console.log(`Checkout created for user : ${req.user._id}`);
    res.status(201).json(checkout);
  } catch (error) {
    console.error(`Error creating checkout: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

//@route PUT /api/checkout/:id/pay
//@desc updaate checkout to mark as paid after successful payment
//@access Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentDetails, paymentStatus } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "Paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    console.error(`Error updating checkout payment status: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

//@route POST /api/checkout/:id/finalize
//@desc Finalize the checkout and convert to an order after payment confirmation
//@access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details

      // ✅ fixed typo Order.Create → Order.create
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      //Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(200).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    } else {
      return res
        .status(400)
        .json({ message: "Checkout not paid or already finalized" });
    }
  } catch (error) {
    console.error(`Error finalizing checkout: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
