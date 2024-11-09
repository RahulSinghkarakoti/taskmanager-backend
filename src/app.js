import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app=express()

//use method is used to implement midelwears (cors,cookieparse)
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))


app.use(bodyParser.json());

app.use(cookieParser());//use to perform CRUD operation on cookies_at user device

// //import routes
import TaskRouter from "./routes/task.route.js" 

// //routes declaration
app.get('/api/v1',(req,res)=>{
    res.send('welcome to task api')
})
app.use('/api/v1/tasks',TaskRouter) 


export {app}