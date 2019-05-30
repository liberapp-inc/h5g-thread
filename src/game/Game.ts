// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 1;
const THREAD_WIDTH_PER_W = 1/256;
const OBJ_BLOCK_SIZE_PER_W = 1 / 16;
const OBJ_CIRCLE_SIZE_PER_W = 1 / 16;

const RISE_POWER_PER_W = 0.3;
const PHYSICS_GROUP_PLAYER = 1<<1;
const PHYSICS_GROUP_OBJECT = 1<<2;

const SAVE_KEY_BESTSCORE = "thread-bestScore";  // + stage number

const BACK_COLOR = 0xfff0f0;    // index.htmlで設定
const FONT_COLOR = 0x400030;
const PLAYER_COLOR = 0x206080;
const OBJECT_COLOR  = 0x60FFFF;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Score();
        new Player( Util.w(0.3), Util.h(0.5) );
        new Wave();
        new StartMessage();
    }
}
