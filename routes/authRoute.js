

const auhController=require("../controllers/authController")
const authMiddleware=require("../middlewares/authMiddleware")


module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMiddleware.verifySignupBody],auhController.signup)

    app.post("/ecomm/api/v1/auth/signin",[authMiddleware.verifySigninBody],auhController.signin)
}