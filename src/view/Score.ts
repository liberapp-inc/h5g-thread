// Liberapp 2019 - Tahiti Katagai
// スコア表示

class Score extends GameObject{

    static I:Score = null;   // singleton instance

    static bestScore: number = 0;
    static bestRank: number | undefined;

    point:number = 0;
    combo:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    constructor() {
        super();

        Score.I = this;
        this.point = 0;
        this.text = Util.newTextField("0", Util.width / 16, FONT_COLOR2, 0.5, 0.0, true, true);
        GameObject.gameDisplay.addChild( this.text );

        this.textBest = Util.newTextField("BEST:" + Score.bestScore, Util.width / 24, FONT_COLOR2, 0.85, 0.0, true, true);
        GameObject.gameDisplay.addChild( this.textBest );
    }
    
    onDestroy() {
        GameObject.gameDisplay.removeChild( this.text );
        this.text = null;
        GameObject.gameDisplay.removeChild( this.textBest );
        this.textBest = null;
        Score.I = null;
    }

    update(){}

    addPoint( point:number=1 ){
        this.point += point;
        this.text.text = "" + this.point.toFixed();
        if( Score.bestScore < this.point ){
            this.textBest.text = "BEST:" + this.point.toFixed();
        }
    }

    addCombo(){
        this.combo++;
    }
    resetCombo(){
        this.combo = 0;
    }
}
