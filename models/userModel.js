const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the User name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        require: [true, "Please add the User password"],
    }
},
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("User", UserSchema);