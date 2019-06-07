// Liberapp 2019 - Tahiti Katagai
// プレイヤー 糸

class Player extends PhysicsObject{

    static I:Player = null;

    radius:number;
    x:number;
    y:number;
    vx:number;
    vy:number;

    readonly xyListMax:number = 32;
    readonly xyListStep:number = 2;
    xyList:number[][]; //[Player.xyListMax][2];
    xyIndex:number = 0;
    
    button:Button;
    state:()=>void = this.stateNone;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = Util.w(THREAD_WIDTH_PER_W);
        this.x = px;
        this.y = py;
        this.vx = Util.w( PLAYER_SPEED_PER_W );
        this.vy = 0;

        this.xyList = [];
        for( let i=0 ; i<this.xyListMax ; i++ ){
            this.xyList[i] = [];
            this.xyList[i][0] = px - i * this.vx * this.xyListStep;
            this.xyList[i][1] = py;
        }

        this.scrollCamera();
        this.setDisplay( px, py );
        this.setBody( px, py );
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( px:number, py:number ){
        if( this.display == null ){
            this.display = new egret.Shape();
            GameObject.display.addChild(this.display);
        }
        const shape:egret.Shape = this.display as egret.Shape;
        shape.graphics.clear();

        // pyList
        this.xyIndex -= 1 / this.xyListStep;
        if( this.xyIndex < 0 )
            this.xyIndex += this.xyListMax;

        let index = Math.floor( this.xyIndex );
        this.xyList[index][0] = px;
        this.xyList[index][1] = py;

        shape.x = 0;
        shape.y = 0;
        shape.graphics.lineStyle(6, PLAYER_COLOR, 1, false, null, null, egret.JointStyle.MITER );
        shape.graphics.moveTo( Camera2D.transX( this.xyList[index][0] ), Camera2D.transY( this.xyList[index][1] ) );
        index = ++index % this.xyListMax;
        for( let i=1 ; i<this.xyListMax ; i++ ){
            shape.graphics.lineTo( Camera2D.transX( this.xyList[index][0] ), Camera2D.transY( this.xyList[index][1] ) );
            index = ++index % this.xyListMax;
        }
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:0.1, position:[this.p2m(px), this.p2m(py)] } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius), collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_OBSTACLE }));
        this.body.displays = [this.display];
        PhysicsObject.world.addBody(this.body);
        PhysicsObject.world.on("beginContact", this.beginContact, this);
    }

    beginContact(e){
        const bodyA:p2.Body = e.bodyA;
        const bodyB:p2.Body = e.bodyB;
        if( bodyA == this.body || bodyB == this.body ){
            this.miss();
        }
    }

    update(){
        this.fixedUpdate();
    }
    fixedUpdate() {
        this.state();
    }

    scrollCamera(){
        Camera2D.x = this.x - Util.w(1/3);
        Camera2D.y = 0;
        // Camera2D.transform( this.display, 1 );
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
    }

    setStateMove(){
        this.state = this.stateMove;
    }
    stateMove() {
        this.vy *= 0.97;
        if( this.button.touch ){
            this.vy -= Util.w(RISE_POWER_PER_W);
        }else{
            this.vy += Util.w(RISE_POWER_PER_W);
        }
        this.x += this.vx;
        this.y += this.vy;
        this.px = this.x;
        this.py = this.y;

        this.scrollCamera();
        this.setDisplay( this.px, this.py );
        this.checkOut();
    }

    checkOut(){
        if( (this.py - Util.h(0.5))**2 > Util.w(GAME_AREA_H_PER_W*0.5)**2 )
            this.miss();
    }

    miss(){
        if( this.state == this.stateNone )
            return;
        new GameOver();
        PhysicsObject.deltaScale = 0.1;
        egret.Tween.removeAllTweens();
        this.state = this.stateNone;
    }
}
