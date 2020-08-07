// Liberapp 2019 Tahiti Katagai
// ゲームオーバー表示

const AU_COLOR = 0xDB6029;
const FB_COLOR = 0x354E92;
const TW_COLOR = 0x66BBE8;
const LN_COLOR = 0x54B745;

class GameOver extends GameObject{

    modal:egret.Shape;
    tex:egret.Bitmap[] = [];
    texts:egret.TextField[] = [];
    retryButton:Button = null;
    backButton:Button = null;
    fbBtn:Button = null;
    twBtn:Button = null;
    lnBtn:Button = null;
    step:number = 0;
    readonly fadeInFrame:number = 64;
    clear:boolean;

    constructor( clear:boolean ) {
        super();
        this.clear = clear;

        const w = Util.width;
        const h = Util.height;
        let tex = 0;
        let txt = 0;

        this.modal = new egret.Shape();
        GameObject.gameDisplay.addChild(this.modal);
        this.modal.graphics.lineStyle( 0 );
        this.modal.graphics.beginFill( 0xf0f0f0, 1 );
        this.modal.graphics.drawRoundRect( w*0.05, h*0.01, w*0.9, h*0.9, w*0.1 );
        this.modal.graphics.endFill();

        this.tex[tex++] = Util.newBitmap( "result_png", Util.w(0.5), Util.h(0.1), 0.75 );

        if( Game.level == 0 ){
            // エンドレス
            if( Score.I.point > Score.bestScore ){
                // ハイスコア更新
                Util.setSaveDataNumber( SaveKeyBestScore, Score.I.point );
                this.tex[tex++] = Util.newBitmap( "popper_l_png", Util.w(0.2), Util.h(0.3), 0.75 );
                this.tex[tex++] = Util.newBitmap( "popper_r_png", Util.w(0.8), Util.h(0.3), 0.75 );
                this.texts[txt++] = Util.newTextField("ハイスコア更新", Util.width / 24, AU_COLOR, 0.5, 0.23, true, false);
            }else{
                this.texts[txt++] = Util.newTextField("スコア", Util.width / 24, AU_COLOR, 0.5, 0.23, true, false);
            }
            this.texts[txt++] = Util.newTextField(Score.I.point.toFixed(), Util.width / 10, 0x202020, 0.5, 0.30, true, false);
            this.texts[txt++] = Util.newTextField("ハイスコア " + Score.bestScore, Util.width / 26, 0x606060, 0.5, 0.37, true, false);
        }
        else{
            // コース
            if( this.clear ){
                // クリア
                Util.setSaveDataNumber( SaveKeyPastLevel, Game.level );
                this.tex[tex++] = Util.newBitmap( "popper_l_png", Util.w(0.2), Util.h(0.3), 0.75 );
                this.tex[tex++] = Util.newBitmap( "popper_r_png", Util.w(0.8), Util.h(0.3), 0.75 );
                this.texts[txt++] = Util.newTextField("コース " + Game.level, Util.width / 24, AU_COLOR, 0.5, 0.23, true, false);
                this.texts[txt++] = Util.newTextField("クリア！", Util.width / 10, 0x202020, 0.5, 0.30, true, false);
                this.texts[txt++] = Util.newTextField("スコア " + Score.I.point.toFixed(), Util.width / 26, 0x606060, 0.5, 0.37, true, false);
            }
            else{
                // ミス スコア表示
                this.texts[txt++] = Util.newTextField("コース " + Game.level, Util.width / 24, AU_COLOR, 0.5, 0.23, true, false);
                this.texts[txt++] = Util.newTextField(Score.I.point.toFixed().toString(), Util.width / 10, 0x202020, 0.5, 0.3, true, false);
            }
        }
        
        // SNS ボタン
        this.fbBtn = new Button("", Util.width/16, 0xffffff, 0.25, 0.45, 0.22, 0.06, FB_COLOR, 1.0, -1, true, this.onTapFb, this );
        this.twBtn = new Button("", Util.width/16, 0xffffff, 0.50, 0.45, 0.22, 0.06, TW_COLOR, 1.0, -1, true, this.onTapTw, this );
        this.lnBtn = new Button("", Util.width/16, 0xffffff, 0.75, 0.45, 0.22, 0.06, LN_COLOR, 1.0, -1, true, this.onTapLn, this );
        this.tex[tex++] = Util.newBitmap( "fb_svg", Util.w(0.25), Util.h(0.45), 0.75 );
        this.tex[tex++] = Util.newBitmap( "twitter_svg", Util.w(0.50), Util.h(0.45), 0.75 );
        this.tex[tex++] = Util.newBitmap( "line_svg", Util.w(0.75), Util.h(0.45), 0.75 );

        // ハビッツ表示するなら y=0.55まで位置を上げる
        // this.retryButton = new Button("リトライ", Util.width/16, 0xffffff, 0.50, 0.55, 0.5, 0.1, AU_COLOR, 1.0, -1, true, this.onTapRetry, this );
        // this.backButton  = new Button("終了", Util.width/28, 0xffffff, 0.15, 0.55, 0.15, 0.07, AU_COLOR, 1.0, -1, true, this.onTapBack, this );
        this.retryButton = new Button("リトライ", Util.width/16, 0xffffff, 0.50, 0.65, 0.5, 0.1, AU_COLOR, 1.0, -1, true, this.onTapRetry, this );
        this.backButton  = new Button("終了", Util.width/28, 0xffffff, 0.15, 0.65, 0.15, 0.07, AU_COLOR, 1.0, -1, true, this.onTapBack, this );

        // if( SDK ){
        //     if( Game.level == 0 ){
        //         if( Score.I.point > Score.bestScore ){
        //             Social.setScore( Score.I.point );
        //         }
        //     }else{
        //         if( clear && Game.level > Social.level ){
        //             Social.setLevel( Game.level );
        //             Game.level++;
        //         }
        //     }
        // }

        this.tex.forEach( tex => { GameObject.baseDisplay.addChild( tex ); } );
        this.texts.forEach( text => { GameObject.baseDisplay.addChild( text ); } );

        treventbe("click】ゲーム画面", "ゲーム終了", "");
    }

