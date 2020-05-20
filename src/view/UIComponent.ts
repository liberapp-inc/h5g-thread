/*
//UILayerに描画する用のコンポーネント
abstract class UIComponent extends GameObject{

    static components: UIComponent[] = [];

    component: egret.DisplayObjectContainer = null;

    constructor(x : number, y : number, width : number, height : number){
        super();
        this.setCompornent(x,y,width,height);
    }

    setCompornent(x : number, y : number, width : number, height : number){

        this.component = new egret.DisplayObjectContainer();
        this.component.x = x;
        this.component.y = y;
        this.component.width = width;
        this.component.height = height;
        UILayer.display.addChild(this.component);
    }

    //オーバーライド
    protected delete(){

        this.addDestroyMethod();

        if( this.shapes && this.component){
            this.shapes.forEach(s => {
                this.component.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        if(this.component){
            Util.remove(UILayer.display, this.component);
        }
        const newArray : GameObject[] = GameObject.objects.filter(obj => obj.destroyFlag !== true);
        GameObject.objects = newArray;
    }

}
*/