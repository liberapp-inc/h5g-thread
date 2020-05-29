// Liberapp 2019 - Tahiti Katagai
// 障害物　ボックス

class Box extends PhysicsObject{

    static newBox( px:number, lv:number, sizeRate:number, rand:Random, count:number=2 ){
        
        const w = Util.w( PILLAR_INTER_PER_W );
        const minS = Util.w( BOX_MIN_SIZE_PER_W );
        const maxS = Util.w( BOX_MAX_SIZE_PER_W );
        px += maxS;
        const hd = Util.w(0.25);
        const ms = 1500 / Player.speedCo;    //speed
        for( let i=0 ; i<count ; i++ ){
            let y = Util.h(0.5) + Util.w( GAME_AREA_H_PER_W * rand.f(-0.5, +0.5) );
            let s = Util.lerp( minS, maxS, rand.f01() * sizeRate );
            let o = new Box( px+rand.f(0,w), y, s, Game.oColor(), 3 );
            if( rand.bool( 1/4 * lv ) )
            {
                if( rand.bool(0.5*Wave.hardRate) )   //loop
                {
                    if( y < Util.h(0.5) ){
                        egret.Tween.get(o,{loop:true})
                            .to({y:o.y+hd}, ms)
                            .to({y:o.y+ 0}, ms)
                    }else{
                        egret.Tween.get(o,{loop:true})
                            .to({y:o.y-hd}, ms)
                            .to({y:o.y+ 0}, ms)
                    }
                }
                else{
                    if( rand.bool() ){
                        egret.Tween.get(o,{loop:false}) .to({y:o.y-hd}, ms)
                    }else{
                        egret.Tween.get(o,{loop:false}) .to({y:o.y+hd}, ms)
                    }
                }
            }
        }
    }

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
        this.body = new p2.Body( {gravityScale:0, mass:1, position:[this.p2m(px), this.p2m(py)], type:p2.Body.STATIC} );
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
            new EffectFrame( this.X, this.Y, this.s, this.s, EFFECT_COLOR, -Player.I.vx, 0 );
        }
        if( this.display.x + this.s/2 < 0 ){
            this.destroy();
        }
    }
}
