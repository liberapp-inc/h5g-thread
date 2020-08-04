// Thread
// Liberapp 2019 - Tahiti Katagai

const SDK = false;
const Muteki = false;

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private async addToStage() {

        Util.initial( this );
        GameObject.initial( this.stage );
        PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();
        if( SDK ){
            await Social.init();
        }
        SceneTitle.loadScene();
        egret.startTick(this.tickLoop, this);
        this.initOrientationEvent();

        // ad
        let elem = document.getElementById("liberapp_ad");
        elem.innerHTML = '<div id ="liberapp_ad">りべらぷAD</div>';
    }

    tickLoop(timeStamp:number):boolean{
        if( this.pause )
            return false;
        PhysicsObject.progress();
        GameObject.process();
        return false;
    }

    //---------------------------------------------------
    private text: egret.TextField;
    private fill: egret.Shape;
    private pause:boolean;
    public initOrientationEvent() {
        this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
        this.onOrientationChange(null);
    }
    private onOrientationChange(e: egret.StageOrientationEvent): void {
        const w = this.stage.stageWidth;
        const h = this.stage.stageHeight;
        if( w < h ){
            this.pause = false;
            if( this.text ){
                this.text.parent.removeChild( this.text );
                this.fill.parent.removeChild( this.fill );
            }
        }else{
            this.pause = true;

            this.fill = new egret.Shape();
            GameObject.baseDisplay.addChild(this.fill);
            this.fill.graphics.lineStyle( 0 );
            this.fill.graphics.beginFill( 0x000000, 0.9 );
            this.fill.graphics.drawRect( 0, 0,  w, h );
            this.fill.graphics.endFill();

            this.text = new egret.TextField();
            this.text.text = " 画面を縦にして\nお楽しみください";
            this.text.x = (w - this.text.width)  * 0.5;
            this.text.y = (h - this.text.height) * 0.5;
            GameObject.baseDisplay.addChild( this.text );

            egret.log(this.text.text);
        }
    }
}

