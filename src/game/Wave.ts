// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;
    frame:number = PILLAR_PERIOD;
    count:number = 0;

    constructor() {
        super();
        Wave.hardRate = 0;
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        // if( (--this.frame) <= 0 ){
        //     this.frame = PILLAR_PERIOD;
        //     this.count++;
        //     this.newPillar();
        //     Wave.hardRate = Util.clamp( this.count / 40, 0, 1 );
        // }

        if( (--this.frame) <= 0 ){
            this.frame = CAVE_PERIOD * 2;
            this.count++;
            this.newCave();
            Wave.hardRate = 1;//Util.clamp( this.count / 40, 0, 1 );
        }
    }

    newPillar(){
        let px = Camera2D.x + Util.w(1.0);
        let py = Util.h(0.5) + Util.w( randF(-0.35, +0.35) * Util.lerp(0.7, 1, Wave.hardRate) );
        let type = PType.Normal;            // 動かないノーマルピラー
        if( rand() < 0.8*Wave.hardRate ){   // 最大80%の確率で別タイプ生成
            type = randI(PType.Normal, PType.Total);
        }
        Pillar.newPillar( px, py, type, Wave.hardRate );
    }

    newCave(){
        let px = Camera2D.x + Util.w(1.0);
        let py = Util.h(0.5) + Util.w( randF(-0.35, +0.35) * Util.lerp(0.7, 1, Wave.hardRate) );
        Cave.newCave( px, py, Wave.hardRate );
    }
}

