const express = require('express')
const app = express()
app.use(express.json)
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    try {
        res.send("Hello")
    }catch (e){
        res.status(400).json(e.message)
    }

})
app.listen(3000,()=>{
    console.log('server is')
})