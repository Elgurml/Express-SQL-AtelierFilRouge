const express = require('express')
const connection = require('./conf')

const app = express()

app.get('/', (req, res)=>{
    res.status(200).send('server is live!')
})

app.listen(4000, err=>{
    if(err){
        throw new Error('Oops we have a bug')
    }
    console.log('server is running on port 4000');
})

