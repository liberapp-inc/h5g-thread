// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PIXEL_PER_METER = 1;
const GAME_AREA_H_PER_W = 1.2;      // fixedWidth 100x120 (width基準)
const THREAD_WIDTH_PER_W = 1/256;
const PLAYER_SPEED_PER_W = 1/180;
const RISE_POWER_PER_W = (1/2000);

const PILLAR_WIDTH_PER_W = 1/32;
const PILLAR_INTER_PER_W = 1/2;
const PILLAR_HOLE_MAX_PW:number = 0.25;
const PILLAR_HOLE_MIN_PW:number = 0.13;

const CAVE_WIDTH_PER_W = 1/2;
const CAVE_INTER_PER_W = CAVE_WIDTH_PER_W * 2;
const CAVE_HOLE_MAX_PW:number = 0.30;
const CAVE_HOLE_MIN_PW:number = 0.13;

const PHYSICS_GROUP_PLAYER = 1<<1;
const PHYSICS_GROUP_OBSTACLE = 1<<2;
const PHYSICS_GRAVITY_PER_H = 0.01;

const SAVE_KEY_BESTSCORE = "thread-bestScore";

const BACK_COLOR = 0x303030;    // index.htmlで設定
const FONT_COLOR = 0xffffff;
const FONT_COLOR2 = 0x000000;
const PLAYER_COLOR = 0xe0e0e0;
const OBJECT_COLOR = 0xc0c0c0;

class Game {

    static loadSceneGamePlay() {
        PhysicsObject.deltaScale = 1;
        new Player( Util.w(0.3), Util.h(0.5) );
        new Wave();
        new StartMessage();
        new BackGround();
        new Score();
    }
}
