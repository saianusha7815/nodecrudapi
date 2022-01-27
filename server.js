// Importing expressjs

//express js for creating server and api to get,post,put and delete
const express = require('express')

//body Parser for getting the data through the urls
const bodyParser = require('body-parser')

//Importing Mongo Client
const MongoClient = require('mongodb').MongoClient

//const app controls the entire app with express finctional constructor
//server and api's
const app =express()

//wee are saying express.js that to use body parser url encoded to be true
app.use(bodyParser.urlencoded({extended : true}))

//Db connection String
const connectionString="mongodb+srv://Saianusha:Saianusha@cluster0.apekh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//connecting the db
MongoClient.connect(connectionString,{useUnifiedTopology:true})
    .then(client=>{
         console.log('connected to database-server')
         const db=client.db('star-wars-quotes')
         const quotesCollection=db.collection('quotes')

         //create route with creating the quote
                app.post('/quotes',(req,res) =>{
                    quotesCollection.insertOne(req.body)
                    .then(result=>{
                        console.log (result)
                    })
                    .catch(error=>console.error(error))
                    })

}).catch(console.error)  //promises


app.get('/',(req,res)=>{
    res.sendFile(__dirname + './index.html')
})

const PORT=3000

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
