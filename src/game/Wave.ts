// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static hardRate:number;
    waveX:number;
    mode:number = 0;
    count:number = 0;
    modeCount:number = 10;

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
            if( this.mode == 0 ){
                this.newPillar();
            }else{
                this.newCave();
            }

            if( (--this.modeCount) <= 0 ){
                if( this.mode == 0 ){
                    this.modeCount = randI( 2, 8 );
                }
                else{
                    this.modeCount = randI( 4, 16 );
                    this.waveX += Util.w(PILLAR_INTER_PER_W);   // Cave->Pillar 切り替えは間隔が必要
                }
                this.mode = (this.mode + 1) & 1;
            }
            this.count++;
            Wave.hardRate = Util.clamp( this.count / 50, 0, 1 );
        }
    }

    newPillar(){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-0.3, +0.3) * Util.lerp(0.7, 1, Wave.hardRate) );
        let type = PType.Normal;            // 動かないノーマルピラー
        if( rand() < 0.8*Wave.hardRate ){   // 最大80%の確率で別タイプ生成
            type = randI(PType.Normal, PType.Total);
        }
        Pillar.newPillar( px, py, type, Wave.hardRate );
        this.waveX += Util.w(PILLAR_INTER_PER_W);
    }

    newCave(){
        let px = this.waveX;
        let py = Util.h(0.5) + Util.w( randF(-0.45, +0.45) * Util.lerp(0.7, 1, Wave.hardRate) );
        Cave.newCave( px, py, Wave.hardRate );
        this.waveX += Util.w(CAVE_WIDTH_PER_W * 2);
    }
}

