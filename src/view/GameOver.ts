// Liberapp 2019 Tahiti Katagai
// ゲームオーバー表示

class GameOver extends GameObject{

    texts:egret.TextField[] = [];
    retryButton:Button = null;
    backButton:Button = null;
    step:number = 0;
    readonly fadeInFrame:number = 64;
    level:number = 0;

    constructor( level:number=0 ) {
        super();
        this.level = level;

        this.texts[0] = Util.newTextField("SCORE : " + Score.I.point.toFixed(), Util.width / 13, FONT_COLOR, 0.5, 0.5, true, false);
        egret.Tween.get(this.texts[0],{loop:false})
            .to({alpha:0}, 0)
            .to({alpha:1}, 1000)
        GameObject.gameDisplay.addChild( this.texts[0] );

        if( level > 0 ){
            this.texts[1] = Util.newTextField("レベル" + level + "クリア", Util.width / 13, FONT_COLOR, 0.5, 0.3, true, false);
            GameObject.gameDisplay.addChild( this.texts[1] );
        }
        
        // New record
        if( SDK && Score.I.point > Score.bestScore && this.level == 0 ){
            Social.setScore( Score.I.point );
        }
    }

    onDestroy() {
        this.texts.forEach( text =>{ GameObject.gameDisplay.removeChild( text ); });
        this.texts = null;
    }
    
    update() {
        this.step++;
        if( this.step == this.fadeInFrame ){
            if( this.level == 0 ){
                this.retryButton = new Button("リトライ", Util.width/16, BACK_COLOR, 0.50, 0.75, 0.4, 0.1, FONT_COLOR, 1.0, -1, true, this.onTapRetry, this );
            }
            this.backButton  = new Button("終了", Util.width/18, BACK_COLOR, 0.1, 0.1, 0.2, 0.075, FONT_COLOR, 1.0, -1, true, this.onTapBack, this );
            
            if( Score.I.point > Score.bestScore && this.level == 0 ){
                this.texts[1] = Util.newTextField("NEW RECORD!", Util.width / 13, FONT_COLOR, 0.5, 0.40, true, false);
                egret.Tween.get(this.texts[1],{loop:true})
                    .to({alpha:0}, 500)
                    .to({alpha:1}, 500)
                GameObject.gameDisplay.addChild( this.texts[1] );
            }
        }
     }

    onTapBack(){
        Game.level = 0;
        GameObject.transit = SceneTitle.loadScene;
        this.destroy();
    }
    onTapRetry(){
        GameObject.transit = ScenePlay.loadScene;
        this.destroy();
    }
}
