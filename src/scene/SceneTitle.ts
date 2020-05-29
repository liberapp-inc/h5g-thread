// Liberapp 2020 - Tahiti Katagai
// タイトルシーン

const LevelSelect = true;

class SceneTitle extends GameObject{

    texts:egret.TextField[] = [];
    startButton:Button = null;
    levelButton:Button = null;
    levelButtonP:Button = null;
    levelButtonM:Button = null;
    settingsButton:Button = null;

    static loadScene() {
        PhysicsObject.deltaScale = 1;
        new Player( Util.w(0.3), Util.h(0.5) );
        // new Wave( 0 );
        new BackGround();
        new Score();

        new SceneTitle();
    }

    constructor() {
        super();

        this.texts[0] = Util.newTextField("糸の冒険", Util.width / 12, FONT_COLOR, 0.5, 0.25, true, false);
        // this.texts[1] = Util.newTextField("タッチ中は上昇", Util.width / 19, FONT_COLOR, 0.5, 0.35, true, false);
        // this.texts[2] = Util.newTextField("ぶつからないように進め", Util.width / 19, FONT_COLOR, 0.5, 0.4, true, false);

        let bestScore = Util.getSaveDataNumber( SaveKeyBestScore, DefaultBestScore );
        this.texts[3] = Util.newTextField("自己ベスト:"+bestScore+"", Util.width / 16, FONT_COLOR, 0.5, 0.35, true, true);

        if( !LevelSelect ){
            // エンドレスモードのみ
            this.startButton = new Button("スタート", Util.width/16, FONT_COLOR2, 0.50, 0.65, 0.6, 0.1, FONT_COLOR, 1.0, -1, true, (btn:Button)=>this.onTapStart(btn), this );
        }else{
            // エンドレスモード
            this.startButton = new Button("エンドレス", Util.width/16, FONT_COLOR2, 0.50, 0.65, 0.5, 0.1, FONT_COLOR, 1.0, -1, true, (btn:Button)=>this.onTapStart(btn), this );
            // レベルモード
            if( Game.level == 0 ){
                Game.level = Util.getSaveDataNumber( SaveKeyNextLevel, 1 );
            }
            this.levelButton = new Button("レベル"+Game.level, Util.width/16, FONT_COLOR2, 0.50, 0.80, 0.5, 0.1, FONT_COLOR, 1.0, -1, true, (btn:Button)=>this.onTapLevel(btn), this );
            this.levelButtonP = new Button("+", Util.width/16, FONT_COLOR2, 0.85, 0.80, 0.10, 0.07, FONT_COLOR, 1.0, -1, true, (btn:Button)=>this.onTapLevelP(btn), this );
            this.levelButtonM = new Button("-", Util.width/16, FONT_COLOR2, 0.15, 0.80, 0.10, 0.07, FONT_COLOR, 1.0, -1, true, (btn:Button)=>this.onTapLevelM(btn), this );
        }

        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });
    }

	onDestroy(){
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

	update(){
	}

    onTapStart( btn:Button ){
        GameObject.transit = ScenePlay.loadScene;
        Game.level = 0;
    }
    onTapLevel( btn:Button ){
        GameObject.transit = ScenePlay.loadScene;
    }
    onTapLevelP( btn:Button ){
        Game.level = Util.clamp( Game.level + 1, 1, Util.getSaveDataNumber( SaveKeyNextLevel, 1 ) );
        this.levelButton.text.text = "レベル" + Game.level;
    }
    onTapLevelM( btn:Button ){
        Game.level = Util.clamp( Game.level - 1, 1, Util.getSaveDataNumber( SaveKeyNextLevel, 1 ) );
        this.levelButton.text.text = "レベル" + Game.level;
    }
}