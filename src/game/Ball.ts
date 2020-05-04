// Liberapp 2019 - Tahiti Katagai
// 障害物　ボール

class Ball extends PhysicsObject{

    // 
    static newBall( px:number, py:number, type:PType, lv:number ){
        const r = Util.w( BALL_RADIUS_PER_W );
        const hole = Util.w( Util.lerp(PILLAR_HOLE_MAX_PW, PILLAR_HOLE_MIN_PW, lv) );
        const yofs = (hole + r) * 0.5;
        const w = Util.w( PILLAR_INTER_PER_W );
        const o0 = new Ball( px+randF(0,w), py-yofs, r*randF(0.5,2), OBJECT_COLOR, 1 );
        const o1 = new Ball( px+randF(0,w), py+yofs, r*randF(0.5,2), OBJECT_COLOR, 0 );

        const hd = Util.w(0.25);
        const ms = 1000 / Player.speedCo;    //speed

        switch( type ){
            case PType.Normal:
            break;
            case PType.Up:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y-hd}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-hd}, ms)
            break;
            case PType.Down:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+hd}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y+hd}, ms)
            break;
            case PType.Open:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+hd}, 0)
                .to({y:o0.y-0}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-hd}, 0)
                .to({y:o1.y-0}, ms)
            break;
            case PType.Close:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y-hd}, 0)
                .to({y:o0.y-0}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y+hd}, 0)
                .to({y:o1.y+0}, ms)
            break;
            case PType.UC:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y-hd}, ms*0.75)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-hd}, ms*1.5)
            break;
            case PType.DC:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+hd}, ms*1.5)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y+hd}, ms*0.75)
            break;
            case PType.UD:
            egret.Tween.get(o0,{loop:true})
                .to({y:o0.y-hd}, ms)
                .to({y:o0.y+ 0}, ms)
            egret.Tween.get(o1,{loop:true})
                .to({y:o1.y-hd}, ms)
                .to({y:o1.y+ 0}, ms)
            break;
            case PType.DU:
            egret.Tween.get(o0,{loop:true})
                .to({y:o0.y+hd}, ms)
                .to({y:o0.y+ 0}, ms)
            egret.Tween.get(o1,{loop:true})
                .to({y:o1.y+hd}, ms)
                .to({y:o1.y+ 0}, ms)
            break;
            case PType.Narrow:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+hole/4}, 0)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-hole/4}, 0)
            break;
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
