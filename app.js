const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmacion } = require('./helpers/inquirer');
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
                tareas.listadoCompleto();
                //console.log(tareas.listadoArray);
            break;

            case menuOpts.LISTCOMPLETED:
                tareas.getTareasPendientesOrCompletadas(true);
            break;

            case menuOpts.LISTPENDING:
                tareas.getTareasPendientesOrCompletadas(false);
            break;

            case menuOpts.DELETE:

                const id= await listadoTareasBorrar(tareas.listadoArray);
                
                if(id.opcion!=='0'){
                    const {ok} = await confirmacion(`Desea borrar el item ${id.opcion}?`);
                    if(ok){
                        tareas.borrarTarea(id.opcion);
                    }
                }

            break;
        };
        
        guardarFile(tareas.listadoArray);

        await pausa();
    }while(opt.opcion!==menuOpts.EXIT);

};

main(); 