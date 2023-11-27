import express, { Request, Response } from "express"
import cors from "cors"
import mongoose, { ConnectOptions } from "mongoose"

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','PATCH','DELETE']
}));
app.get('/', function(req, res){
    return res.json({name:"niharika"})
})
app.use((err:any, req:Request, res:Response, next:any)=>{
    console.log(err)
    return res.status(err.status).json(err);
})

mongoose.connect('mongodb+srv://niharika:niharika@cluster1.4fqv3.mongodb.net/assignment?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
} as ConnectOptions ).then(()=>{
    app.listen(5000, function(){
        console.log('db')
    });})