const router = require("express").Router();
const Reservation = require("../models/Reservation");


router.post("/", async(req,res)=>{

   try{

      const reservation =
      await Reservation.create(
         req.body
      );

      res.status(201).json(
         reservation
      );

   }catch(err){

      res.status(500).json({
         message:err.message
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
module.exports = router;