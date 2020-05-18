const Redis = require("ioredis");
const fs = require("fs");

const redis = new Redis({
    port: 11319,
    host: "ec2-52-19-54-53.eu-west-1.compute.amazonaws.com",
    family: 4,
    password: "paf5e24b7d7f9fa32fb7a14db41369aeac16361ff4a6762c8f9289e6cdd7810ce",
});


function setTodo(todo) {
    redis.pipeline()
        .set("todo", todo)
        .exec(function (err, result) {
            if (err) {
                console.log('error');
            } else if (result) {
            }
        });
}

function getTodo(path) {

    console.log(path);
    redis.get("todo").then(function (result) {
        console.log(result);
        result = JSON.parse(result);
        fs.writeFileSync(path + '/backup.txt', result);
    });
}


module.exports = { setTodo, getTodo };