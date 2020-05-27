// Liberapp 2019 - Tahiti Katagai
// 障害物　ボックス坂道

class BoxSlope extends PhysicsObject{

    x:number;
    y:number;
    s:number;
    color:number;
    point:number;
    pass:boolean = false;

    constructor( px:number, py:number, size:number, color:number, point:number ) {
        super();

        this.x = px;
        this.y = py;
        this.s = size;
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
        shape.graphics.drawRect( -0.5*this.s, -0.5*this.s, this.s, this.s );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], angle:Math.PI/4, type:p2.Body.STATIC} );
        this.body.addShape(new p2.Box( { width:this.p2m(this.s), height:this.p2m(this.s), collisionGroup:PHYSICS_GROUP_OBSTACLE, collisionMask:PHYSICS_GROUP_PLAYER } ), [0, 0], 0);
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
            new EffectFrame( this.X, this.Y, this.s, this.s, EFFECT_COLOR, -Player.I.vx, 0 ).display.rotation = this.display.rotation;
        }
        if( this.display.x + this.s/2*1.414 < 0 ){
            this.destroy();
        }
    }
}
