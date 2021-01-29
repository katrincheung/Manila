export default class Player {
    constructor(name, ws) {
        this.name = name;
        this.ws = ws;
    }
    next = null; //point to next player
    pass = false; //used in auction to see if passed
    master = false; //set true when win the auction
    money = 30;
    shares = [0,0,0,0];


}