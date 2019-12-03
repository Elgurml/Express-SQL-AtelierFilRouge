const express = require('express')
const connection = require('./conf')

const app = express()

app.get('/', (req, res)=>{
    res.status(200).send('server is live!')
})

app.get('/allcards', (req,res)=>{
    connection.query('SELECT * FROM mtgcards', (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})

app.get('/cardslegality', (req,res)=>{
    connection.query('SELECT cardname, modernlegal FROM mtgcards', (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})

app.get('/filter1', (req,res)=>{
    connection.query("SELECT id, cardname FROM mtgcards WHERE cardname LIKE '%ac%' ", (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})

app.get('/filter2', (req,res)=>{
    connection.query("SELECT id, cardname FROM mtgcards WHERE cardname LIKE 'bla%' ", (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})

app.get('/filter3', (req,res)=>{
    connection.query("SELECT id, cardname, CMC FROM mtgcards WHERE CMC >= 2 ", (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})

////// :order n'est pas pris en compte /////

app.get('/allcards/:order', (req,res)=>{
    const order = req.params.order
    connection.query('SELECT * FROM mtgcards ORDER BY cardname ? ', order, (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})



app.listen(4000, err=>{
    if(err){
        throw new Error('Oops we have a bug')
    }
    console.log('server is running on port 4000');
})
