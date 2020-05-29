// Liberapp 2019 - Tahiti Katagai
// 障害物　傾いた柱

class PillarAngle extends Pillar{

    public static angle:number = 0;

    public static updateAngle(){
        const range = 2;
        this.angle = randI( -range, +range );
        if( this.angle >= 0 )
            this.angle++;   // -2, -1, +1, +2
        this.angle = this.angle / 2 * Math.PI / 6;
    }

    // 柱 中央の穴の座標を指定
    static newPillar( px:number, py:number, type:PType, lv:number ){

        px += Util.w(PILLAR_INTER_PER_W);
        const ux = +Math.sin(PillarAngle.angle);
        const uy = -Math.cos(PillarAngle.angle);

        const w = Util.w( PILLAR_WIDTH_PER_W );
        const h = Util.w( GAME_AREA_H_PER_W );
        const hole = Util.w( Util.lerp(PILLAR_HOLE_MAX_PW, PILLAR_HOLE_MIN_PW, lv) ) * Player.speedCo;
        const xofs = (hole + h) * 0.5 * ux;
        const yofs = (hole + h) * 0.5 * uy;
        const o0 = new PillarAngle( px-xofs, py-yofs, w, h, Game.oColor(), 5 );
        const o1 = new PillarAngle( px+xofs, py+yofs, w, h, Game.oColor(), 5 );

        const wd = Util.w(0.25) * ux;
        const hd = Util.w(0.25) * uy;
        const ms = 1000 / Player.speedCo;    //speed

        switch( type ){
            case PType.Normal:
            break;
            case PType.Up:
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x-wd, y:o0.y-hd}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x-wd, y:o1.y-hd}, ms)
            break;
            case PType.Down:
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x+wd, y:o0.y+hd}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x+wd, y:o1.y+hd}, ms)
            break;
            case PType.Open:
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x+wd, y:o0.y+hd}, 0)
                .to({x:o0.x-0,  y:o0.y-0}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x-wd, y:o1.y-hd}, 0)
                .to({x:o1.x-0,  y:o1.y-0}, ms)
            break;
            case PType.Close:
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x-wd, y:o0.y-hd}, 0)
                .to({x:o0.x-0,  y:o0.y-0}, ms)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x+wd, y:o1.y+hd}, 0)
                .to({x:o1.x+0,  y:o1.y+0}, ms)
            break;
            case PType.UC:
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x-wd, y:o0.y-hd}, ms*0.75)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x-wd, y:o1.y-hd}, ms*1.5)
            break;
            case PType.DC:
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x+wd, y:o0.y+hd}, ms*1.5)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x+wd, y:o1.y+hd}, ms*0.75)
            break;
            case PType.UD:
            egret.Tween.get(o0,{loop:true})
                .to({x:o0.x-wd, y:o0.y-hd}, ms)
                .to({x:o0.x+ 0, y:o0.y+ 0}, ms)
            egret.Tween.get(o1,{loop:true})
                .to({x:o1.x-wd, y:o1.y-hd}, ms)
                .to({x:o1.x+ 0, y:o1.y+ 0}, ms)
            break;
            case PType.DU:
            egret.Tween.get(o0,{loop:true})
                .to({x:o0.x+wd, y:o0.y+hd}, ms)
                .to({x:o0.x+ 0, y:o0.y+ 0}, ms)
            egret.Tween.get(o1,{loop:true})
                .to({x:o1.x+wd, y:o1.y+hd}, ms)
                .to({x:o1.x+ 0, y:o1.y+ 0}, ms)
            break;
            case PType.Narrow:
            const hole20w = hole/5 * ux;
            const hole20h = hole/5 * uy;
            egret.Tween.get(o0,{loop:false})
                .to({x:o0.x+hole20w, y:o0.y+hole20h}, 0)
            egret.Tween.get(o1,{loop:false})
                .to({x:o1.x-hole20w, y:o1.y-hole20h}, 0)
            break;
        }
    }

    constructor( px:number, py:number, w:number, h:number, color:number, point:number, effect:boolean=true ) {
        super( px, py, w, h, color, point, effect );

        this.body.angle = PillarAngle.angle;
        this.display.rotation = this.body.angle * 180 / Math.PI;
        Camera2D.transform( this.display );
    }

    fixedUpdate() {
        this.display.x = this.px = this.x;
        this.display.y = this.py = this.y;        
        Camera2D.transform( this.display );

        if( this.pass == false && this.x < Player.I.x ){
            this.pass = true;
            Score.I.addPoint( this.point );
            // egret.Tween.removeTweens(this);

            if( this.effect ){
                const ef = new EffectFrame( this.X, this.Y, this.w, this.h, EFFECT_COLOR, -Player.I.vx, 0 );
                ef.display.rotation = this.display.rotation;

                // for( let y=this.Y - this.h*0.5 ; y<=this.Y+this.h*0.5 ; y+=this.w*1.5 ){
                //     let vx = this.w * randF( -0.2, +0.2 ) - Player.I.vx;
                //     let vy = this.w * randF( -0.2, +0.2 );
                //     let w = this.w * 0.5;
                //     new EffectFrame( this.X, y, w, w, EFFECT_COLOR, vx, vy );
                // }
            }
        }
        if( this.display.x + Util.w(PILLAR_INTER_PER_W) < 0 ){
            this.destroy();
        }
    }
}
