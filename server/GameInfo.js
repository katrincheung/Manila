export default class GameInfo{
    constructor(code) {
        this.code = code;
        this.round = 0; // 0,1,2 round of game
        this.turn = 0; // whose turn in 1 round, mainly used by pilot
        this.smallPilot = false;
        this.largePilot = false;
    }
}