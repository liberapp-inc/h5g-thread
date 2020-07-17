// Liberapp 2019 - Tahiti Katagai
// 背景（画面上下のゲームエリア外）

class BackGround extends GameObject{

    constructor() {
        super();
        this.setShape();
        document.body.style.background = "#" + (('000000' + Game.bColor().toString(16).toUpperCase()).substr(-6));
    }

    setShape(){
        let shape = new egret.Shape();
        if( this.display ) GameObject.gameDisplay.removeChild(this.display);
        this.display = shape;
        GameObject.gameDisplay.addChild(this.display);

        const w = Util.width;
        const h = ( Util.height - Util.w(GAME_AREA_H_PER_W) ) * 0.5;
        shape.graphics.beginFill( Game.oColor(), 1 );
        shape.graphics.drawRect(0, 0,               w, h );
        shape.graphics.drawRect(0, Util.height-h,   w, GameObject.gameDisplay.stage.stageHeight - (Util.height-h) );
        shape.graphics.endFill();
    }

    update() {
    }
}
