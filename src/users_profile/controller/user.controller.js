const User = require("../model/user.model");
const mongoose = require("mongoose");


// create a new user profile
exports.createUserProfile = async(req, res)=>{
    try{
        const { username, first_name, last_name, email, phone_number, address } = req.body;
        if(!username ||!first_name ||!last_name ||!email ||!phone_number){
            return res.status(400).json({message: "Please enter all required fields"});
        }
        if(username || email ){
            const existingUser = await User.findOne({$or: [{username: username}, {email: email}]});
            if(existingUser){
                return res.status(400).json({message: "Username or Email already exists"});
        }}
        if(phone_number){
            const existingUser = await User.findOne({phone_number: phone_number});
            if(existingUser){
                return res.status(400).json({message: "Phone number already exists"});
        }}
        const user = await User.create({username, first_name, last_name, email, phone_number, address});
        return res.status(201).json({ 
            message: "User profile created successfully",
            user: user
        });
    }catch(error){
        return res.status(400).json({
            message:"Error creating user profile",
            error: error.message
        });
    }
}


// Retrieve a list of user profile
exports.getListOfUserProfile = async(req, res)=>{
    try{
        const users = await User.find();
        return res.status(200).json({
            message: "List of user profile",
            users: users
        });
    }catch(error){
        return res.status(500).json({
            message: "Error retrieving list of user profile",
            error: error.message
        });
    }
}


//Retrieve a single user profile
exports.getUserProfile = async (req, res) => {
    try {
        const { zacrac } = req.params;
        if (!zacrac) {
            return res.status(400).json({ message: "Please enter username, email, or id" });
        }

        let user;
        if (mongoose.Types.ObjectId.isValid(zacrac)) {
            user = await User.findById(zacrac);
        } else {
            user = await User.findOne({ $or: [{ username: zacrac }, { email: zacrac }] });
        }

        if (!user) {
            return res.status(404).json({ message: "User Profile not found" });
        }

        return res.status(200).json({
            message: "User profile found",
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving user profile",
            error: error.message
        });
    }
}

// Update an existing user profile 
exports.updateUserProfile = async(req, res)=>{
    try{
        const { id } = req.params;
        const { username, first_name, last_name, email, phone_number, address } = req.body;
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: {
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                address: address
            },
        }, {new: true});
        if(!updateUser){
            return res.status(400).json({message: "User Profile not found"});
        }
        return res.status(200).json({
            message: "User profile updated successfully",
            user: updateUser
        });
    }catch(error){
        return res.status(500).json({
            message: "Error Updating User profile",
            error: error.message
        })
    }
}


// Delete a user profile by username or email or id
exports.deleteUserProfile = async (req, res) => {
    try {
        const { zacrac } = req.params;
        if (!zacrac) {
            return res.status(400).json({ message: "Please enter username, email, or id" });
        }

        let user;
        if (mongoose.isValidObjectId(zacrac)) {
            user = await User.findById(zacrac);
        } else {
            user = await User.findOne({ $or: [{ username: zacrac }, { email: zacrac }] });
        }

        if (!user) {
            return res.status(404).json({ message: "User Profile not found" });
        }

        const deletedUser = await User.findByIdAndDelete(user._id);
        if (!deletedUser) {
            return res.status(500).json({ message: "Failed to delete user profile" });
        }

        return res.status(200).json({
            message: "User profile deleted successfully",
            deletedUser: deletedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting user profile",
            error: error.message
        });
    }
}
