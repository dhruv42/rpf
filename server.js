const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',require('./routes'));

app.get('/health',(req,res) => {
    res.status(200).json({
        message:'I am alive'
    })
})

app.listen(PORT, () => {
    console.log(` === server started running on ${PORT} ===`);
})

module.exports =  app