const router = require("express").Router();
const Restaurant = require("../models/Restaurant");

router.post("/", async (req,res)=>{

   try{

      const restaurant =
      await Restaurant.create(req.body);

      res.status(201).json(restaurant);

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }

});
router.get("/", async (req,res)=>{

   try{

      const restaurants =
      await Restaurant.find();

      res.status(200).json(restaurants);

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }

});
router.get("/:id", async(req,res)=>{

   try{

      const restaurant =
      await Restaurant.findById(
         req.params.id
      );

      res.status(200).json(
         restaurant
      );

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }

});
module.exports = router;