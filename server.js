const express=require("express")
const mongoose=require("mongoose")
const app=express()
const server_config=require("./configs/serverConfig")
const db_config=require("./configs/dbConfig")
const user_model=require("./models/userModel")
const bcrypt=require("bcryptjs")

app.use(express.json())


try {
    mongoose.connect(db_config.DB_URL)
    console.log("connected to Database");
    init()
    
} catch (error) {
    console.log("error occur on connecting the db",error);
}

async function init(){
    let user=await user_model.findOne({userId: "admin"})

    if(user){
        console.log("admin is already present");
        return 
    } 
    try {
        user=await user_model.create({
            name:"temp",
            userId:"admin",
            email:"xyz@test.com",
            userTypes:"ADMIN",
            password:bcrypt.hashSync("welcome1",8)
        })
        console.log("admin created ",user);
    } catch (error) {
        console.log("erro while creating the user",error);
    }
}

require("./routes/authRoute")(app)

app.listen(server_config.PORT,()=>{
    console.log(`server connected at localhost:${server_config.PORT}`);
})

