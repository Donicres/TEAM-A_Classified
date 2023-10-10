const {Router} = require('express')
const router = Router() 
 const db = require("../config/db")



   
function queryPromise(sql,values=[]){
    return new Promise((resolve,reject)=>{
      db.query(sql,values,(error,result)=>{
        if(error){
          reject(error)
        }else{
          resolve(result)
        }
      })
    });
  }  
  

router.post('/create', async(request, respond) => {
    try{
        const {category_id, title, price, paddress } = request.body;
        if(!category_id || !title || !price || !paddress ){
            respond.send("Enter values")
        } 
        const uservalues = [category_id,title,price,paddress];
        const myquery = "INSERT INTO Products (category_id, title, price, paddress,created_on ) VALUES (?,?,?,?,now())"
        const result = await queryPromise(myquery,uservalues)
        respond.send("INSERTED OKAY")
  
  
    }catch(err){
        console.log(err)
    }
    
    });//GOLDEN


    router.get('/search', async(request,response)=>{
        try{
          const query = request.query.q
          const myquery = "SELECT * FROM Products where id like ?"
          const result = await queryPromise(myquery,query)
          if(result.lenght === 0){
            response.json({Message:'No data was found'})
          }else{
            response.status(200).json(result)
          }
      
        }catch(err){
          console.log(err)
        }
      }); //VIVIAN
  


module.exports=router