const fs =require('fs');
const path = require('path');

const users=[
    {name:"Julia",gender:"female",age:30},
    {name:"Vasiliy",gender:"male",age:24},
    {name:"Zenoviy",gender:"male",age:28},
    {name:"Igor",gender:"male",age:26},
    {name:"Victoria",gender:"female",age:26},
    {name:"Maks",gender:"male",age:25},
    {name:"Iryna",gender:"female",age:27},
    {name:"Mariya",gender:"female",age:22},
    {name:"Bogdan",gender:"male",age:22},
    {name:"Liliia",gender:"female",age:25}
];

fs.mkdir(path.join(__dirname,'manOlder25'),err => {
    if (err) {
        console.log(err);
        return;
    }
    fs.mkdir(path.join(__dirname, 'manYounger25'), err => {
        if (err) {
            console.log(err);
            return;
        }
        fs.mkdir(path.join(__dirname, 'womanOlder25'), err => {
            if (err) {
                console.log(err);
                return;
            }
            fs.mkdir(path.join(__dirname, 'womanYounger25'), err=> {
                if (err) {
                    console.log(err);
                    return err;
                }
            });
        });
    });
});

function creator(users){
    users.forEach(user=>{
        if (user.age < 25 && user.gender === 'male'){
            fs.writeFile(path.join(__dirname,'manYounger25',`${user.name}.txt`),
                `${JSON.stringify(user)}`,err => {
                    console.log(err);
                    return err;
                })}

        if (user.age < 25 && user.gender === 'female'){
            fs.writeFile(path.join(__dirname,'womanYounger25',`${user.name}.txt`),
                `${JSON.stringify(user)}`,err => {
                    console.log(err);
                    return err;
                })}

        if (user.age >= 25 && user.gender === 'male'){
            fs.writeFile(path.join(__dirname,'manOlder25',`${user.name}.txt`),
                `${JSON.stringify(user)}`,err => {
                    console.log(err);
                    return err;
                })}

        if (user.age >= 25 && user.gender === 'female'){
            fs.writeFile(path.join(__dirname,'womanOlder25',`${user.name}.txt`),
                `${JSON.stringify(user)}`,err => {
                    console.log(err);
                    return err;
                })}
    });
}

creator(users)