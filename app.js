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
    console.log(err);}
);

fs.mkdir(path.join(__dirname,'manYounger25'),err => {
    console.log(err);}
);

fs.mkdir(path.join(__dirname,'womanOlder25'),err => {
    console.log(err);}
);

fs.mkdir(path.join(__dirname,'womanYounger25'),err => {
    console.log(err);}
);

function creator(value){
    value.forEach(value=>{
        if (value.age < 25 && value.gender === 'male'){
            fs.writeFile(path.join(__dirname,'manYounger25',`${value.name}.txt`),
                `${JSON.stringify(value)}`,err => {
                    console.log(err);
                })}

        if (value.age < 25 && value.gender === 'female'){
            fs.writeFile(path.join(__dirname,'womanYounger25',`${value.name}.txt`),
                `${JSON.stringify(value)}`,err => {
                    console.log(err);
                })}

        if (value.age >= 25 && value.gender === 'male'){
            fs.writeFile(path.join(__dirname,'manOlder25',`${value.name}.txt`),
                `${JSON.stringify(value)}`,err => {
                    console.log(err);
                })}

        if (value.age >= 25 && value.gender === 'female'){
            fs.writeFile(path.join(__dirname,'womanOlder25',`${value.name}.txt`),
                `${JSON.stringify(value)}`,err => {
                    console.log(err);
                })}
    });
}

creator(users)