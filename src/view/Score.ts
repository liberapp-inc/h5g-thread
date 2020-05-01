// Liberapp 2019 - Tahiti Katagai
// スコア表示

class Score extends GameObject{

    static I:Score = null;   // singleton instance

    point:number = 0;
    bestScore:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    constructor() {
        super();

        Score.I = this;
        this.point = 0;
        this.text = Util.newTextField("0", Util.width / 16, FONT_COLOR2, 0.5, 0.0, true, true);
        GameObject.gameDisplay.addChild( this.text );

        let bestScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );
        this.bestScore = bestScore;
        this.textBest = Util.newTextField("BEST:" + bestScore, Util.width / 24, FONT_COLOR2, 1.0, 0.0, true, true);
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
        if( this.bestScore < this.point ){
            this.textBest.text = "BEST:" + this.point.toFixed();
        }
    }
}
