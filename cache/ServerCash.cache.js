// content : array 

export class Cache {




    constructor(){
        this.cashe = new Map()
    }

    in(id) {return this.cashe.has(id)}
    put(id,content){this.cashe.set(id,content)}
    get(id){return this.cashe.get(id)}
    del(id){this.cashe.delete(id)}
    aff(){
        console.log(this.cashe)
    }


}