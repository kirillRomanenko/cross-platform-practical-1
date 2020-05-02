const Redis = require("ioredis");
const fs = require("fs");

const redis = new Redis({
    port: 26159,
    host: "ec2-52-210-252-3.eu-west-1.compute.amazonaws.com",
    family: 4,
    password: "p63450378da29a838cc108262bdc671416ba6a09cfdcc2364c57e883f80d86e9c",
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