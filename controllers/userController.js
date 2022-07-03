const {GetAllUsers, newUser, getUser, updateUser, deleteUser} = require("../services/userService");

exports.get_All = async (req, res, next) => {
    GetAllUsers()
        .then((result) => {
            const {message, data} = result;
            res.status(200).send({message, data});
        })
        .catch((err) => {
            const {statusCode = 400, message} = err;
            res.status(statusCode).send({message}) && next(err);
        });
};

exports.get_user = async (req, res, next) => {
    const {userId} = req.params;
    getUser({userId})
        .then((result) => {
            const {message, data} = result;
            res.status(200).send({message, data});
        })
        .catch((err) => {
            const {statusCode = 400, message} = err;
            res.status(statusCode).send({message}) && next(err);
        });
};

exports.delete_user = async (req, res, next) => {
    const {userId} = req.params;
    deleteUser({userId})
        .then((result) => {
            const {message, data} = result;
            res.status(200).send({message, data});
        })
        .catch((err) => {
            const {statusCode = 400, message} = err;
            res.status(statusCode).send({message}) && next(err);
        });
};

exports.new_user = async (req, res, next) => {
    console.log(req.file)
    const personal_image = req.file.path
    const { full_name, address, gender, mobile, email, jop, salary} = req.body;

    newUser({personal_image, full_name, address, gender, mobile, email, jop, salary})
        .then((result) => {
            const {statusCode = 200, message, data} = result;
            res.status(statusCode).send({message, data});
        })
        .catch((err) => {
            const {statusCode = 400, message, data} = err;
            res.status(statusCode).send({message, data}) && next(err);
        });
};

exports.update_user = async (req, res, next) => {
    const { userId } = req.params;
    const {full_name, address, gender, mobile, email, jop, salary} = req.body;
    const personal_image = req.file.path

    updateUser({userId, personal_image, full_name, address, gender, mobile, email, jop, salary})
        .then((result) => {
            const {statusCode = 200, message, data} = result;
            res.status(statusCode).send({message, data});
        })
        .catch((err) => {
            const {statusCode = 400, message, data} = err;
            res.status(statusCode).send({message, data}) && next(err);
        });
};

