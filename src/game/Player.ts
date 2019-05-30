// Liberapp 2019 - Tahiti Katagai
// プレイヤー 糸

class Player extends PhysicsObject{

    static I:Player = null;

    radius:number;
    button:Button;
    
    state:()=>void = this.stateNone;
    step:number = 0;

    fall:boolean = false;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = Util.w(THREAD_WIDTH_PER_W);
        this.setDisplay( px, py );
        this.setBody( px, py );
        Camera2D.y = Util.h(-0.75);
        this.cameraAtTop();
        
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( PLAYER_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    setBody( px:number, py:number ){
        this.body = new p2.Body( {gravityScale:0, mass:0.1, position:[this.p2m(px), this.p2m(py)] } );
        this.body.addShape(new p2.Circle({ radius:this.p2m(this.radius), collisionGroup:PHYSICS_GROUP_PLAYER, collisionMask:PHYSICS_GROUP_BLOCK }));
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

    fixedUpdate() {
        this.state();
    }

    camera(){
        let top = Math.min( this.py-Util.h(0.25), Camera2D.y );

        Camera2D.x = Util.w(-0.5);
        Camera2D.y = Util.lerp( Camera2D.y, Math.min( top, -Util.h(0.25) ), 1/8 );
        Camera2D.scale = 1;
        Camera2D.transform( this.display, 1 );
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){
        this.camera();
    }


    setStateMove(){
        this.state = this.stateMove;
        this.step = 0;
    }
    stateMove() {
        // rise
        if( this.button.touch ){
            this.vy += Util.w(RISE_POWER_PER_W)
        }
        this.camera();
        this.checkFall();
    }

    checkFall(){
        if( this.py > Util.height )
            this.miss();
    }

    miss(){
        if( this.state == this.stateNone )
            return;
        new GameOver();
        PhysicsObject.deltaScale = 0.1;
        this.state = this.stateNone;
        this.fall = true;
    }
}
