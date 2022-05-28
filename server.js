const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const configDB = require('./config/config.js')

MongoClient.connect(configDB.connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const dreamCollection = client.db('bucket-list').collection('dreams')

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            dreamCollection.find().toArray()
                .then(results => {
                    let dream = results.filter(element => element.completed === false)
                    let conquer = results.filter(element => element.completed === true)
                    res.render('index.ejs', { dreams: dream, conquer: conquer })
                    // instead of passing in all elements (result), pass in the filtered results (dream)
                    //
                })
        })

        app.post('/dreams', (req, res) => {
            dreamCollection.insertOne({ name: req.body.name, dream: req.body.dream, startDate: Date("<YYYY-mm-dd>"), completed: false }, (err, result) => { // completed shows this 
                if (err) return console.log(err)
                console.log('saved to database')
                res.redirect('/')
            })
        })

        app.put('/dreams', (req, res) => {
            dreamCollection.findOneAndUpdate({ name: req.body.name, dream: req.body.dream }, {
                $set: {
                  completed: true,
                  completedDate: Date("<YYYY-mm-dd>")
                }
              }, {
                sort: { _id: -1 },
                upsert: false
              }, (err, result) => {
                if (err) return res.send(err)
                res.send(result)
              })
          })


        app.delete('/dreamsDelete', (req, res) => {
            dreamCollection.findOneAndDelete({name: req.body.name, dream: req.body.dream}, (err, results) => {
                // test delete method
                console.log(req.body.dream, req.body.name)
                if (err) return res.send(500, err)
                res.send('Dream deleted!')
            })
        })

        app.listen(4028, function() {
            console.log('listening on 4028')
        })
    })