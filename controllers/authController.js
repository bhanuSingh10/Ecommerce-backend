const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

exports.signup = async (req, res) => {
    const requestBody = req.body;

    const userObj = {
        name: requestBody.name,
        userId: requestBody.userId,
        email: requestBody.email,
        userType: requestBody.userType, // corrected typo here
        password: bcrypt.hashSync(requestBody.password, 8) // corrected typo here
    };

    try {
        const userCreated = await userModel.create(userObj);

        const res_obj={
            name:userCreated.name,
            userId:userCreated.userId,
            email:userCreated.email,
            userType:userCreated.userType,
            createdAt:userCreated.createdAt,
            updatedAt:userCreated.updatedAt,

        }

        res.status(201).send(res_obj);
    } catch (err) {
        console.log("Error occurred while creating the user ", err);
        res.status(500).send({
            message: "Error occurred while registering the user"
        });
    }
};
