const user = require("../model/users/user.model");
const bcrypt = require("bcrypt");
const  passwordValidator = require('password-validator');
exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.send({
          message: "All fields are required. Please provide the necessary details.",
          status: 400,
        });
      }
  
    // Password validation using password-validator
    const schema = new passwordValidator();
    schema
      .is()
      .min(6)
      .is()
      .max(100)
      .has()
      .digits()
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123"]);
  
    if (!schema.validate(password)) {
      return res.send({
        message: "Invalid password.At least 6 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        status: 400,
      });
    }
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.send({
        message: "Email is already registered. Please use a different email.",
        status: 400,
      });
    }

    // Check for duplicate mobile number
    const existingPhone = await user.findOne({ phone });
    if (existingPhone) {
      return res.send({
        message: "Mobile number is already registered. Please use a different mobile number.",
        status: 400,
      });
    }

    const users = new user({
      name,
      email,
      phone,
      password,
    });
  
    try {
      await users.save();
      res.status(200).send({
        message: "User created successfully",
        data: users,
        status: true,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error creating user",
        message: error.message,
        status: 500,
      });
    }
  };
exports.login = async (req, res) => { 
    const { email, password } = req.body;

    try {
        const findemail = await user.findOne({email})
        if(!findemail){
            return res.json({message : "Invalid Credentials"})
        }
        
      if(password === findemail.password) {
            res.json({ message: "Login successful", data: findemail , status: true});
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch(error) {
        res.json({
            message : "Something went wrong",
            error
        })
    }
}

exports.users = async (req, res) => {
   const alluser = await user.find();
    res.send({
        message : "All users",
        data : alluser
    })
}