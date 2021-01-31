
export default class Game{
    constructor(code) {
        this.code = code;
    }

    remainShares = {'brown':2, 'blue':2, 'yellow':2, 'green':2};
    sharePrices = {'brown':0, 'blue':0, 'yellow':0, 'green':0};
    round = 0; // 0,1,2 round of game
    turn = 0; // whose turn in 1 round, mainly used by pilot
    smallPilot = 0; //initialised at 0, update with player id
    largePilot = 0; //initialised at 0, update with player id
    pirate = [];
    players = {};

    updateRemainShares() {
        this.send(`UPDATE_REMAIN_SHARES ${this.remainShares.brown} ${this.remainShares.blue} ${this.remainShares.yellow} ${this.remainShares.green}`)
    }

    decreaseRemainShares(color) {
        if(this.remainShares[color] > 0) {
            this.remainShares[color] -= 1;
            this.updateRemainShares();
        }
    }

    updateSharePrice(color) {
        switch (this.sharePrices[color]) {
            case 5:
                this.sharePrices[color] = 10;
                break;
            case 10:
                this.sharePrices[color] = 20;
                break;
            case 20:
                this.sharePrices[color] = 30;
                break;
            default:
                this.sharePrices[color] = 5;
                break;
        }
        this.send(`UPDATE_SHARE_PRICE ${color} ${this.sharePrices[color]}`)
    }

    send(msg) {
        for (let id in this.players)
            this.players[id].ws.send(msg)
    }

    //call after auction
    resetPass() {
        for(let player of this.players){
            player.pass = false;
        }
    }

    // call after each round
    resetForNextRound() {
        this.turn = 0;
        this.smallPilot = 0;
        this.largePilot = 0;
        this.pirate = [];
    }

}