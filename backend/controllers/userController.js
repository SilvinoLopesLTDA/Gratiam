const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

// Register User
const registerUser = asyncHandler( async(req, res) => {
    const {name, email, password} = req.body

    // Validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Preencha os campos corretamente")
    }
    if(password.length < 6) {
        res.status(400)
        throw new Error("A senha deve conter mais de 6 caracteres")
    }

    // Check if user email already exist
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("O email ja esta cadastrado")
    }

    // Create new user
    const user = await User.create({
        name,
        email, 
        password,
    })

    // Generate Token
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date (Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true
    })

    if(user) {
        const {_id, name, email, photo, phone, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token
        })
    } else {
        res.status(400)
        throw new Error("Dados de usuario invalidos")
    }
})

// Login User
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    // Validate Request
    if(!email || !password) {
        res.status(400)
        throw new Error("Por favor adcione o email e a senha")
    }

    // Check if user exists
    const user = await User.findOne({email})

    if(!user) {
        res.status(400)
        throw new Error("Usuario não encontrado, por favor cadastra-se ")
    }

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    // Generate Token
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    if(passwordIsCorrect) {
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date (Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true
        })
    }

    if(user && passwordIsCorrect) {
        const {_id, name, email, photo, phone, bio } = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        })
    } else {
        res.status(400)
        throw new Error("Email ou Senha invalido")
    }
})

module.exports = {
    registerUser,
    loginUser,
}