const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // ₹100 => 10000 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/verify", async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      return res.status(200).json({
        success: true,
        message: "Payment Verified"
      });

    }

    res.status(400).json({
      success: false,
      message: "Invalid Payment"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});
module.exports = router;