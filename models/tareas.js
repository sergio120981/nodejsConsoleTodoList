const { green } = require('colors');
const Tarea=require('./tarea');
require('colors');

class Tareas {
    _listado={};

    constructor(){
        this._listado={};
    };

    borrarTarea(id=''){
        if(this._listado[id])
            delete this._listado[id];
    }

    crearTarea(desc='', id=null, completadoEn=null){
        const tarea=new Tarea(desc, id, completadoEn);
        this._listado[tarea.id]=tarea;
    }

    getTareas(){
        return this._listado;
    }

    setTareaCompletada(id){
        const tarea=this._listado[id];
        tarea.completadoEn=Date.now();
        this._listado[tarea.id]=tarea;
    }

    get listadoArray(){
        const listado=[];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    loadlistadoArray(jsonBD=[]){
        
        jsonBD.forEach((tarea)=>{this._listado[ tarea.id ]= tarea;});

    }

    listadoCompleto(){
        Object.values(this._listado).forEach((tarea, idx) =>{
            let id=green(idx+1);
            let comp=tarea.completadoEn?green(tarea.completadoEn):'Pendiente'.red;
            console.log(`${id}. ${tarea.desc} :: ${comp}`);
            
        });
    }

    getTareasPendientesOrCompletadas(completado=true){
        let idx=1;
        console.log();
        Object.values(this._listado).filter(tarea =>{

            if(!!tarea.completadoEn===completado){
                
                let id=green(idx++);
                let comp=tarea.completadoEn?green(tarea.completadoEn):'Pendiente'.red;
                console.log(`${id}. ${tarea.desc} :: ${comp}`);

            }
            
        });
    }

    
    toggleCompletadas(ids=[]){
        ids.forEach((id)=>{
            const tarea=this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn=new Date().toISOString();
            }
        });

        this.listadoArray.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        });
    }

};

module.exports=Tareas;