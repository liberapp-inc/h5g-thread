// Liberapp 2019 - Tahiti Katagai
// 障害物

enum Pillar{
    Normal,
    Up,
    Down,
    Open,
    Close,
    UD,
    DU,
    UC,
    DC,
    Total
}

class Obstacle extends PhysicsObject{

    // 柱 中央の穴の座標を指定
    static newPillar( px:number, py:number, h:number, type:Pillar ){
        const hd = h*0.5 + Util.h(0.5);
        const o0 = new Obstacle( px, py-hd, Util.w( PILLAR_WIDTH_PER_W ), Util.height, OBJECT_COLOR );
        const o1 = new Obstacle( px, py+hd, Util.w( PILLAR_WIDTH_PER_W ), Util.height, OBJECT_COLOR );

        switch( type ){
            case Pillar.Normal:
            break;
            case Pillar.Up:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y-Util.h(0.2)}, 1000)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-Util.h(0.2)}, 1000)
            break;
            case Pillar.Down:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+Util.h(0.2)}, 1000)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y+Util.h(0.2)}, 1000)
            break;
            case Pillar.Open:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+Util.h(0.2)}, 0)
                .to({y:o0.y-Util.h(0.0)}, 1000)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-Util.h(0.2)}, 0)
                .to({y:o1.y-Util.h(0.0)}, 1000)
            break;
            case Pillar.Close:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y-Util.h(0.2)}, 0)
                .to({y:o0.y-Util.h(0.0)}, 1000)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y+Util.h(0.2)}, 0)
                .to({y:o1.y+Util.h(0.0)}, 1000)
            break;
            case Pillar.UD:
            egret.Tween.get(o0,{loop:true})
                .to({y:o0.y-Util.h(0.2)}, 1000)
                .to({y:o0.y+Util.h(0.0)}, 1000)
            egret.Tween.get(o1,{loop:true})
                .to({y:o1.y-Util.h(0.2)}, 1000)
                .to({y:o1.y+Util.h(0.0)}, 1000)
            break;
            case Pillar.DU:
            egret.Tween.get(o0,{loop:true})
                .to({y:o0.y+Util.h(0.2)}, 1000)
                .to({y:o0.y+Util.h(0.0)}, 1000)
            egret.Tween.get(o1,{loop:true})
                .to({y:o1.y+Util.h(0.2)}, 1000)
                .to({y:o1.y+Util.h(0.0)}, 1000)
            break;
            case Pillar.UC:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y-Util.h(0.2)}, 1000)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-Util.h(0.2)}, 2000)
            break;
            case Pillar.DC:
            egret.Tween.get(o0,{loop:false})
                .to({y:o0.y+Util.h(0.2)}, 2000)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y+Util.h(0.2)}, 1000)
            break;
        }
    }
    
    x:number;
    y:number;
    w:number;
    h:number;
    color:number;
    pass:boolean = false;

    constructor( px:number, py:number, w:number, h:number, color:number ) {
        super();

        this.x = px;
        this.y = py;
        this.w = w;
        this.h = h;
        this.color = color;
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
            Score.I.addPoint();
            egret.Tween.removeTweens(this);
        }
        if( this.display.x + this.w < 0 ){
            this.destroy();
        }
    }
}
