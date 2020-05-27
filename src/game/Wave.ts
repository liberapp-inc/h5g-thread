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

    level:number;
    waveX:number;
    count:number = 0;
    goalCount:number = 0;
    modeCount:number = 0;
    endInterval:number = 2;

    rand:Random;
    state:()=>void = this.stateNone;

    // level = レベル番号 0＝エンドレス
    constructor(level:number) {
        super();
        Wave.hardRate = 0;
        Cave.prevPy0 = Util.h(0.5) - Util.w(GAME_AREA_H_PER_W*0.3);
        Cave.prevPy1 = Util.h(0.5) + Util.w(GAME_AREA_H_PER_W*0.3);
        this.level = level;
        this.waveX = Util.w(1);
        Player.speedCo = 1;

        if( level == 0 ){
            this.rand = new Random();
            this.setStatePillar();
        }
        else{
            this.rand = new Random( Wave.levelSeeds[level] * 0xA0311 + 0x11be );
            this.rand.int();
            this.rand.int();
            this.count = level*2;
            this.goalCount = 12 + level/4;
        }
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        if( Player.I.x + Util.w(2/3) >= this.waveX ){

            this.count++;
            this.modeCount--;

            if( this.level > 0 ){
                this.goalCount--;
                if( this.goalCount <= 3 ){
                    this.waveX += Util.w(PILLAR_INTER_PER_W);
                    if( this.goalCount <= 0 ){
                        new GameOver( this.level );
                        let level = Util.getSaveDataNumber( SaveKeyNextLevel, 1 );
                        if( level == this.level ){
                            Util.setSaveDataNumber( SaveKeyNextLevel, level + 1 );
                        }
                        PhysicsObject.deltaScale = 0.0;
                        egret.Tween.removeAllTweens();
                        this.setStateNone();
                        Player.I.setStateNone();
                    }
                    return;
                }
            }

            if( this.modeCount <= 0 ){

                if( this.endInterval > 0 ){
                    this.waveX += Util.w(PILLAR_INTER_PER_W) * this.endInterval;   // 終わりには間隔が必要
                    this.endInterval = 0;
                    return;
                }

                // hard rate & speed
                Wave.hardRate = Util.clamp( this.count/200, 0, 1 );
                if( this.rand.bool( 1/2 ) && Player.speedCo <= 1 && this.state != this.stateNone ){
                    Player.speedCo = Util.lerp( MIN_SPEED_CO, MAX_SPEED_CO, Wave.hardRate );
                    Wave.hardRate = Util.clamp( Wave.hardRate - 0.25, 0, 1 );
                }else{
                    Player.speedCo = 1.0;
                }

                switch( this.rand.i( 0, 4+1 ) ){
                    case 0: this.setStatePillar();  break;
                    case 1: this.setStateCave();    break;
                    case 2: this.setStateBall();    break;
                    case 3: this.setStateBox();     break;
                    case 4: this.setStateSlopeBox();break;
                }
            }
            this.state();
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
        if( Wave.hardRate >= 0.1 && this.rand.bool( Wave.hardRate/2 ) ){
            PillarAngle.updateAngle();
            this.angled = true;
        }else{
            this.angled = false;
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
        if( this.angled == false )
            Pillar.newPillar( px, py, type, Wave.hardRate );
        else
            PillarAngle.newPillar( px, py, type, Wave.hardRate );
        const w = Util.w(PILLAR_INTER_PER_W);
        this.waveX += w;
        if( this.rand.bool(0.25) )
            new Coin( px+w*0.5, py );
    }
    angled:boolean = false;


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


    setStateSlopeBox(){
        this.state = this.stateSlopeBox;
        this.endInterval = 3;
        if( Player.speedCo <= 1 ){
            this.modeCount = this.rand.i( 4, 16 );
        }else{
            this.modeCount = 4;
        }
    }
    stateSlopeBox(){
        this.newSlopeBox();
    }
    newSlopeBox(){
        const span = Util.w(PILLAR_INTER_PER_W);
        const px = this.waveX + span * 1.5;
        const cy = Util.h( 0.5 );
        const h05 = Util.w( GAME_AREA_H_PER_W ) * 0.5;
        const s = Util.lerp( Util.w( SLOPE_MIN_SIZE_PER_W ), Util.w( SLOPE_MAX_SIZE_PER_W ), Wave.hardRate * randF(0.7,1) );
        let ysign;

        if( (this.modeCount % 2) == 0 )
            ysign = -1;
        else
            ysign = +1;
        
        const py = cy + h05 * ysign;
        new BoxSlope( px, py, s, OBJECT_COLOR, 10 );
        
        if( this.rand.bool(0.25) ){
            new Coin( px + randF(-1, +1), py + 1 * -ysign );
        }
        this.waveX += span;
    }
}


