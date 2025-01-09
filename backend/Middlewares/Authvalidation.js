
const Joi = require('joi');

const signupValiation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message:"bad request", error});
    }
    next();
}

const loginValiation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message:"bad request", error});
    }
    next();
}

module.exports = {signupValiation, loginValiation };
