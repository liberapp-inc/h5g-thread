// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;

    waveX:number;
    count:number = 0;
    modeCount:number = 4;
    topSpeed:number = 1.4;
    endInterval:number = 2;

    state:()=>void = null;

    constructor() {
        super();
        Wave.hardRate = 0;
        Cave.prevPy0 = Util.h(0.5) - Util.w(GAME_AREA_H_PER_W*0.3);
        Cave.prevPy1 = Util.h(0.5) + Util.w(GAME_AREA_H_PER_W*0.3);
        this.waveX = Util.w(1);

        Player.speedCo = 1;
        this.setStatePillar();
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        if( Player.I.x + Util.w(2/3) >= this.waveX ){

            if( this.modeCount <= 0 ){
                if( randBool(1/2) && Player.speedCo <= 1 ){
                    Player.speedCo = this.topSpeed;
                    this.topSpeed = Util.clamp( this.topSpeed + 0.1, 0, 2.5 );
                    Wave.hardRate = Util.clamp( Wave.hardRate - 0.25, 0, 1 );
                }else{
                    Player.speedCo = 1.0;
                    Wave.hardRate = Util.clamp( this.count/200, 0, 1 );
                }

                switch( randI( 0, 3+1 ) ){
                    case 0: this.setStatePillar();  break;
                    case 1: this.setStateCave();    break;
                    case 2: this.setStateBall();    break;
                    case 3: this.setStateBox();     break;
                }
            }

            this.count++;
            this.modeCount--;
            this.state();
            
            if( this.modeCount <= 0 ){
                this.waveX += Util.w(PILLAR_INTER_PER_W) * this.endInterval;   // 終わりには間隔が必要
            }
        }
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStatePillar(){
        this.state = this.statePillar;
        this.endInterval = 2;
        if( Player.speedCo <= 1 ){
            this.modeCount = randI( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    statePillar(){
        this.newPillar();
    }
    newPillar( gap:number = 0.3 ){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-gap, +gap) * Util.lerp(0.5, 1, Wave.hardRate) );
        let type = PType.Normal;            // 動かないノーマルピラー
        if( randBool( 0.8 * Wave.hardRate ) ){   // 最大80%の確率で別タイプ生成
            type = randI(PType.Normal, PType.Total);
        }
        Pillar.newPillar( px, py, type, Wave.hardRate );
        this.waveX += Util.w(PILLAR_INTER_PER_W);

        new Coin( px, py );
    }


    setStateCave(){
        this.state = this.stateCave;
        this.endInterval = 2;
        if( Player.speedCo <= 1 ){
            this.modeCount = randI( 2, 8 );
        }else{
            this.modeCount = 2;
        }
    }
    stateCave(){
        this.newCave();
    }
    newCave( gap:number = 0.45 ){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-gap, +gap) * Util.lerp(0.5, 1, Wave.hardRate) );
        Cave.newCave( px, py, Wave.hardRate );
        this.waveX += Util.w(CAVE_WIDTH_PER_W * 2);
    }


    setStateBall(){
        this.state = this.stateBall;
        this.endInterval = 3;
        if( Player.speedCo <= 1 ){
            this.modeCount = randI( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    stateBall(){
        this.newBall();
    }
    newBall(){
        let px = this.waveX;
        if( randBool() )
            Ball.newBall( px, Wave.hardRate, 1, 3 );
        else
            Ball.newBall( px, Wave.hardRate, 0, 4 );
        
        this.waveX += Util.w(PILLAR_INTER_PER_W);
    }


    setStateBox(){
        this.state = this.stateBox;
        this.endInterval = 3;
        if( Player.speedCo <= 1 ){
            this.modeCount = randI( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    stateBox(){
        this.newBox();
    }
    newBox(){
        let px = this.waveX;
        if( randBool() )
            Box.newBox( px, Wave.hardRate, 1, 3 );
        else
            Box.newBox( px, Wave.hardRate, 0, 6 );
        
        this.waveX += Util.w(PILLAR_INTER_PER_W);
    }
}


