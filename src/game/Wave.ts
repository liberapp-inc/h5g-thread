// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static readonly speedMin = 1/(60*10);
    static readonly speedMax = 1/(60*2.0);
    speed:number = Wave.speedMin;
    count:number = 0;
    frame:number = 0;

    constructor() {
        super();
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

    }
}

