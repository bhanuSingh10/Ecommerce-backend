

const auhController=require("../controllers/authController")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",auhController.signup)
}