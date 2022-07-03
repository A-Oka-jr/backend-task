const Joi = require("joi");

var options = {
    errors: {
        wrap: {
            label: "",
        },
    },
};
const newUserValidation = (data) => {
    const schema = Joi.object({
        personal_image: Joi.string().required().strict(),
        email: Joi.string().email().required().strict(),
        full_name: Joi.string().required().strict(),
        address: Joi.string().required().strict(),
        gender: Joi.string().required().strict(),
        mobile: Joi.string().required().strict(),
        jop: Joi.string().required().strict(),
        salary: Joi.string().required().strict(),
    });

    return schema.validate(data, options);
};


const updateUserValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required().strict(),
        personal_image: Joi.string().required().strict(),
        email: Joi.string().email().required().strict(),
        full_name: Joi.string().required().strict(),
        address: Joi.string().required().strict(),
        gender: Joi.string().required().strict(),
        mobile: Joi.string().required().strict(),
        jop: Joi.string().required().strict(),
        salary: Joi.string().required().strict(),
    });

    return schema.validate(data, options);
};

module.exports = {
    newUserValidation,
    updateUserValidation,
};
