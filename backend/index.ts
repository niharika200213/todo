import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','PATCH','DELETE']
}));
app.get('/', function(req, res){
    return res.json({name:"niharika"})
})
app.use((req, res, error)=>{
    return res.json(error);
})

mongoose.connect('mongodb+srv://niharika:niharika@cluster1.4fqv3.mongodb.net/assignment?retryWrites=true&w=majority').then(()=>{
    app.listen(5000, function(){
        console.log('db')
    });})