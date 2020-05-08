// Liberapp 2020 - Tahiti Katagai
// エフェクト　四角いラインエフェクト

class EffectFrame extends GameObject{

    w:number;
    h:number;
    c:number;
    a:number;
    vx:number = 0;
    vy:number = 0;
    dw:number;
    dh:number;
    delta:number = 0.5 * (1/20);

    constructor( x:number, y:number, w:number, h:number, color:number, vx:number=0, vy:number=0 ) {
        super();

        this.w = w;
        this.h = h;
        this.c = color;
        this.a = 0.5;
        this.vx = vx;
        this.vy = vy;

        this.dw = Util.w(PILLAR_WIDTH_PER_W) * 0.1 * randF(0.5, 1.5);
        this.dh = this.dw;
        this.delta *= randF( 0.8, 1.2 );
        this.setShape( x+vx, y+vy, this.w, this.h, color, this.a );
    }

    setShape( x:number, y:number, w:number, h:number, color:number, alpha:number ){
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
        shape.graphics.drawRect( -0.5*w, -0.5*h, w, h );
    }

    update() {

        this.X += this.vx;
        this.Y += this.vy;
        this.a -= this.delta;

        this.w += this.dw;
        this.h += this.dh;

        this.setShape( this.X, this.Y, this.w, this.h, this.c, this.a );

        if( this.a <= 0 ){
            this.destroy();
            return;
        }
    }
}
