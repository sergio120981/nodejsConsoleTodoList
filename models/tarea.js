const {v4:uuidv4}=require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn=null;
    constructor(desc, id, completadoEn){
        this.desc=desc; 
        this.id=(!id)?uuidv4():id;
        this.completadoEn=(!completadoEn)?null:completadoEn;
    }
}


module.exports=Tarea;