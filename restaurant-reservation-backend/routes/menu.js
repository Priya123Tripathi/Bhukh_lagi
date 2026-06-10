const router = require("express").Router();
const Menu = require("../models/Menu");

router.post("/", async(req,res)=>{
   try{

      const menu = await Menu.create(req.body);

      res.status(201).json(menu);

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }
});
router.get("/", async(req,res)=>{

   try{

      const menuItems =
      await Menu.find().populate("restaurantId");

      res.status(200).json(menuItems);

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }

});
router.get("/restaurant/:id", async(req,res)=>{

   try{

      const menuItems =
      await Menu.find({
         restaurantId:req.params.id
      });

      res.status(200).json(menuItems);

   }catch(err){

      res.status(500).json({
         message:err.message
      });

   }

});
module.exports = router;