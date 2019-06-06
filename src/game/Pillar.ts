// Liberapp 2019 - Tahiti Katagai
// 障害物

enum PType{
    Normal,
    Up,
    Down,
    Open,
    Close,
    UC,
    DC,
    UD,
    DU,
    Narrow,
    Total
}

class Pillar extends PhysicsObject{

    // 柱 中央の穴の座標を指定
    static newPillar( px:number, py:number, type:PType, lv:number ){
        const w = Util.w( PILLAR_WIDTH_PER_W );
        const h = Util.width;   // 横幅基準の高さ
        const hole = Util.w( Util.lerp(PILLAR_HOLE_MAX_PW, PILLAR_HOLE_MIN_PW, lv) );
        const yofs = hole*0.5 + Util.w(0.5);
        const o0 = new Pillar( px, py-yofs, w, h, OBJECT_COLOR, 1 );
        const o1 = new Pillar( px, py+yofs, w, h, OBJECT_COLOR, 0 );

        const hd = Util.w(0.25);
        const ms = 1000;

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
    w:number;
    h:number;
    color:number;
    point:number;
    pass:boolean = false;

    constructor( px:number, py:number, w:number, h:number, color:number, point:number ) {
        super();

        this.x = px;
        this.y = py;
        this.w = w;
        this.h = h;
        this.color = color;
        this.point = point;
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChildAt(this.display, 1);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( this.color );
        shape.graphics.drawRect( -0.5*this.w, -0.5*this.h, this.w, this.h );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], type:p2.Body.STATIC} );
        this.body.addShape(new p2.Box( { width:this.p2m(this.w), height:this.p2m(this.h), collisionGroup:PHYSICS_GROUP_OBSTACLE, collisionMask:PHYSICS_GROUP_PLAYER } ), [0, 0], 0);
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
        if( this.display.x + this.w < 0 ){
            this.destroy();
        }
    }
}
