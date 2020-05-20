// Liberapp 2020 - Tahiti Katagai
// タイトルシーン

class SceneTitle extends GameObject{

    texts:egret.TextField[] = [];
    startButton:Button = null;
    levelButton:Button = null;
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

        // エンドレスモード
        this.startButton = new Button("スタート", Util.width/16, BACK_COLOR, 0.50, 0.70, 0.7, 0.12, FONT_COLOR, 1.0, this.onTapStart );
        // レベルモード
        // let level = Util.getSaveDataNumber( SaveKeyNextLevel, 1 );
        // this.levelButton = new Button("レベル"+level, Util.width/16, BACK_COLOR, 0.50, 0.70, 0.7, 0.12, FONT_COLOR, 1.0, this.onTapStart );

        this.texts.forEach( text =>{ if( text ){ GameObject.baseDisplay.addChild( text ); } });
    }

	onDestroy(){
        this.texts.forEach( text =>{ if( text ){ text.parent.removeChild( text ); } });
        this.texts = null;
    }

	update(){
	}

    onTapStart(){
        GameObject.transit = ScenePlay.loadScene;
        Game.level = 0;
    }
    onTapLevel(){
        GameObject.transit = ScenePlay.loadScene;
        Game.level = Util.getSaveDataNumber( SaveKeyNextLevel, 1 );
    }

}