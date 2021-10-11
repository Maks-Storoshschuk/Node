module.exports = {
    USER: 'user',
    ADMIN: 'admin',
    MANAGER: 'manager',
    passwordRegExp: new RegExp(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"/),
    emailRegExp: new RegExp(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
};
