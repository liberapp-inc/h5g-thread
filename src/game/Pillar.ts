// Liberapp 2019 - Tahiti Katagai
// 障害物　柱

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
        const h = Util.w( GAME_AREA_H_PER_W );
        const hole = Util.w( Util.lerp(PILLAR_HOLE_MAX_PW, PILLAR_HOLE_MIN_PW, lv) ) * Player.speedCo;
        const yofs = (hole + h) * 0.5;
        const o0 = new Pillar( px, py-yofs, w, h, OBJECT_COLOR, 10 );
        const o1 = new Pillar( px, py+yofs, w, h, OBJECT_COLOR, 0 );

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
                .to({y:o0.y+hole/5}, 0)
            egret.Tween.get(o1,{loop:false})
                .to({y:o1.y-hole/5}, 0)
            break;
        }
    }

    x:number;
    y:number;
    w:number;
    h:number;
    color:number;
    point:number;
    effect:boolean = false;
    pass:boolean = false;

    constructor( px:number, py:number, w:number, h:number, color:number, point:number, effect:boolean=true ) {
        super();

        this.x = px;
        this.y = py;
        this.w = w;
        this.h = h;
        this.color = color;
        this.point = point;
        this.effect = effect;
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

            if( this.effect ){
                new EffectFrame( this.X, this.Y, this.w, this.h, EFFECT_COLOR, -Player.I.vx, 0 );

                // for( let y=this.Y - this.h*0.5 ; y<=this.Y+this.h*0.5 ; y+=this.w*1.5 ){
                //     let vx = this.w * randF( -0.2, +0.2 ) - Player.I.vx;
                //     let vy = this.w * randF( -0.2, +0.2 );
                //     let w = this.w * 0.5;
                //     new EffectFrame( this.X, y, w, w, EFFECT_COLOR, vx, vy );
                // }
            }
        }
        if( this.display.x + this.w < 0 ){
            this.destroy();
        }
    }
}
