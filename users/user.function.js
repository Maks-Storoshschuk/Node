const fs = require('fs/promises');

const path = require('path');

const dir = path.join(__dirname, '..', 'dataBase', 'users.json');

async function read() {
    const buffer = await fs.readFile(dir, "utf-8");
    return JSON.parse(buffer);
}
async function deleteUser(id) {
    const oldUsersArray = await read();
    const newUsersArray = oldUsersArray.filter(oldUsersArray => oldUsersArray.id !== +id);
    await fs.writeFile(dir, JSON.stringify(newUsersArray));
    return newUsersArray;
}

async function addUser(user) {
    const users = await read();
    const id = users[users.length - 1].id + 1;
    users.push({...user, id: id});
    await fs.writeFile(dir,JSON.stringify(users));
    return users;
}

module.exports = {read,addUser,deleteUser};