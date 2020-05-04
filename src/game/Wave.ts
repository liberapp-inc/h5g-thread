// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;

    waveX:number;
    count:number = 0;
    modeCount:number = 10;
    state:()=>void = this.stateBall;

    constructor() {
        super();
        Wave.hardRate = 0;
        Cave.prevPy0 = Util.h(0.5) - Util.w(GAME_AREA_H_PER_W*0.3);
        Cave.prevPy1 = Util.h(0.5) + Util.w(GAME_AREA_H_PER_W*0.3);

        this.waveX = Util.w(1);
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        if( Player.I.x + Util.w(2/3) >= this.waveX ){
            this.count++;
            this.modeCount--;
            this.state();
            Wave.hardRate = Util.clamp( this.count / 50, 0, 1 );
        }
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    endStateNone(){
    }
    stateNone(){
    }

    setStatePillar(){
        this.state = this.statePillar;
        this.modeCount = randI( 4, 16 );
    }
    endStatePillar(){
    }
    statePillar(){
        this.newPillar();
        if( this.modeCount <= 0 ){
            this.endStatePillar();
            this.setStateCave();
        }
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
    }


    setStateCave(){
        this.state = this.stateCave;
        this.modeCount = randI( 2, 8 );
    }
    endStateCave(){
        this.waveX += Util.w(PILLAR_INTER_PER_W);   // Caveの終わりには間隔が必要
    }
    stateCave(){
        this.newCave();
        if( this.modeCount <= 0 ){
            this.endStateCave();
            this.setStatePillar();
        }
    }
    newCave( gap:number = 0.45 ){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-gap, +gap) * Util.lerp(0.5, 1, Wave.hardRate) );
        Cave.newCave( px, py, Wave.hardRate );
        this.waveX += Util.w(CAVE_WIDTH_PER_W * 2);
    }


    setStateBall(){
        this.state = this.stateBall;
        this.modeCount = randI( 4, 16 );
    }
    endStateBall(){
    }
    stateBall(){
        this.newBall();
        if( this.modeCount <= 0 ){
            this.endStateBall();
            this.setStateBall();
        }
    }
    newBall( gap:number = 0.3 ){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-gap, +gap) * Util.lerp(0.5, 1, Wave.hardRate) );
        let type = PType.Normal;
        if( randBool( 0.8 * Wave.hardRate ) ){   // 最大80%の確率で別タイプ生成
            type = randI(PType.Normal, PType.Total);
        }
        Ball.newBall( px, py, type, Wave.hardRate );
        this.waveX += Util.w(PILLAR_INTER_PER_W);
    }
}


