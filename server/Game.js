export default class Game{
    constructor(code) {
        this.code = code;
        this.round = 0; // 0,1,2 round of game
        this.turn = 0; // whose turn in 1 round, mainly used by pilot
        this.smallPilot = 0; //initialised at 0, update with player id
        this.largePilot = 0; //initialised at 0, update with player id
        this.pirate = [];
    }

    remain_shares = [];
    players = {};
    resetPass(){
        for(const [uid, player] of Object.entries(this.players)){
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