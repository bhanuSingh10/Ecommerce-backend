const categoryModel=require("../models/categoryModel")


exports.createNewCategory=async (req,res)=>{
    // read the req body

    const categoryDate={
        name: req.body.name,
        description: req.body.description
    }

    try {
        const category=await categoryModel.create(categoryDate)
        return res.status(201).send(category)

    } catch (error) {
        console.log("error occur while creating the category",error);
        return res.status(500).send({
            message:"errorw while creating the category"
        })
    }
}