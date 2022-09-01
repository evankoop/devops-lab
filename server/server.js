const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const { ROLLBARTOKEN } = process.env

app.use(express.json())
app.use(cors())

const iceCreams = ['Chocolate', 'Vanilla', 'Cookie Dough']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/icecream', (req, res) => {
    res.status(200).send(students)
})

app.post('/api/icecream', (req, res) => {
   let {flavor} = req.body

   const index = iceCreams.findIndex(iceCream => {
       return iceCream === flavor
   })

   try {
       if (index === -1 && flavor !== '') {
           students.push(flavor)
           res.status(200).send(iceCreams)
       } else if (flavor === ''){
           res.status(400).send('You must enter an ice cream flavor.')
       } else {
           res.status(400).send('That flavor already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/icecream/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    res.status(200).send(iceCreams)
})