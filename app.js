
const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname,'Boys'),err => {
//     console.log(err);}
// )

//Створюю змінні для запису і читання даних
// const name_path = "Maks"
// const age= 26
// const gender ="female"

// Функція для створення файлів
// fs.writeFile(path.join(__dirname,'Boys',`${name_path}.json`),`{"name":"${name_path}","age":${age},"gender":"${gender}"}`,(error)=>{
//     if (error){
//         console.log(error)
//     }
//     console.log("success")
// })

// Функція для читання файлів
// fs.readFile(path.join(__dirname,'Boys',`${name_path}.json`),((err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data.toString())
// }))

//Функція сортування по папках
function refactor(sex, from, to) {
    fs.readdir(path.join(__dirname,`${from}`), (err, data) => {
        if (err) {
            console.log(err);
        }

        data.forEach(data =>
            fs.readFile(path.join(__dirname,`${from}`,`${data}`), ((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const gender = JSON.parse(data.toString());

                if (gender.gender === sex) {
                    fs.rename(path.join(__dirname, `${from}`,`${gender.name}.json`), path.join(__dirname, `${to}`,`${gender.name}.json`), err1 => {
                            if (err1) {
                                console.log(err);
                            }
                        }
                    );
                }
            }))
        );
    });
}

refactor('male', 'Girls', 'Boys');

refactor('female', 'Boys', 'Girls');