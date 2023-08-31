async function loginFormat(user, accessToken) {
    return {
        token: accessToken,
        userId: user._id,
        userType: user.userType,
        name: user.name,
        email: user.email,
    };
}



module.exports = {
    loginFormat
};
