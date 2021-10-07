const fs = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, '..', 'dataBase', 'users.json');

function compareNumbers(a, b) {
    return a - b;
}

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

    const userId = [];
    users.forEach(users=>{
        userId.push(users.id);
    });

    userId.sort(compareNumbers);
    const id =userId[userId.length - 1] + 1;

    users.push({...user,id});

    await fs.writeFile(dir,JSON.stringify(users));

    return users;
}

module.exports = {read,addUser,deleteUser};
