const router = require("express").Router();
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const sendReservationEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {

  try {

    const reservation = await Reservation.create(req.body);

    const populatedReservation =
      await Reservation.findById(
        reservation._id
      ).populate("restaurantId");

    const user = await User.findById(
      req.body.userId
    );

    const restaurant =
      await Restaurant.findById(
        req.body.restaurantId
      );

    if (user && restaurant) {

      await sendReservationEmail(
        user.email,
        restaurant.name,
        req.body.date,
        req.body.time,
        req.body.guests
      );

    }

    res.status(201).json(populatedReservation);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});
router.get("/", async(req,res)=>{

   try{

      const reservations =
      await Reservation.find()
      .populate("userId")
      .populate("restaurantId");

      res.status(200).json(
         reservations
      );

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }

});
router.get("/user/:id", async(req,res)=>{
   try{
      const reservations =
      await Reservation.find({
         userId:req.params.id
      })
      .populate("restaurantId");
      res.status(200).json(
         reservations
      );
      
   }catch(err){
      res.status(500).json({
         message:err.message
      });
   }
});
router.delete("/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    res.json({
      message: "Reservation Cancelled"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
module.exports = router;