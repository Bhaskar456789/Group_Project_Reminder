require('dotenv').config()
const express = require("express")
const mongoose= require('mongoose')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/reminderDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>console.log("DB Connected"))


const reminderSchema = new mongoose.Schema({
    reminderMsg:String,
    remindAt:String,
    isReminded:Boolean
})

const Reminder = new mongoose.model("reminder",reminderSchema)

app.get("/getAllReminder",(req,res)=>{
    Reminder.find({},(err ,reminderList) =>{
        if(err){
            console.log(err)
        }
        if (reminderList){
            res.send(reminderList)
        }
    })
})

app.post("/addReminder",(req,res)=> {
    const { reminderMsg , remindAt} = req.body
    const reminder = new Reminder({
        reminderMsg,
        remindAt,
        isReminded:false
     })
     reminder.save(err =>{
        if(err){
            console.log(err)
        }
        Reminder.find({},(err,reminderList)=>{
            if(err){
                console.log(err)
            }
            if (reminderList){
                res.send(reminderList)
            }
        })
     })

})

app.post('/deleteReminder',(req,res)=>{

        reminder.deleteOne({_id:req.body.id},()=>{
            Reminder.find({},(err,reminderList)=>{
                if(err){
                    console.log(err)
                }
                if (reminderList){
                    res.send(reminderList)
                }
            })
        }) 
    })


app.get("/",(req,res)=>{
    res.send("A message from BE")
})

app.listen(9000 , ()=>console.log('BE started bro'))

