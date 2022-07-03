const {updateUserValidation, newUserValidation} = require("../middleware/validation");
const db = require("../database/db");
const fs = require('fs')
exports.GetAllUsers = async () => {
    return new Promise((resolve, reject) => {
        db.query(
                `SELECT *,if(gender = 1 ,"male","female") as gender FROM users `,
            (err, result) => {
                if (err) reject({message: err, statusCode: 500});

                if (result.length === 0)
                    reject({message: "No user were found", statusCode: 400});

                resolve({
                    statusCode: 200,
                    message: `${result.length} users were found`,
                    data: result,
                });
            }
        );
    });
};

exports.getUser = async (params) => {
    const {userId} = params;
    if (!userId) throw {message: "userId was not provided", statusCode: 400};

    return new Promise((resolve, reject) => {
        db.query(
                `SELECT *,if(gender = 1 ,"male","female") as gender FROM users  WHERE user_id = ?`,
            [userId],
            (err, result) => {
                if (err) reject({message: err, statusCode: 500});
                if (result.length === 0)
                    reject({message: "user was not found", statusCode: 400});
                resolve({
                    statusCode: 200,
                    message: `user was found`,
                    data: result,
                });
            }
        );
    });
};

exports.deleteUser = async (params) => {
    const {userId} = params;
    if (!userId) throw {message: "userId was not provided", statusCode: 400};

    return new Promise((resolve, reject) => {
        db.query(
                `DELETE FROM users  WHERE user_id = ?`,
            [userId],
            (err, result) => {
                if (err) reject({message: err, statusCode: 500});
                if (result.length === 0)
                    reject({message: "user_id + ${userId} not match ", statusCode: 400});
                resolve({
                    statusCode: 200,
                    message: `user was deleted successfully`,
                    data: result,
                });
            }
        );
    });
};

exports.newUser = async (params) => {

    const {error} = newUserValidation(params);
    if (error) throw {message: error.details[0].message, statusCode: 400};
    const {personal_image, full_name, address, gender, mobile, email, jop, salary} = params;

    return new Promise((resolve, reject) => {
        db.query(
                `SELECT email FROM users WHERE email = ?`,
            [email],
            (err, result) => {
                if (result.length > 0) {
                    reject({
                        message: "Email address is in use, please try a different one",
                        statusCode: 400,
                    });
                } else if (result.length === 0) {
                    db.query(
                            `INSERT INTO users (user_id, personal_image, full_name, address, gender, mobile, email, jop, salary) VALUES (uuid(),?,?,?,?,?,?,?,?)`,
                        [personal_image, full_name, address, gender, mobile, email, jop, salary],
                        (err, result) => {
                            if (err) {
                                reject({
                                    message: "Something went wrong, please try again",
                                    statusCode: 400,
                                    data: err,
                                });
                            } else {
                                resolve({
                                    data: result,
                                    message: "You have successfully registered new user.",
                                    statusCode: 200,
                                });
                            }
                        }
                    );
                }
            }
        );
    });
};

exports.updateUser = async (params) => {
    const {error} = updateUserValidation(params);
    if (error) throw {message: error.details[0].message, statusCode: 400};
    console.log(params + " this is params")
    const {userId, personal_image, full_name, address, gender, mobile, email, jop, salary} = params;

    return new Promise((resolve, reject) => {
        db.query(
                `SELECT * FROM users WHERE user_id = ? AND email = ?`,
            [userId, email],
            (err, result) => {
                if (err) reject({message: err, statusCode: 500});

                if (result.length === 0) {
                    reject({
                        message: "no user found.",
                        statusCode: 400,
                    });
                } else {
                    if (email === result[0].email && full_name === result[0].full_name && personal_image === result[0].personal_image && address === result[0].address && gender === result[0].gender && mobile === result[0].mobile && jop === result[0].jop && salary === result[0].salary) {
                        reject({
                            message: "No new data has been provided",
                            statusCode: 400,
                        });
                    }
                    // user_id, , , , , , email, ,
                    let query = "";
                    if (email !== result[0].email && full_name !== result[0].full_name && personal_image !== result[0].personal_image && address !== result[0].address && gender !== result[0].gender && mobile !== result[0].mobile && jop !== result[0].jop && salary !== result[0].salary) {
                        query = `full_name = '${full_name}', email = '${email}' , email = '${email}' , personal_image = '${personal_image}' , address = '${address}' , gender = '${gender}' , mobile = '${mobile}' , jop = '${jop}' , salary = '${salary}' `;
                    } else if (full_name !== result[0].full_name) {
                        query = `full_name = '${full_name}'`;
                    } else if (personal_image !== result[0].personal_image) {
                        const oldImage = `uploads/${result[0].personal_image}` ;
                            fs.unlink(oldImage, (err) =>{
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log("File removed:", oldImage);
                                }
                            });
                        query = `personal_image = '${personal_image}'`;
                    } else if (address !== result[0].address) {
                        query = `address = '${address}'`;
                    } else if (gender !== result[0].gender) {
                        query = `gender = '${gender}'`;
                    } else if (mobile !== result[0].mobile) {
                        query = `mobile = '${mobile}'`;
                    } else if (email !== result[0].email) {
                        query = `email = '${email}'`;
                    } else if (jop !== result[0].jop) {
                        query = `jop = '${jop}'`;
                    } else {
                        query = `salary = '${salary}'`;
                    }
                    db.query(
                        `UPDATE users SET ${query} WHERE user_id = ?`,
                        [userId],
                        (err, result) => {
                            if (err) throw {message: err, statusCode: 500};
                            resolve({
                                message: "User details have been successfully updated",
                                data: result,
                            });
                        }
                    );
                }
            }
        );
    });
};

