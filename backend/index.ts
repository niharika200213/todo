import express, { Request, Response } from "express"
import cors from "cors"
import mongoose, { ConnectOptions } from "mongoose"
import todoRoutes from "./routes/totoRoutes";
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','PATCH','DELETE']
}));

app.use('/api', todoRoutes);  

app.get('/', function(req, res){
    return res.json({name:"niharika"})
});

app.use((err:any, req:Request, res:Response, next:any)=>{
    console.log(err)
    return res.status(err.status).json(err);
});

mongoose.connect(process.env.MONGOOSE_URI!,{
    useNewUrlParser: true, useUnifiedTopology: true
} as ConnectOptions ).then(()=>{
    app.listen(process.env.PORT, function(){
        console.log('db')
    });})