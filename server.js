const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.set('view engine','ejs') //engine para visualização dinamica

app.use(express.static('public')) //para indicar ao express a pasta com arquivo JS

app.use(bodyParser.json()) //para que o servidor consiga ler dados JSON

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

app.put('/quotes', (req, res) =>{
    db.collection('quotes').findOneAndUpdate(
        {
            name: "Yoda"//query (busca pelo valor na collection cujo nome seja Yoda)
        },
        {
            $set: {
                name: req.body.name, //update (indica o que fazer com o valor,
                quote: req.body.quote //aqui $set é mudar para o que foi passado na requisição)
            }
        }, 
        {
            sort: {_id:-1}, //options(aqui usa o sort e escolhe a última citação do nome Yoda)
            upsert: true //upsert cria uma citação no caso de não haver citação de Yoda
        },
        (err, result) => { //callback
            if (err) return res.send(err)
            res.send(result)
        } 
    )
})

app.delete('/quotes', (req, res) =>{
    db.collection('quotes').findOneAndDelete(
        {
            name: req.body.name //query
        },
            (err, result) => {
                if (err) return res.send(500, err)
                res.send({message: 'A darth vader quote got deleted'})
            })
})
