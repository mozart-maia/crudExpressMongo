const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.set('view engine','ejs')

//conexão com o banco
var db
MongoClient.connect('mongodb+srv://admin:abcd1234@cluster0-nxjti.mongodb.net/test?retryWrites=true&w=majority', (err,client) =>{
    if (err) return console.log(err)
    db = client.db('star-wars-quotes')
    app.listen(3000, ()=> {
        console.log('listening to 3000')
    })
})

//parser para transformar os dados recebidos via post em JSON
app.use(bodyParser.urlencoded({extended: true}))


//envio do arquivo html via get
app.get('/', (req,res)=>{    
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        //renderiza o arquivo .ejs
        res.render('index.ejs',{quotes: result})
    })
    // res.sendFile(__dirname + '/index.html')
})

//envio dos dados do formulario via post
app.post('/quotes', (req,res)=>{
    db.collection('quotes').save(req.body, (err,result)=>{
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})
