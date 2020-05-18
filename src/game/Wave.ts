// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;

    static levelSeeds:number[] = [ 0,
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
        11,12,13,14,15,
        16,17,18,19,20,
        21,22,23,24,25,
        26,27,28,29,30,
         ];

    waveX:number;
    count:number = 0;
    goalCount:number = 0;
    modeCount:number = 4;
    topSpeed:number = 1.4;
    endInterval:number = 2;

    rand:Random;
    state:()=>void = null;

    constructor(level:number) {
        super();
        Wave.hardRate = 0;
        Cave.prevPy0 = Util.h(0.5) - Util.w(GAME_AREA_H_PER_W*0.3);
        Cave.prevPy1 = Util.h(0.5) + Util.w(GAME_AREA_H_PER_W*0.3);
        this.waveX = Util.w(1);
        Player.speedCo = 1;

        if( level == 0 ){
            this.rand = new Random();
            this.setStatePillar();
        }
        else{
            this.rand = new Random( Wave.levelSeeds[level] );
            this.count = level;
            this.goalCount = this.count + 20 + level/4;
        }
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        if( Player.I.x + Util.w(2/3) >= this.waveX ){

            if( this.modeCount <= 0 ){
                if( this.rand.bool( 1/2 ) && Player.speedCo <= 1 ){
                    Player.speedCo = this.topSpeed;
                    this.topSpeed = Util.clamp( this.topSpeed + 0.1, 0, 2.5 );
                    Wave.hardRate = Util.clamp( Wave.hardRate - 0.25, 0, 1 );
                }else{
                    Player.speedCo = 1.0;
                    Wave.hardRate = Util.clamp( this.count/20, 0, 1 );
                }

                switch( this.rand.i( 0, 3+1 ) ){
                    case 0: this.setStatePillar();  break;
                    case 1: this.setStateCave();    break;
                    case 2: this.setStateBall();    break;
                    case 3: this.setStateBox();     break;
                }
            }

            this.count++;
            this.modeCount--;
            if( this.goalCount == 0 ){
                this.state();
            }
            else{
                this.goalCount--;
                if( this.goalCount >= 3 ){
                    this.state();
                }
                else if( this.goalCount <= 0 ){
                    // level clear
                    PhysicsObject.deltaScale = 0.1;
                    egret.Tween.removeAllTweens();
                    Player.I.setStateNone();
                }
            }

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
            this.modeCount = this.rand.i( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    statePillar(){
        this.newPillar();
    }
    newPillar( gap:number = 0.3 ){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( this.rand.f(-gap, +gap) * Util.lerp(0.5, 1, Wave.hardRate) );
        let type = PType.Normal;                        // 動かないノーマルピラー
        if( this.rand.bool( 0.8 * Wave.hardRate ) ){    // 最大80%の確率で別タイプ生成
            type = this.rand.i(PType.Normal, PType.Total);
        }
        Pillar.newPillar( px, py, type, Wave.hardRate );
        const w = Util.w(PILLAR_INTER_PER_W);
        this.waveX += w;
        if( this.rand.bool(0.25) )
            new Coin( px+w*0.5, py );
    }


    setStateCave(){
        this.state = this.stateCave;
        this.endInterval = 2;
        if( Player.speedCo <= 1 ){
            this.modeCount = this.rand.i( 2, 8 );
        }else{
            this.modeCount = 2;
        }
    }
    stateCave(){
        this.newCave();
    }
    newCave( gap:number = 0.45 ){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( this.rand.f(-gap, +gap) * Util.lerp(0.5, 1, Wave.hardRate) );
        Cave.newCave( px, py, Wave.hardRate, this.rand.f(0.8, 1.2) );
        const w = Util.w(PILLAR_INTER_PER_W);
        this.waveX += w * 2;
        if( this.rand.bool(0.25) )
            new Coin( px+w*1.5, py );
    }


    setStateBall(){
        this.state = this.stateBall;
        this.endInterval = 3;
        if( Player.speedCo <= 1 ){
            this.modeCount = this.rand.i( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    stateBall(){
        this.newBall();
    }
    newBall(){
        let px = this.waveX;
        if( this.rand.bool() )
            Ball.newBall( px, Wave.hardRate, 1, this.rand, 2 );
        else
            Ball.newBall( px, Wave.hardRate, 0, this.rand, 4 );
        
        this.waveX += Util.w(PILLAR_INTER_PER_W);
        
        if( this.rand.bool(0.25) ){
            let y = Util.h(0.5) + Util.w( GAME_AREA_H_PER_W * this.rand.f(-0.4, +0.4) );
            new Coin( px, y );
        }
    }


    setStateBox(){
        this.state = this.stateBox;
        this.endInterval = 3;
        if( Player.speedCo <= 1 ){
            this.modeCount = this.rand.i( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    stateBox(){
        this.newBox();
    }
    newBox(){
        let px = this.waveX;
        if( this.rand.bool() )
            Box.newBox( px, Wave.hardRate, 1, this.rand, 2 );
        else
            Box.newBox( px, Wave.hardRate, 0, this.rand, 5 );
        
        this.waveX += Util.w(PILLAR_INTER_PER_W);
        
        if( this.rand.bool(0.25) ){
            let y = Util.h(0.5) + Util.w( GAME_AREA_H_PER_W * this.rand.f(-0.4, +0.4) );
            new Coin( px, y );
        }
    }
}


