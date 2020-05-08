// Liberapp 2020 - Tahiti Katagai
// エフェクト　四角いラインエフェクト

class EffectCircle extends GameObject{

    r:number;
    c:number;
    a:number;
    vx:number = 0;
    vy:number = 0;
    dr:number;
    delta:number = 0.5 * (1/20);

    constructor( x:number, y:number, r:number, color:number, vx:number=0, vy:number=0 ) {
        super();

        this.r = r;
        this.c = color;
        this.a = 0.5;
        this.vx = vx;
        this.vy = vy;

        this.dr = Util.w(PILLAR_WIDTH_PER_W) * 0.1 * randF(0.5, 1.5);
        this.delta *= randF( 0.8, 1.2 );
        this.setShape( x+vx, y+vy, this.r, color, this.a );
    }

    setShape( x:number, y:number, r:number, color:number, alpha:number ){
        let shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else{
            shape.graphics.clear();
        }

        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle( 8, color, alpha );
        shape.graphics.drawCircle( 0, 0, this.r );
    }

    update() {
        this.X += this.vx;
        this.Y += this.vy;
        this.a -= this.delta;

        this.r += this.dr;

        this.setShape( this.X, this.Y, this.r, this.c, this.a );

        if( this.a <= 0 ){
            this.destroy();
            return;
        }
    }
}