    onDestroy() {
        this.tex.forEach( tex => { if( tex ) tex.parent.removeChild( tex ); } );
        this.texts.forEach( text =>{ text.parent.removeChild( text ); });
        this.tex = null;
        this.texts = null;

        this.modal.parent.removeChild( this.modal );
    }
    
    update() {
        this.step++;
        if( this.step == this.fadeInFrame ){
        }
     }

    onTapBack(){
        GameObject.transit = SceneTitle.loadScene;
        this.destroy();
    }
    onTapRetry(){
        GameObject.transit = ScenePlay.loadScene;
        this.destroy();
    }

    onTapFb(){
        window.open( "http://www.facebook.com/share.php?u=https://portal.game.habits.auone.jp/&t=%e7%84%a1%e6%96%99%e3%81%a7%e9%81%8a%e3%81%b9%e3%82%8b%e7%b0%a1%e5%8d%98%e3%82%b2%e3%83%bc%e3%83%a0%ef%bc%81%e3%83%91%e3%82%ba%e3%83%ab%e3%80%81%e3%82%a2%e3%82%af%e3%82%b7%e3%83%a7%e3%83%b3%e3%80%81%e3%82%af%e3%82%a4%e3%82%ba%e3%80%81%e8%84%b3%e3%83%88%e3%83%ac%e3%80%81%e3%82%b9%e3%83%9d%e3%83%bc%e3%83%84%e3%81%aa%e3%81%a9%e3%80%81%e3%81%95%e3%81%be%e3%81%96%e3%81%be%e3%81%aa%e3%82%b8%e3%83%a3%e3%83%b3%e3%83%ab%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%81%8c%e6%ba%80%e8%bc%89%e3%80%82" );
    }
    onTapTw(){
        window.open( "http://twitter.com/share?url=https://portal.game.habits.auone.jp/&text=%e7%84%a1%e6%96%99%e3%81%a7%e9%81%8a%e3%81%b9%e3%82%8b%e7%b0%a1%e5%8d%98%e3%82%b2%e3%83%bc%e3%83%a0%ef%bc%81%e3%83%91%e3%82%ba%e3%83%ab%e3%80%81%e3%82%a2%e3%82%af%e3%82%b7%e3%83%a7%e3%83%b3%e3%80%81%e3%82%af%e3%82%a4%e3%82%ba%e3%80%81%e8%84%b3%e3%83%88%e3%83%ac%e3%80%81%e3%82%b9%e3%83%9d%e3%83%bc%e3%83%84%e3%81%aa%e3%81%a9%e3%80%81%e3%81%95%e3%81%be%e3%81%96%e3%81%be%e3%81%aa%e3%82%b8%e3%83%a3%e3%83%b3%e3%83%ab%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%81%8c%e6%ba%80%e8%bc%89%e3%80%82" );
    }
    onTapLn(){
        window.open( "http://line.me/R/msg/text/?%e7%84%a1%e6%96%99%e3%81%a7%e9%81%8a%e3%81%b9%e3%82%8b%e7%b0%a1%e5%8d%98%e3%82%b2%e3%83%bc%e3%83%a0%ef%bc%81%e3%83%91%e3%82%ba%e3%83%ab%e3%80%81%e3%82%a2%e3%82%af%e3%82%b7%e3%83%a7%e3%83%b3%e3%80%81%e3%82%af%e3%82%a4%e3%82%ba%e3%80%81%e8%84%b3%e3%83%88%e3%83%ac%e3%80%81%e3%82%b9%e3%83%9d%e3%83%bc%e3%83%84%e3%81%aa%e3%81%a9%e3%80%81%e3%81%95%e3%81%be%e3%81%96%e3%81%be%e3%81%aa%e3%82%b8%e3%83%a3%e3%83%b3%e3%83%ab%e3%81%ae%e3%82%b2%e3%83%bc%e3%83%a0%e3%81%8c%e6%ba%80%e8%bc%89%e3%80%82%20https://portal.game.habits.auone.jp/" );
    }
}
