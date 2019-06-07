// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        this.texts[0] = Util.newTextField("糸の冒険", Util.width / 12, FONT_COLOR, 0.5, 0.25, true, false);
        this.texts[1] = Util.newTextField("タッチ中は上昇", Util.width / 19, FONT_COLOR, 0.5, 0.35, true, false);
        this.texts[2] = Util.newTextField("ぶつからないように進め", Util.width / 19, FONT_COLOR, 0.5, 0.4, true, false);
        this.texts.forEach( text =>{ GameObject.display.addChild( text ); });

        GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN, this.tap, this);
    }

    onDestroy(){
        this.texts.forEach( text =>{ GameObject.display.removeChild( text ); });
        this.texts = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Player.I.setStateMove();
        this.destroy();
    }
}
