// Liberapp 2019 - Tahiti Katagai
// ボーナス得点などゲーム中のテキストポップアップ

class EffectPopText extends GameObject{

    text:egret.TextField = null;
    time:number = 60;

    constructor( msg:string, x:number, y:number, fontsize:number, color:number ) {
        super();

        let tf = new egret.TextField();
        tf.text = msg;
        tf.bold = true;
        tf.size = fontsize;
        tf.textColor = color;
        tf.x = x;
        tf.y = y;
        
        this.text = tf;

        GameObject.gameDisplay.addChild( this.text );
    }

    onDestroy(){
        this.text.parent.removeChild( this.text );
    }

    update() {
        this.text.y -= 0.5;
        this.time--;
        if( this.time <= 0 ){
            this.destroy();
        }
    }
}
