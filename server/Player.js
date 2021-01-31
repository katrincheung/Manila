export default class Player {
    constructor(name, ws) {
        this.name = name;
        this.ws = ws;
    }
    next = null; //point to next player
    pass = false; //used in auction to see if passed
    master = false; //set true when win the auction
    money = 30;
    shares = {'brown':0, 'blue':0, 'yellow':0, 'green':0};

    pay(amount, game) {
        this.money -= amount;
        game.send(`UPDATE_MONEY ${this.name} ${this.money}`)
    }

    gain(amount, game) {
        this.money += amount;
        game.send(`UPDATE_MONEY ${this.name} ${this.money}`)
    }

    getShareNum() {
        return this.shares.brown + this.shares.blue + this.shares.yellow + this.shares.green;
    }


}