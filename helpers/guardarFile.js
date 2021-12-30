const fs = require('fs');

const ARCHIVOBD='./db/data.json';

const guardarFile = (data)=>{
    fs.writeFileSync(ARCHIVOBD, JSON.stringify(data));
}

const leerDB=()=>{
    if(!fs.existsSync(ARCHIVOBD)){
        return null;
    }
    const info=fs.readFileSync(ARCHIVOBD, {encoding:'utf-8'});

    console.log(info);
}

module.exports= {guardarFile, leerDB} ;