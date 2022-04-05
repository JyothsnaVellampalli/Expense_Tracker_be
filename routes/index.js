var express = require('express');
var router = express.Router();
const {MongoClient,dburl,mongodb} = require('../dbSchema');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/addtransaction', async (req,res) => {
  const client= await MongoClient.connect(dburl);
  const db = await client.db('users');

  try{
  const data = await db.collection('Expense_Tracker').insertOne(req.body[0]);
  console.log({data});
  res.json({
    status: 200,
    message : "Data added successfully",
    data: data
  })
}catch(err){
  res.json({
    status: 404,
    message : 'Internal Server Error'
  })
}
})

router.delete('/deletetransaction', async (req, res) => {
  const client= await MongoClient.connect(dburl);
  const db = await client.db('users');
  console.log({deletedata : req.query.id});
  console.log(req.query.id);
  const data = await db.collection('Expense_Tracker').findOne({id: req.query.id});
  // console.log(data);
    if(data){
      console.log('yes');
      try{
        deletee = await db.collection('Expense_Tracker').deleteOne({id: req.query.id});
        res.json({
        status: 200,
        message: 'Transaction deleted',
        data : data
        })
        } catch(err){
          res.json({
          status: 404,
          message : 'Internal Server Error'
      })
    }

  } else(res.json({
    statuscode : 500,
    message : "Incorrect id"

  }))
})

router.get('/gettransactions', async (req, res) => {
  const client= await MongoClient.connect(dburl);
  const db = await client.db('users');
  try{
    const data = await db.collection('Expense_Tracker').find().toArray();
    // console.log({data});
    res.json({
      status: 200,
      message: 'Transactions fetched',
      data : data
    })
  }catch(err){
    res.json({
      status: 404,
      message : 'Internal Server Error'
    })
  }
})



module.exports = router;
