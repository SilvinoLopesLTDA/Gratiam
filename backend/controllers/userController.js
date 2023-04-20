

const registerUser = (req, res) => {
    if (!req.body.email) {
        res.status(400)
        throw new Error("Por favor adcione um email")
    }
    res.send("Register User")
}

module.exports = {
    registerUser,
}