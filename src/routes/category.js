const {Router} = require('express')
const router = Router() 
const db = require("../config/db")




router.post('/category/insert', async(req, res) => {
  
    try{
    const {title,created_on} = req.body;
    if(!title && !created_on){
      res.send('Please Enter Values')
    }
    const titlevalue = [title];
    const myquery = "INSERT INTO Category (title,created_on) VALUES(?,now())";
    const result = await queryPromise(myquery,titlevalue);
    res.send('Successfully inserted')
    res.json({id: result.insertId,title,created_on}) // to display last add...
    
    }catch(err){
      console.log(err)
    }
  });//Denis

router.get('/category/:categoryID ', (req, res) => {
  
});


module.exports=router