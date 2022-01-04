const Tarea=require('./tarea');
require('colors');

class Tareas {
    _listado={};

    constructor(){
        this._listado={};
    };

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

    loadlistadoArray(jsonBD){
        const listado=JSON.parse(jsonBD);
        if(listado.length===0)return null;

        listado.forEach((tarea)=>{
            this._listado[ tarea.id ]= tarea;
            //this.crearTarea(tarea.desc, tarea.id, tarea.completadoEn);
        });
    }
};

module.exports=Tareas;