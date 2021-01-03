export default class Player {
    constructor(name, ws) {
        this.name = name;
        this.ws = ws;
        this.next = null;
        this.pass = false;
        this.master = false;
    }

}