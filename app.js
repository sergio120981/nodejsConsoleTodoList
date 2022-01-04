const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const menuOpts= require('./config/consts');
const {guardarFile, leerDB}=require('./helpers/guardarFile');

require('colors');

console.clear();
const main= async ()=>{

    let opt='';

    let tareas=new Tareas();
    const tareasDB=leerDB();
    tareas.loadlistadoArray(tareasDB);
    do{
        opt=await inquirerMenu();
        
        switch (opt.opcion) {
            case menuOpts.CREATE:
                const desc = await leerInput('Descripcion de la tarea:');
                tareas.crearTarea(desc);
            break;
        
            case menuOpts.LIST:
                console.log(tareas.listadoArray);
            break;

            case menuOpts.COMPLETE:
                console.log(`completar tarea ${ 123 }`);
            break;
        };
        
        guardarFile(tareas.listadoArray);

        await pausa();
    }while(opt.opcion!==menuOpts.EXIT);

};

main(); 