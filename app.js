const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const menuOpts= require('./config/consts');
const {guardarFile, leerDB}=require('./helpers/guardarFile');

require('colors');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');

//console.clear();
const main= async ()=>{

    let opt='';

    const tareas=new Tareas();

    const tareasDB=leerDB();


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
        
        //guardarFile(tareas.listadoArray);

        await pausa();
    }while(opt.opcion!==menuOpts.EXIT);

};

main(); 