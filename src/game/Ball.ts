// Liberapp 2019 - Tahiti Katagai
// 障害物　ボール

class Ball extends PhysicsObject{

    static newBall( px:number, lv:number, sizeRate:number, count:number=2 ){
        
        const w = Util.w( PILLAR_INTER_PER_W );
        const minR = Util.w( BALL_MIN_RADIUS_PER_W );
        const maxR = Util.w( BALL_MAX_RADIUS_PER_W );
        px += maxR;
        const hd = Util.w(0.25);
        const ms = 1500 / Player.speedCo;    //speed
        for( let i=0 ; i<count ; i++ ){
            let y = Util.h(0.5) + Util.w( GAME_AREA_H_PER_W * randF(-0.5, +0.5) );
            let r = Util.lerp( minR, maxR, rand01() * sizeRate );
            let o = new Ball( px+randF(0,w), y, r, OBJECT_COLOR, i==0 ? 1 : 0 );
            if( randBool( 1/4 * lv ) )
            {
                if( randBool() ){
                    egret.Tween.get(o,{loop:false}) .to({y:o.y-hd}, ms)
                }else{
                    egret.Tween.get(o,{loop:false}) .to({y:o.y+hd}, ms)
                }
            }
        }
    }

    x:number;
    y:number;
    r:number;
    color:number;
    point:number;
    pass:boolean = false;

    constructor( px:number, py:number, r:number, color:number, point:number ) {
        super();

        this.x = px;
        this.y = py;
        this.r = r;
        this.color = color;
        this.point = point;
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.gameDisplay.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.gameDisplay.addChildAt(this.display, 1);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( this.color );
        shape.graphics.drawCircle( 0, 0, this.r );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], type:p2.Body.STATIC} );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.r), collisionGroup:PHYSICS_GROUP_OBSTACLE, collisionMask:PHYSICS_GROUP_PLAYER }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
    }

    update(){
        this.fixedUpdate();
    }
    fixedUpdate() {
        this.display.x = this.px = this.x;
        this.display.y = this.py = this.y;        
        Camera2D.transform( this.display );

        if( this.pass == false && this.x < Player.I.x ){
            this.pass = true;
            Score.I.addPoint( this.point );
            egret.Tween.removeTweens(this);
        }
        if( this.display.x + this.r < 0 ){
            this.destroy();
        }
    }
}