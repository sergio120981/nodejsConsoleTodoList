const fs = require('fs');


const guardarFile = (data)=>{
    const file='./db/data.json';
    fs.writeFileSync(file, JSON.stringify(data));
}

module.exports= guardarFile ;