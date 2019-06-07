// Liberapp 2019 - Tahiti Katagai
// 背景（画面上下のゲームエリア外）

class BackGround extends GameObject{

    constructor() {
        super();
        this.setShape();
    }

    setShape(){
        let shape = new egret.Shape();
        if( this.display ) GameObject.display.removeChild(this.display);
        this.display = shape;
        GameObject.display.addChild(this.display);

        shape.graphics.beginFill( OBJECT_COLOR, 1 );
        shape.graphics.drawRect(0, 0,  Util.width, Util.h(0.5)-Util.w(GAME_AREA_H_PER_W*0.5) );
        shape.graphics.drawRect(0, Util.h(0.5)+Util.w(GAME_AREA_H_PER_W*0.5),  Util.width, Util.height );
        shape.graphics.endFill();
    }

    update() {
    }
}
