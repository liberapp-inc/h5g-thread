// Liberapp 2019 - Tahiti Katagai
// 障害物　洞窟通路

class Cave extends Pillar{

    static prevPy0;
    static prevPy1;

    // 洞窟 通路の座標を指定。前回の通路とつなぐ
    // ピラー２回分を一度に配置
    static newCave( px:number, py:number, lv:number, holeRate:number ){
        const w = Util.w( CAVE_WIDTH_PER_W );
        const h = Util.w( GAME_AREA_H_PER_W );
        const hole = Util.w( Util.lerp(CAVE_HOLE_MAX_PW, CAVE_HOLE_MIN_PW, lv) ) * holeRate;
        const yofs = (hole + h)*0.5;
        const py0 = py-yofs;
        const py1 = py+yofs;
        
        const head = Math.min( py0, Cave.prevPy0 );
        const foot = Math.max( py1, Cave.prevPy1 );
        const wadj = Util.w(1/256);

        const effect = false;
        new Pillar( px+w*0.5, head, w+wadj, h, Game.oColor(), 1, effect );
        new Pillar( px+w*0.5, foot, w+wadj, h, Game.oColor(), 0, effect );
        new Pillar( px+w*1.5,  py0, w+wadj, h, Game.oColor(), 1, effect );
        new Pillar( px+w*1.5,  py1, w+wadj, h, Game.oColor(), 0, effect );

        Cave.prevPy0 = py0;
        Cave.prevPy1 = py1;
    }
}
