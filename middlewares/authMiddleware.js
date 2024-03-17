const user_model=require("../models/userModel")
const jwt=require("jsonwebtoken")
const authConfig = require("../configs/authConfig")
const userModel = require("../models/userModel")


const verifySignupBody=async (req,res,next)=>{
    try {

        if(!req.body.name){
           return res.status(400).send({
                mesage:"no name was provided"
            })
        }
        if(!req.body.email){
           return res.status(400).send({
                mesage:"no email was provided"
            })
        }
        if(!req.body.userId){
           return res.status(400).send({
                mesage:"no userId was provided"
            })
        }
        if(!req.body.password){
           return res.status(400).send({
                mesage:"no passowrd was provided"
            })
        }

        const user=await user_model.findOne({userId:req.body.userId})

        if(user){
            return res.status(400).send({
                mesage:"user is already present"
            })
        }
        next()
        
    } catch (err) {
        console.log("error while validating the request object");
        res.status(500).send({
            mesage:"error while validating the request body"
        })
        
    }
}

const verifySigninBody=async (req,res,next)=>{
    try {

        if(!req.body.userId){
           return res.status(400).send({
                mesage:"no userId was provided"
            })
        }
        if(!req.body.password){
           return res.status(400).send({
                mesage:"no password was provided"
            })
        }
       
        next()

        
    } catch (err) {
        console.log("error occur while signin");
        res.status(500).send({
            mesage:"error while validating the request body"
        })
        
    }
}


const verifyToken= async (req,res,next)=>{

    const token=req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({
            message:"no token found: unauthorized"
        })
    }

    jwt.verify(token,authConfig.secret,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"unauthorized"
            })
        }

        const user=await userModel.findOne({userId:decoded.id})

        if(!user){
            return res.status(400).send({
                message:"unauthorized, user does not exist"
            })
        }
        req.user=user
        next()
    })

   


}


const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN"){
        next()
    } else{
        return res.status(403).send({
            message:"only admin user allowed to access this endpoint"
        })
    }
   
}




module.exports = {
    verifySignupBody : verifySignupBody,
    verifySigninBody : verifySigninBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}