const categoryController=require("../controllers/categoryControlller")
const authMiddleware = require("../middlewares/authMiddleware")


module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[authMiddleware.verifyToken, authMiddleware.isAdmin],categoryController.createNewCategory)
}