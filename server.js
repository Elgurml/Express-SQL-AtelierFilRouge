const express = require('express')
const connection = require('./conf')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


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

app.get('/allcards/:order', (req,res)=>{
    const order = req.params.order
    console.log(order);
    connection.query(`SELECT * FROM mtgcards ORDER BY cardname ${order}`, (err, result)=>{
        if(err){
            res.status(500).send('Internal server error')
        }else{
            res.status(200).send(result)
        }
    })
})

app.post('/allcards', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO mtgcards SET ?', formData, (err, results) => {
        if (err) {
        console.log(err);
        res.status(500).send("Error saving an employee");
        } else {
        res.sendStatus(200);
        }
    });
});

app.put('/mtgcards/:id', (req, res) => {
    const idCard = req.params.id;
    const formData = req.body;
    connection.query('UPDATE mtgcards SET ? WHERE id = ?', [formData, idCard], err => {
        if (err) {
        console.log(err);
        res.status(500).send("Error editing a card");
        } else {
        res.sendStatus(200);
        }
    });
});

app.put('/mtgcards/:id', (req, res) => {
    const idCard = req.params.id;
    connection.query('UPDATE mtgcards SET modernlegal=!modernlegal WHERE id = ?', idCard, err => {
        if (err) {
        console.log(err);
        res.status(500).send("Error editing a card");
        } else {
        res.sendStatus(200);
        }
    });
});

app.delete('/mtgcards/:id', (req, res) => {
    const idCard = req.params.id;
    connection.query('DELETE FROM mtgcards WHERE id = ?', [idCard], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting a card");
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete('/mtgcards/', (req, res) => {
    const idCard = req.params.id;
    connection.query('DELETE FROM mtgcards WHERE modernlegal = 0 ', [idCard], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting a card");
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(4000, err=>{
    if(err){
        throw new Error('Oops we have a bug')
    }
    console.log('server is running on port 4000');
})
