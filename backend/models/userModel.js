const mongoose = requeire("mongoose")

const userShema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Por favor adcione um nome"]
    },
    email: {
        type: String,
        require: [true, "Por favor adcione um email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            "Por favor adcione um email valido"
        ]
    },
    password: {
        type: String,
        require: [true, "Por favor adcione uma senha"],
        minLength: [6, "A senha dever conter no minimo 6 caracteres"],
        maxLength: [23, "A senha não dever conter mais que 23 caracteres"]
    },
    photo: {
        type: String,
        require: [true, "Por favor adcione uma foto"],
        default: "https://res.cloudinary.com/dpyrlntco/image/upload/v1682021547/avatar_ilj8xe.png"
    },
    phone: {
        type: String,
        default: "+55"
    },
    bio: {
        type: String,
        default: "Bio",
        maxLength: [250, "A bio não dever conter mais que 250 caracteres"]
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userShema)
module.exports = User