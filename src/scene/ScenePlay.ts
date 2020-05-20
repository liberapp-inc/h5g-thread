// Liberapp 2020 - Tahiti Katagai
// プレイシーン

class ScenePlay extends GameObject{

    static loadScene() {
        PhysicsObject.deltaScale = 1;
        new Player( Util.w(0.3), Util.h(0.5) );
        new Wave( Game.level );
        new StartMessage();
        new BackGround();
        new Score();
    }

    update(){
    }
}

