// Liberapp 2019 - Tahiti Katagai
// コイン

class Coin extends PhysicsObject{

    radius:number;
    step:number = 0;

    constructor( x:number, y:number ) {
        super();

        this.radius = Util.w(COIN_RADIUS_PER_W);
        this.setShape(x, y);
        this.setBody( x, y );
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
    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:0.1, position:[this.p2m(px), this.p2m(py)] } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius), collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_OBSTACLE }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    fixedUpdate() {
        Camera2D.transform( this.display );

        this.body.velocity[0] *= 0.1;
        this.body.velocity[1] *= 0.1;
        const center = Util.h( 0.5 );
        const h05 = Util.w(GAME_AREA_H_PER_W*0.45);
        this.py = Util.clamp( this.py, center-h05, center+h05);

        // プレイヤーとの接触
        if( this.isPicked() )
            return;

        // 画面外で消滅
        this.isOutOfScreen();
    }

    // プレイヤーとの接触
    isPicked():boolean{
        let dx = Player.I.x - this.px;
        let dy = Player.I.y - this.py;
        let l = dx**2 + dy**2;
        if( l <= ( Player.I.radius + this.radius * 4 )**2 ){
            Score.I.addCombo();
            let point = 10 * Score.I.combo;
            Score.I.addPoint(point);

            new EffectPopText( "+" + point, this.display.x, this.display.y, 30, FONT_COLOR );
            new EffectCircle( this.X, this.Y, this.radius*1.5, COIN_COLOR, -Player.I.vx, 0 );
            this.destroy();
            return true;
        }
        return false;
    }

    // 画面外で消滅
    isOutOfScreen():boolean{
        // 見逃し
        if( this.step == 0 ){
            if( this.px + this.radius < Player.I.x - Player.I.radius ){
                this.step = 1;
                Score.I.resetCombo();
                new EffectPopText( "MISS!", this.display.x, this.display.y, 30, FONT_COLOR );
            }
        }

        if( this.px + this.radius <= Camera2D.x ){
            this.destroy();
            return true;
        }
        return false;
    }
}
