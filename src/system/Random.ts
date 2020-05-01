// Liberapp 2020 - Tahiti Katagai
// ランダム XorShift
// シード指定で乱数周期を再現できる

// global
function randInt():number { return globalRandom.int(); }                                // 0 ~ max (整数)
function rand01():number { return globalRandom.f01(); }                                 // 0以上 1未満
function randF( min:number, max:number ):number { return globalRandom.f(min, max); }    // min以上 max未満
function randI( min:number, max:number ):number { return globalRandom.i(min, max); }    // min以上 max未満（整数）
function randBool( rate:number=0.5 ):boolean { return globalRandom.bool(rate); }

class Random {

    int():number{ return (this.next() & Random.max); }                       // 0 ~ max (整数)
    f01():number{ return this.int() / (Random.max + 1); }                    // 0以上 1未満
    f(min:number, max:number) { return min + this.f01() * (max - min); }    // min以上 max未満
    i(min:number, max:number) { return Math.floor( this.f(min, max) ); }    // min以上 max未満（整数）
    bool( rate:number=0.5 ):boolean { return ( this.f01() < rate ); }

    static readonly max:number = 0x3FFFffff;
    
    // XOR Shift
    
    private x:number = 123456789;
    private y:number = 362436069;
    private z:number = 521288629;
    public  w:number;

    constructor(seed = Math.floor( Math.random()*Random.max )) {
        this.w = seed;
    }

    private next() {
        let t;
        t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
    }
}

let globalRandom = new Random(); // singleton instance
