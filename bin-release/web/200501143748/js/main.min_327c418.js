function rand(){return globalRandom.v()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(){return globalRandom.bool()}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,o){return new(i||(i=Promise))(function(n,r){function a(t){try{l(o.next(t))}catch(e){r(e)}}function s(t){try{l(o["throw"](t))}catch(e){r(e)}}function l(t){t.done?n(t.value):new i(function(e){e(t.value)}).then(a,s)}l((o=o.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return o([t,e])}}function o(i){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(a=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,r=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){l=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){l.label=i[1];break}if(6===i[0]&&l.label<a[1]){l.label=a[1],a=i;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(i);break}a[2]&&l.ops.pop(),l.trys.pop();continue}i=e.call(t,l)}catch(o){i=[6,o],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,r,a,s,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return Object.defineProperty(t.prototype,"X",{get:function(){return this.display.x},set:function(t){this.display.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"Y",{get:function(){return this.display.y},set:function(t){this.display.y=t},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.baseDisplay=e,t.gameDisplay=new egret.DisplayObjectContainer,t.baseDisplay.addChild(t.gameDisplay)},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(this.display.parent.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.update=function(){if(this.display){var t=this.body,e=this.display;e.x=this.px,e.y=this.py,e.rotation=180*t.angle/Math.PI}this.fixedUpdate()},e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,e.height*PHYSICS_GRAVITY_PER_H],e.world.defaultContactMaterial.friction=1,e.lastTime=Date.now(),e.deltaScale=1},e.progress=function(){var t=Date.now(),i=(t-this.lastTime)*this.deltaScale;this.lastTime=t,i>0&&e.world.step(1/60*this.deltaScale,i,4)},e.prototype._delete=function(){this.onDestroy(),this.body&&(e.world.removeBody(this.body),this.body.displays=[],this.body=null),this.display&&(GameObject.gameDisplay.removeChild(this.display),this.display=null)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.deltaScale=1,e}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var PType;!function(t){t[t.Normal=0]="Normal",t[t.Up=1]="Up",t[t.Down=2]="Down",t[t.Open=3]="Open",t[t.Close=4]="Close",t[t.UC=5]="UC",t[t.DC=6]="DC",t[t.UD=7]="UD",t[t.DU=8]="DU",t[t.Narrow=9]="Narrow",t[t.Total=10]="Total"}(PType||(PType={}));var Pillar=function(t){function e(e,i,o,n,r,a){var s=t.call(this)||this;return s.pass=!1,s.x=e,s.y=i,s.w=o,s.h=n,s.color=r,s.point=a,s.setDisplay(e,i),s.setBody(e,i),s.display.rotation=180*s.body.angle/Math.PI,Camera2D.transform(s.display),s}return __extends(e,t),e.newPillar=function(t,i,o,n){var r=Util.w(PILLAR_WIDTH_PER_W),a=Util.w(GAME_AREA_H_PER_W),s=Util.w(Util.lerp(PILLAR_HOLE_MAX_PW,PILLAR_HOLE_MIN_PW,n)),l=.5*(s+a),c=new e(t,i-l,r,a,OBJECT_COLOR,1),p=new e(t,i+l,r,a,OBJECT_COLOR,0),h=Util.w(.25),y=1e3;switch(o){case PType.Normal:break;case PType.Up:egret.Tween.get(c,{loop:!1}).to({y:c.y-h},y),egret.Tween.get(p,{loop:!1}).to({y:p.y-h},y);break;case PType.Down:egret.Tween.get(c,{loop:!1}).to({y:c.y+h},y),egret.Tween.get(p,{loop:!1}).to({y:p.y+h},y);break;case PType.Open:egret.Tween.get(c,{loop:!1}).to({y:c.y+h},0).to({y:c.y-0},y),egret.Tween.get(p,{loop:!1}).to({y:p.y-h},0).to({y:p.y-0},y);break;case PType.Close:egret.Tween.get(c,{loop:!1}).to({y:c.y-h},0).to({y:c.y-0},y),egret.Tween.get(p,{loop:!1}).to({y:p.y+h},0).to({y:p.y+0},y);break;case PType.UC:egret.Tween.get(c,{loop:!1}).to({y:c.y-h},.75*y),egret.Tween.get(p,{loop:!1}).to({y:p.y-h},1.5*y);break;case PType.DC:egret.Tween.get(c,{loop:!1}).to({y:c.y+h},1.5*y),egret.Tween.get(p,{loop:!1}).to({y:p.y+h},.75*y);break;case PType.UD:egret.Tween.get(c,{loop:!0}).to({y:c.y-h},y).to({y:c.y+0},y),egret.Tween.get(p,{loop:!0}).to({y:p.y-h},y).to({y:p.y+0},y);break;case PType.DU:egret.Tween.get(c,{loop:!0}).to({y:c.y+h},y).to({y:c.y+0},y),egret.Tween.get(p,{loop:!0}).to({y:p.y+h},y).to({y:p.y+0},y);break;case PType.Narrow:egret.Tween.get(c,{loop:!1}).to({y:c.y+s/4},0),egret.Tween.get(p,{loop:!1}).to({y:p.y-s/4},0)}},e.prototype.setDisplay=function(t,e){this.display&&GameObject.gameDisplay.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.gameDisplay.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.beginFill(this.color),i.graphics.drawRect(-.5*this.w,-.5*this.h,this.w,this.h),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC}),this.body.addShape(new p2.Box({width:this.p2m(this.w),height:this.p2m(this.h),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER}),[0,0],0),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.update=function(){this.fixedUpdate()},e.prototype.fixedUpdate=function(){this.display.x=this.px=this.x,this.display.y=this.py=this.y,Camera2D.transform(this.display),0==this.pass&&this.x<Player.I.x&&(this.pass=!0,Score.I.addPoint(this.point),egret.Tween.removeTweens(this)),this.display.x+this.w<0&&this.destroy()},e}(PhysicsObject);__reflect(Pillar.prototype,"Pillar");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e,i){void 0===i&&(i=1),e.x=t.transX(e.x),e.y=t.transY(e.y),e.scaleX=e.scaleY=t.scale*i},t.transX=function(e){return(e-t.x)*t.scale},t.transY=function(e){return(e-t.y)*t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return new SdkUtil,[4,SdkUtil.I.init()];case 1:return t.sent(),Util.initial(this),GameObject.initial(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this),[2]}})})},e.prototype.tickLoop=function(t){return PhysicsObject.progress(),GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Player=function(t){function e(i,o){var n=t.call(this)||this;n.xyListMax=32,n.xyListStep=2,n.xyIndex=0,n.state=n.stateNone,e.I=n,n.radius=Util.w(THREAD_WIDTH_PER_W),n.x=i,n.y=o,n.vx=Util.w(PLAYER_SPEED_PER_W),n.vy=0,n.xyList=[];for(var r=0;r<n.xyListMax;r++)n.xyList[r]=[],n.xyList[r][0]=i-r*n.vx*n.xyListStep,n.xyList[r][1]=o;return n.scrollCamera(),n.setDisplay(i,o),n.setBody(i,o),n.button=new Button(null,0,0,.5,.5,1,1,0,0,null),n}return __extends(e,t),e.prototype.onDestroy=function(){this.button.destroy(),e.I=null},e.prototype.setDisplay=function(t,e){null==this.display&&(this.display=new egret.Shape,GameObject.gameDisplay.addChild(this.display));var i=this.display;i.graphics.clear(),this.xyIndex-=1/this.xyListStep,this.xyIndex<0&&(this.xyIndex+=this.xyListMax);var o=Math.floor(this.xyIndex);this.xyList[o][0]=t,this.xyList[o][1]=e,i.x=0,i.y=0,i.graphics.lineStyle(6,PLAYER_COLOR,1,!1,null,null,egret.JointStyle.MITER),i.graphics.moveTo(Camera2D.transX(this.xyList[o][0]),Camera2D.transY(this.xyList[o][1])),o=++o%this.xyListMax;for(var n=1;n<this.xyListMax;n++)i.graphics.lineTo(Camera2D.transX(this.xyList[o][0]),Camera2D.transY(this.xyList[o][1])),o=++o%this.xyListMax},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:.1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Circle({radius:this.p2m(this.radius),collisionGroup:PHYSICS_GROUP_PLAYER,collisionMask:PHYSICS_GROUP_OBSTACLE})),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body),PhysicsObject.world.on("beginContact",this.beginContact,this)},e.prototype.beginContact=function(t){var e=t.bodyA,i=t.bodyB;(e==this.body||i==this.body)&&this.miss()},e.prototype.update=function(){this.fixedUpdate()},e.prototype.fixedUpdate=function(){this.state()},e.prototype.scrollCamera=function(){Camera2D.x=this.x-Util.w(1/3),Camera2D.y=0},e.prototype.setStateNone=function(){this.state=this.stateNone},e.prototype.stateNone=function(){},e.prototype.setStateMove=function(){this.state=this.stateMove},e.prototype.stateMove=function(){this.vy*=.97,this.button.touch?this.vy-=Util.w(RISE_POWER_PER_W):this.vy+=Util.w(RISE_POWER_PER_W),this.x+=this.vx,this.y+=this.vy,this.px=this.x,this.py=this.y,this.scrollCamera(),this.setDisplay(this.px,this.py),this.checkOut()},e.prototype.checkOut=function(){Math.pow(this.py-Util.h(.5),2)>Math.pow(Util.w(.5*GAME_AREA_H_PER_W),2)&&this.miss()},e.prototype.miss=function(){this.state!=this.stateNone&&(new GameOver,PhysicsObject.deltaScale=.1,egret.Tween.removeAllTweens(),this.state=this.stateNone)},e.I=null,e}(PhysicsObject);__reflect(Player.prototype,"Player");var Wave=function(t){function e(){var i=t.call(this)||this;return i.mode=0,i.count=0,i.modeCount=10,e.hardRate=0,Cave.prevPy0=Util.h(.5)-Util.w(.3*GAME_AREA_H_PER_W),Cave.prevPy1=Util.h(.5)+Util.w(.3*GAME_AREA_H_PER_W),i.waveX=Util.w(1),i}return __extends(e,t),e.prototype.update=function(){Player.I.state!=Player.I.stateNone&&Player.I.x+Util.w(2/3)>=this.waveX&&(0==this.mode?this.newPillar():this.newCave(),--this.modeCount<=0&&(0==this.mode?this.modeCount=randI(2,8):(this.modeCount=randI(4,16),this.waveX+=Util.w(PILLAR_INTER_PER_W)),this.mode=this.mode+1&1),this.count++,e.hardRate=Util.clamp(this.count/50,0,1))},e.prototype.newPillar=function(){var t=this.waveX,i=Util.h(.5)+Util.w(randF(-.3,.3)*Util.lerp(.7,1,e.hardRate)),o=PType.Normal;rand()<.8*e.hardRate&&(o=randI(PType.Normal,PType.Total)),Pillar.newPillar(t,i,o,e.hardRate),this.waveX+=Util.w(PILLAR_INTER_PER_W)},e.prototype.newCave=function(){var t=this.waveX,i=Util.h(.5)+Util.w(randF(-.45,.45)*Util.lerp(.7,1,e.hardRate));Cave.newCave(t,i,e.hardRate),this.waveX+=Util.w(2*CAVE_WIDTH_PER_W)},e}(GameObject);__reflect(Wave.prototype,"Wave");var Button=function(t){function e(e,i,o,n,r,a,s,l,c,p){var h=t.call(this)||this;h.text=null,h.onTap=null,h.press=!1,h.touch=!1,h.x=0,h.y=0;var y=new egret.Shape;GameObject.gameDisplay.addChild(y),y.graphics.beginFill(l,c);var u=a*Util.width,d=s*Util.height;return y.graphics.drawRoundRect(-.5*u,-.5*d,u,d,.2*u),y.graphics.endFill(),y.touchEnabled=!0,y.x=n*Util.width,y.y=r*Util.height,h.display=y,e&&(h.text=Util.newTextField(e,i,o,n,r,!0,!1),GameObject.gameDisplay.addChild(h.text)),h.onTap=p,h.onTap&&h.display.addEventListener(egret.TouchEvent.TOUCH_TAP,h.onTap,h),h.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,h.touchBegin,h),h.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,h.touchMove,h),h.display.addEventListener(egret.TouchEvent.TOUCH_END,h.touchEnd,h),h}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.gameDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.gameDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.gameDisplay.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.gameDisplay.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var BackGround=function(t){function e(){var e=t.call(this)||this;return e.setShape(),e}return __extends(e,t),e.prototype.setShape=function(){var t=new egret.Shape;this.display&&GameObject.gameDisplay.removeChild(this.display),this.display=t,GameObject.gameDisplay.addChild(this.display),t.graphics.beginFill(OBJECT_COLOR,1),t.graphics.drawRect(0,0,Util.width,Util.h(.5)-Util.w(.5*GAME_AREA_H_PER_W)),t.graphics.drawRect(0,Util.h(.5)+Util.w(.5*GAME_AREA_H_PER_W),Util.width,Util.height),t.graphics.endFill()},e.prototype.update=function(){},e}(GameObject);__reflect(BackGround.prototype,"BackGround");var Cave=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.newCave=function(t,i,o){var n=Util.w(CAVE_WIDTH_PER_W),r=Util.w(GAME_AREA_H_PER_W),a=Util.w(Util.lerp(CAVE_HOLE_MAX_PW,CAVE_HOLE_MIN_PW,o))*randF(.8,1.2),s=.5*(a+r),l=i-s,c=i+s,p=Math.min(l,e.prevPy0),h=Math.max(c,e.prevPy1),y=Util.w(1/256);new Pillar(t+.5*n,p,n+y,r,OBJECT_COLOR,1),new Pillar(t+.5*n,h,n+y,r,OBJECT_COLOR,0),new Pillar(t+1.5*n,l,n+y,r,OBJECT_COLOR,1),new Pillar(t+1.5*n,c,n+y,r,OBJECT_COLOR,0),e.prevPy0=l,e.prevPy1=c},e}(Pillar);__reflect(Cave.prototype,"Cave");var SaveKeyBestScore="thread-bestScore",DefaultBestScore=10,PIXEL_PER_METER=1,GAME_AREA_H_PER_W=1.2,THREAD_WIDTH_PER_W=1/256,PLAYER_SPEED_PER_W=1/180,RISE_POWER_PER_W=5e-4,PILLAR_WIDTH_PER_W=1/32,PILLAR_INTER_PER_W=.5,PILLAR_HOLE_MAX_PW=.25,PILLAR_HOLE_MIN_PW=.13,CAVE_WIDTH_PER_W=.5,CAVE_INTER_PER_W=2*CAVE_WIDTH_PER_W,CAVE_HOLE_MAX_PW=.3,CAVE_HOLE_MIN_PW=.13,PHYSICS_GROUP_PLAYER=2,PHYSICS_GROUP_OBSTACLE=4,PHYSICS_GRAVITY_PER_H=.01,BACK_COLOR=3158064,FONT_COLOR=16777215,FONT_COLOR2=0,PLAYER_COLOR=14737632,OBJECT_COLOR=12632256,Game=function(){function t(){}return t.loadSceneGamePlay=function(){PhysicsObject.deltaScale=1,new Player(Util.w(.3),Util.h(.5)),new Wave,new StartMessage,new BackGround,new Score},t}();__reflect(Game.prototype,"Game");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(){return 0!=(1&this.next())},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=1073741823,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,BoardName="board1",AppKey=null,AppToken="",AppUser="",SdkUtil=function(){function t(){t.I=this}return t.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){var e,i,o,n,r,a;return __generator(this,function(s){switch(s.label){case 0:t.sdk=window.LiberappSdk,s.label=1;case 1:return s.trys.push([1,13,,14]),AppKey?[4,t.sdk.enableDebug({applicationKey:AppKey,debugSigninOptions:{accessToken:AppToken,userAkey:AppUser}})]:[3,3];case 2:s.sent(),s.label=3;case 3:return[4,t.sdk.initializeAsync()];case 4:return s.sent(),[4,t.sdk.startGameAsync()];case 5:return s.sent(),t.sdk.player?(console.log("ID",t.sdk.player.getID()),console.log("name",t.sdk.player.getName()),console.log("photo",t.sdk.player.getPhoto())):console.log("GUEST"),[4,t.sdk.getLeaderboardAsync(BoardName)];case 6:return e=s.sent(),[4,e.getEntryCountAsync()];case 7:return i=s.sent(),console.log("Count",i),o=Util.getSaveDataNumber(SaveKeyBestScore,DefaultBestScore),console.log("localScore = "+o),n=null,r=DefaultBestScore,i>0?[4,e.getPlayerEntryAsync()]:[3,9];case 8:n=s.sent(),n&&(r=n.getScore(),console.log("serverScore = "+r)),s.label=9;case 9:return null!=n?[3,11]:[4,e.setScoreAsync(o)];case 10:return n=s.sent(),r=n.getScore(),console.log("serverScore updated "+r),[3,12];case 11:(o==DefaultBestScore||r>o)&&(Util.setSaveDataNumber(SaveKeyBestScore,r),console.log("localScore updated "+r)),s.label=12;case 12:return[3,14];case 13:return a=s.sent(),console.log(a),[3,14];case 14:return[2]}})})},t.prototype.sendScore=function(e){return __awaiter(this,void 0,void 0,function(){var i,o,n,r;return __generator(this,function(a){switch(a.label){case 0:return a.trys.push([0,5,,6]),[4,t.sdk.getLeaderboardAsync(BoardName)];case 1:return i=a.sent(),[4,i.getPlayerEntryAsync()];case 2:return o=a.sent(),n=o.getScore(),null==n||e>n?[4,i.setScoreAsync(e)]:[3,4];case 3:n=a.sent(),a.label=4;case 4:return[3,6];case 5:return r=a.sent(),console.log(r),[3,6];case 6:return[2]}})})},t.I=null,t.sdk=null,t}();__reflect(SdkUtil.prototype,"SdkUtil");var Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.initial=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t["break"]=function(t,e){t&&console.log(e)},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.clamp01=function(e){return t.clamp(e,0,1)},t.lerp=function(t,e,i){return t+(e-t)*i},t.deltaAngle=function(t){var e=(t+Math.PI)/(2*Math.PI);return e=65536*e&65535,e=e/65536*Math.PI*2-Math.PI},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var o=1-i,n=((16711680&t)*o+(16711680&e)*i&16711680)+((65280&t)*o+(65280&e)*i&65280)+((255&t)*o+(255&e)*i&255);return n},t.newTextField=function(e,i,o,n,r,a,s){var l=new egret.TextField;return l.text=e,l.bold=a,l.size=i,l.textColor=o,s?(l.x=(t.width-l.width)*n,l.y=(t.height-l.height)*r):(l.x=t.width*n-.5*l.width,l.y=t.height*r-.5*l.height),l},t.newShadowText=function(t,e,i){void 0===i&&(i=1.5);var o=new egret.TextField;return o.text=t.text,o.bold=t.bold,o.size=t.size,o.textColor=e,o.x=t.x+i,o.y=t.y+i,o.alpha=.5,o},t.newBitmap=function(t,e,i,o){var n=new egret.Bitmap;return n.texture=RES.getRes(t),GameObject.baseDisplay.addChild(n),n.x=e,n.y=i,n.anchorOffsetX=.5*n.width,n.anchorOffsetY=.5*n.height,n.scaleX=n.scaleY=o,n},t.getSaveDataNumber=function(t,e){var i=egret.localStorage.getItem(t),o=e;return null!=i&&(o=parseInt(i)),o},t.setSaveDataNumber=function(t,e){egret.localStorage.setItem(t,""+e)},t.getSaveDataString=function(t,e){var i=egret.localStorage.getItem(t);return null==i&&(i=e),i},t.setSaveDataString=function(t,e){egret.localStorage.setItem(t,e)},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.retryButton=null,e.step=0,e.fadeInFrame=64,e.texts[0]=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/12,FONT_COLOR,.5,.35,!0,!1),egret.Tween.get(e.texts[0],{loop:!1}).to({alpha:0},0).to({alpha:1},1e3),GameObject.gameDisplay.addChild(e.texts[0]),Score.I.point>Score.I.bestScore&&(Util.setSaveDataNumber(SaveKeyBestScore,Score.I.point),SdkUtil.I.sendScore(Score.I.point)),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.gameDisplay.removeChild(t)}),this.texts=null},e.prototype.update=function(){this.step++,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.75,.4,.1,FONT_COLOR,1,this.onTapRetry),Score.I.point>Score.I.bestScore&&(this.texts[1]=Util.newTextField("NEW RECORD!",Util.width/13,FONT_COLOR,.5,.45,!0,!1),egret.Tween.get(this.texts[1],{loop:!0}).to({alpha:0},500).to({alpha:1},500),GameObject.gameDisplay.addChild(this.texts[1])))},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/16,FONT_COLOR2,.5,0,!0,!0),GameObject.gameDisplay.addChild(i.text);var o=Util.getSaveDataNumber(SaveKeyBestScore,DefaultBestScore);return i.bestScore=o,i.textBest=Util.newTextField("BEST:"+o,Util.width/24,FONT_COLOR2,1,0,!0,!0),GameObject.gameDisplay.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.gameDisplay.removeChild(this.text),this.text=null,GameObject.gameDisplay.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.point+=t,this.text.text=""+this.point.toFixed(),this.bestScore<this.point&&(this.textBest.text="BEST:"+this.point.toFixed())},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.texts[0]=Util.newTextField("糸の冒険",Util.width/12,FONT_COLOR,.5,.25,!0,!1),e.texts[1]=Util.newTextField("タッチ中は上昇",Util.width/19,FONT_COLOR,.5,.35,!0,!1),e.texts[2]=Util.newTextField("ぶつからないように進め",Util.width/19,FONT_COLOR,.5,.4,!0,!1),e.texts.forEach(function(t){GameObject.gameDisplay.addChild(t)}),GameObject.gameDisplay.once(egret.TouchEvent.TOUCH_BEGIN,e.tap,e),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.gameDisplay.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.setStateMove(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");