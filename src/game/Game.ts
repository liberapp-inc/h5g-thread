// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const SaveKeyBestScore = "thread-bestScore";
const DefaultBestScore = 10;

const PIXEL_PER_METER = 1;
const GAME_AREA_H_PER_W = 1.2;      // fixedWidth 100x120 (width基準)
const THREAD_WIDTH_PER_W = 1/256;
const PLAYER_SPEED_PER_W = 1/180;
const RISE_POWER_PER_W = (1/2000);
const MAX_SPEED_CO = 2.0;
const MIN_SPEED_CO = 1.4;

const PILLAR_WIDTH_PER_W = 1/32;
const PILLAR_INTER_PER_W = 1/2;
const PILLAR_HOLE_MAX_PW:number = 0.25;
const PILLAR_HOLE_MIN_PW:number = 0.13;

const CAVE_WIDTH_PER_W = 1/2;
const CAVE_INTER_PER_W = CAVE_WIDTH_PER_W * 2;
const CAVE_HOLE_MAX_PW:number = 0.30;
const CAVE_HOLE_MIN_PW:number = 0.13;

const BALL_MIN_RADIUS_PER_W = 1/24;
const BALL_MAX_RADIUS_PER_W = 1/5;

const BOX_MIN_SIZE_PER_W = 1/16;
const BOX_MAX_SIZE_PER_W = 1/3;

const SLOPE_MIN_SIZE_PER_W = 0.8;
const SLOPE_MAX_SIZE_PER_W = 1.06;

const COIN_RADIUS_PER_W = 1/64;

const PHYSICS_GROUP_PLAYER = 1<<1;
const PHYSICS_GROUP_OBSTACLE = 1<<2;
const PHYSICS_GRAVITY_PER_H = 0;

const PLAYER_COLOR = 0xe0e0e0;
const FONT_COLOR = 0xffffff;
const FONT_COLOR2 = 0x303030;
const COIN_COLOR = 0xff80FF;
const EFFECT_COLOR = 0xffffff;

const BackColors:number[] = [ 0x303030, 0x283AE0, 0xBE2D4F, 0x433E40, 0x2E347A, 0x2E4548 ];
const WallColors:number[] = [ 0xc0c0c0, 0xEDCA47, 0x68D4AA, 0xA8926A, 0xD1AA5C, 0xB3BEA6 ];

class Game {
    public static level:number = 0;

    public static bColor() : number {
        return BackColors[ Game.level % BackColors.length ];
    }
    public static oColor() : number {
        return WallColors[ Game.level % WallColors.length ];
    }
}
