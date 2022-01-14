const inquirer=require('inquirer');
require('colors');

const menuOpts=[{
    type: 'list',
    name: 'opcion',
    message: 'Qué desea hacer?'.toUpperCase().bold.blue,
    choices: [
        {
            name: `${'1.'.green} Crear tarea`,
            value: '1'
        },
        {
            name: `${'2.'.green} Listar tarea`,
            value: '2'
        },
        {
            name: `${'3.'.green} Listar tareas completadas`,
            value: '3'
        },
        {
            name: `${'4.'.green} Listar tareas pendientes`,
            value: '4'
        },
        {
            name: `${'5.'.green} Completar tarea(s)`,
            value: '5'
        },
        {
            name: `${'6.'.green} Borrar tarea`,
            value: '6'
        },
        //new inquirer.Separator(),
        {
            name: `${'0.'.green} Salir`,
            value: '0'
        }//,
        //new inquirer.Separator()
    ]
}];

const inquirerMenu=async()=>{
    console.clear();
    console.log('====================='.green);
    console.log('Seleccione una opción'.green);
    console.log('=====================\n'.green);

    const opt=await inquirer.prompt(menuOpts);

    return opt;
};


const pausa = async ()=>{
    
    console.log('\n');
    await inquirer.prompt(
        [
            {
              type: 'input',
              name: 'opt2',
              message: `Presione ${'ENTER'.green} para continuar`,
            }
        ]
    );
};

const leerInput=async(message)=>{
    const q=[{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length===0)return 'Por favor ingrese un valor';
            return true;
        }
      }];
    
    const {desc}= await inquirer.prompt(q);
    return desc;
}

const listadoTareasBorrar = async ( tareas=[] ) =>{

    let choices=tareas.map((tarea, i) => {
        
        const idx=`${i+1}`.green;
        return {
            name: `${idx}. ${tarea.desc}`,
            value: `${tarea.id}`
        };    
    });

    choices.unshift({
        name: `Cancelar opcion...`.red,
        value: '0'
    });

    const preguntas=[{
        type: 'list',
        name: 'opcion',
        message: 'Qué elemento desea borrar?'.toUpperCase().bold.blue,
        choices}];

    console.log();
    const id = await inquirer.prompt(preguntas);
    return id;

}

const confirmacion = async (mensaje)=>{

    const q=[{
        type:'confirm',
        name:'ok',
        message: mensaje
    }];

    const id = await inquirer.prompt(q);
    
    return id;
    
};

const mostrarListadoCheck = async ( tareas=[] ) =>{

    let choices=tareas.map((tarea, i) => {
        
        const idx=`${i+1}`.green;
        return {
            name: `${idx}. ${tarea.desc}`,
            value: `${tarea.id}`,
            checked: (tarea.completadoEn)?true:false
        };    
    });

    const preguntas=[{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione'.toUpperCase().bold.blue,
        choices}];

    const {ids} = await inquirer.prompt(preguntas);
    return ids;

}

module.exports={
    confirmacion, 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    mostrarListadoCheck
};