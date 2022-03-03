//you import your schema and require it for register
const User = require('../model/user.model');
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        try{
           const {firstname, lastname, email, password} = req.body;
           //salting and hashing the password
           const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);
            
            //create a new user
            const user = new User({
                firstname,
                lastname,
                email,
                password: hashedPassword,
           })
            await user.save();

           if(!user) throw new Error("user not created");
           return res.status(200).json({result: user});
        } catch (err) {
            res.status(400).json({ 
            message: err.message 
        });
        }  
    },
    login: async (req,res) => {
        try { 
           const { email, password } = req.body;
           const user = await User.findOne({email});
           if(!user) return res.status(404).send("Email Not Found, pls register");

           const isValid = await bcrypt.compare(password, user.password);
           if (!isValid) return res.status(400).json({result: "wrong password"});
           return res.status(200).json({result: user})
           //console.log(isValid)
           //console.log(user);
        } catch(err) {
        res.status(400).json({message: err.message})
        }
     },
};  
