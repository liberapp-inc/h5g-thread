// Liberapp 2019 - Tahiti Katagai
// ブロック生成

class Wave extends GameObject{

    static readonly interMin = 60;
    static readonly interMax = 90;
    frame:number = Wave.interMax;
    count:number = 0;

    constructor() {
        super();
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        if( (--this.frame) <= 0 ){
            this.frame = Wave.interMax;
            this.count++;

            this.newPillar();
        }
    }

    newPillar(){
        let px = Camera2D.x + Util.w(1.0);
        let py = Util.h( randF(0.3, 0.7) );
        let holeH = Util.h(0.2);
        // Obstacle.newPillar( px, py, holeH, randI(Pillar.Normal, Pillar.Total) );
        Obstacle.newPillar( px, py, holeH, this.count % Pillar.Total );
    }
}

