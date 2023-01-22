export default class ReminderController{
    id:number;
    isComplete:boolean;
    constructor(public tittle:string){
        this.id = Date.now();
        this.isComplete = false;
    }
}