import express, { json } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cron from "node-cron"
import { Task } from "./models/task.model.js"
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


// Schedule the cron job (e.g., every hour)
cron.schedule('0 * * * *', async () => {
  try {
    console.log("in expire module")
    const now = new Date();

    // Update tasks where the deadline has passed
    const result = await Task.updateMany(
      { deadline: { $lt: now }, status: { $ne: 'expired' } },
      { $set: { status: 'expired' } }
    );

    console.log(`Expired tasks updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error('Error marking tasks as expired:', error);
  }
});


 //import routes
import TaskRouter from "./routes/task.route.js" 
 //routes declaration
app.get('/api/v1',(req,res)=>{
    res.send('welcome to task api')
})
app.use('/api/v1/tasks',TaskRouter) 


export {app}