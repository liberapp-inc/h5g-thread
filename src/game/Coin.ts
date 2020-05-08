// Liberapp 2019 - Tahiti Katagai
// コイン

class Coin extends GameObject{

    x:number;
    y:number;
    radius:number;

    constructor( x:number, y:number ) {
        super();

        this.x = x;
        this.y = y;
        this.radius = Util.w(COIN_RADIUS_PER_W);
        this.setShape(x, y);
    }

    setShape(x:number, y:number){
        let shape:egret.Shape = this.display as egret.Shape;
        if( this.display == null ){
            this.display = shape = new egret.Shape();
            GameObject.gameDisplay.addChild(this.display);
        }else
            shape.graphics.clear();

        shape.x = x;
        shape.y = y;
        shape.graphics.beginFill( COIN_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    update() {
        this.display.x = this.x;
        this.display.y = this.y;
        Camera2D.transform( this.display );

        // プレイヤーとの接触
        this.isPicked();

        // 画面外で消滅
        this.isOutOfScreen();
    }

    // プレイヤーとの接触
    isPicked():boolean{
        let dx = Player.I.x - this.x;
        let dy = Player.I.y - this.y;
        let l = dx**2 + dy**2;
        if( l <= (Player.I.radius + this.radius)**2 ){
            Score.I.addPoint(1);
            this.destroy();
            return true;
        }
        return false;
    }

    // 画面外で消滅
    isOutOfScreen():boolean{
        if( this.x + this.radius <= Camera2D.x ){
            this.destroy();
            return true;
        }
        return false;
    }
}
