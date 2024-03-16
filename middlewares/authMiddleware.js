const user_model=require("../models/userModel")

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




module.exports = {
    verifySignupBody : verifySignupBody,
    verifySigninBody : verifySigninBody
}