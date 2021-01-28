export default class GameInfo{
    constructor(code) {
        this.code = code;
        this.round = 0; // 0,1,2 round of game
        this.turn = 0; // whose turn in 1 round, mainly used by pilot
        this.smallPilot = 0; //initialised at 0, update with player id
        this.largePilot = 0; //initialised at 0, update with player id
        this.pirate = [];
    }

    // call after each round
    reset() {
        this.turn = 0;
        this.smallPilot = 0;
        this.largePilot = 0;
        this.pirate = [];
    }

}