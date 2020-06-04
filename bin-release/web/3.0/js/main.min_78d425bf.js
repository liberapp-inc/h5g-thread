function randInt(){return globalRandom["int"]()}function rand01(){return globalRandom.f01()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(t){return void 0===t&&(t=.5),globalRandom.bool(t)}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,o){return new(i||(i=Promise))(function(s,n){function a(t){try{l(o.next(t))}catch(e){n(e)}}function r(t){try{l(o["throw"](t))}catch(e){n(e)}}function l(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(a,r)}l((o=o.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return o([t,e])}}function o(i){if(s)throw new TypeError("Generator is already executing.");for(;l;)try{if(s=1,n&&(a=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(n,i[1])).done)return a;switch(n=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,n=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){l=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){l.label=i[1];break}if(6===i[0]&&l.label<a[1]){l.label=a[1],a=i;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(i);break}a[2]&&l.ops.pop(),l.trys.pop();continue}i=e.call(t,l)}catch(o){i=[6,o],n=0}finally{s=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var s,n,a,r,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r},__assign=this&&this.__assign||Object.assign||function(t){for(var e,i=1,o=arguments.length;o>i;i++){e=arguments[i];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return Object.defineProperty(t.prototype,"X",{get:function(){return this.display.x},set:function(t){this.display.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"Y",{get:function(){return this.display.y},set:function(t){this.display.y=t},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.baseDisplay=e,t.gameDisplay=new egret.DisplayObjectContainer,t.baseDisplay.addChild(t.gameDisplay)},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(this.display.parent.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.update=function(){if(this.display){var t=this.body,e=this.display;e.x=this.px,e.y=this.py,e.rotation=180*t.angle/Math.PI}this.fixedUpdate()},e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,e.height*PHYSICS_GRAVITY_PER_H],e.world.defaultContactMaterial.friction=1,e.lastTime=Date.now(),e.deltaScale=1},e.progress=function(){var t=Date.now(),i=(t-this.lastTime)*this.deltaScale;this.lastTime=t,i>0&&e.world.step(1/60*this.deltaScale,i,4)},e.prototype._delete=function(){this.onDestroy(),this.body&&(e.world.removeBody(this.body),this.body.displays=[],this.body=null),this.display&&(GameObject.gameDisplay.removeChild(this.display),this.display=null)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.deltaScale=1,e}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var PType;!function(t){t[t.Normal=0]="Normal",t[t.Up=1]="Up",t[t.Down=2]="Down",t[t.Open=3]="Open",t[t.Close=4]="Close",t[t.UC=5]="UC",t[t.DC=6]="DC",t[t.UD=7]="UD",t[t.DU=8]="DU",t[t.Narrow=9]="Narrow",t[t.Total=10]="Total"}(PType||(PType={}));var Pillar=function(t){function e(e,i,o,s,n,a,r){void 0===r&&(r=!0);var l=t.call(this)||this;return l.effect=!1,l.pass=!1,l.x=e,l.y=i,l.w=o,l.h=s,l.color=n,l.point=a,l.effect=r,l.setDisplay(e,i),l.setBody(e,i),l.display.rotation=180*l.body.angle/Math.PI,Camera2D.transform(l.display),l}return __extends(e,t),e.newPillar=function(t,i,o,s){var n=Util.w(PILLAR_WIDTH_PER_W),a=Util.w(GAME_AREA_H_PER_W),r=Util.w(Util.lerp(PILLAR_HOLE_MAX_PW,PILLAR_HOLE_MIN_PW,s))*Player.speedCo,l=.5*(r+a),h=new e(t,i-l,n,a,OBJECT_COLOR,10),p=new e(t,i+l,n,a,OBJECT_COLOR,0),c=Util.w(.25),d=1e3/Player.speedCo;switch(o){case PType.Normal:break;case PType.Up:egret.Tween.get(h,{loop:!1}).to({y:h.y-c},d),egret.Tween.get(p,{loop:!1}).to({y:p.y-c},d);break;case PType.Down:egret.Tween.get(h,{loop:!1}).to({y:h.y+c},d),egret.Tween.get(p,{loop:!1}).to({y:p.y+c},d);break;case PType.Open:egret.Tween.get(h,{loop:!1}).to({y:h.y+c},0).to({y:h.y-0},d),egret.Tween.get(p,{loop:!1}).to({y:p.y-c},0).to({y:p.y-0},d);break;case PType.Close:egret.Tween.get(h,{loop:!1}).to({y:h.y-c},0).to({y:h.y-0},d),egret.Tween.get(p,{loop:!1}).to({y:p.y+c},0).to({y:p.y+0},d);break;case PType.UC:egret.Tween.get(h,{loop:!1}).to({y:h.y-c},.75*d),egret.Tween.get(p,{loop:!1}).to({y:p.y-c},1.5*d);break;case PType.DC:egret.Tween.get(h,{loop:!1}).to({y:h.y+c},1.5*d),egret.Tween.get(p,{loop:!1}).to({y:p.y+c},.75*d);break;case PType.UD:egret.Tween.get(h,{loop:!0}).to({y:h.y-c},d).to({y:h.y+0},d),egret.Tween.get(p,{loop:!0}).to({y:p.y-c},d).to({y:p.y+0},d);break;case PType.DU:egret.Tween.get(h,{loop:!0}).to({y:h.y+c},d).to({y:h.y+0},d),egret.Tween.get(p,{loop:!0}).to({y:p.y+c},d).to({y:p.y+0},d);break;case PType.Narrow:egret.Tween.get(h,{loop:!1}).to({y:h.y+r/5},0),egret.Tween.get(p,{loop:!1}).to({y:p.y-r/5},0)}},e.prototype.setDisplay=function(t,e){this.display&&GameObject.gameDisplay.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.gameDisplay.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.beginFill(this.color),i.graphics.drawRect(-.5*this.w,-.5*this.h,this.w,this.h),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC}),this.body.addShape(new p2.Box({width:this.p2m(this.w),height:this.p2m(this.h),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER}),[0,0],0),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.update=function(){this.fixedUpdate()},e.prototype.fixedUpdate=function(){this.display.x=this.px=this.x,this.display.y=this.py=this.y,Camera2D.transform(this.display),0==this.pass&&this.x<Player.I.x&&(this.pass=!0,Score.I.addPoint(this.point),egret.Tween.removeTweens(this),this.effect&&new EffectFrame(this.X,this.Y,this.w,this.h,EFFECT_COLOR,-Player.I.vx,0)),this.display.x+this.w<0&&this.destroy()},e}(PhysicsObject);__reflect(Pillar.prototype,"Pillar");var ScenePlay=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.loadScene=function(){PhysicsObject.deltaScale=1,new Player(Util.w(.3),Util.h(.5)),new Wave(Game.level),new StartMessage,new BackGround,new Score},e.prototype.update=function(){},e}(GameObject);__reflect(ScenePlay.prototype,"ScenePlay");var BackGround=function(t){function e(){var e=t.call(this)||this;return e.setShape(),e}return __extends(e,t),e.prototype.setShape=function(){var t=new egret.Shape;this.display&&GameObject.gameDisplay.removeChild(this.display),this.display=t,GameObject.gameDisplay.addChild(this.display),t.graphics.beginFill(OBJECT_COLOR,1),t.graphics.drawRect(0,0,Util.width,Util.h(.5)-Util.w(.5*GAME_AREA_H_PER_W)),t.graphics.drawRect(0,Util.h(.5)+Util.w(.5*GAME_AREA_H_PER_W),Util.width,Util.height),t.graphics.endFill()},e.prototype.update=function(){},e}(GameObject);__reflect(BackGround.prototype,"BackGround");var Ball=function(t){function e(e,i,o,s,n){var a=t.call(this)||this;return a.pass=!1,a.x=e,a.y=i,a.r=o,a.color=s,a.point=n,a.setDisplay(e,i),a.setBody(e,i),a.display.rotation=180*a.body.angle/Math.PI,Camera2D.transform(a.display),a}return __extends(e,t),e.newBall=function(t,i,o,s,n){void 0===n&&(n=2);var a=Util.w(PILLAR_INTER_PER_W),r=Util.w(BALL_MIN_RADIUS_PER_W),l=Util.w(BALL_MAX_RADIUS_PER_W);t+=l;for(var h=1500/Player.speedCo,p=0;n>p;p++){var c=Util.h(.5)+Util.w(GAME_AREA_H_PER_W*s.f(-.5,.5)),d=Util.lerp(r,l,s.f01()*o),y=new e(t+s.f(0,a),c,d,OBJECT_COLOR,3);if(s.bool(.25*i)){var u=s.f(0,Math.PI),f=Util.w(.25)*Math.cos(u),_=Util.w(.25)*Math.sin(u);s.bool(.5*Wave.hardRate)?egret.Tween.get(y,{loop:!0}).to({y:y.y+_,x:y.x+f},h).to({y:y.y,x:y.x},h):s.bool()&&egret.Tween.get(y,{loop:!1}).to({y:y.y+_,x:y.x+f},h)}}},e.prototype.setDisplay=function(t,e){this.display&&GameObject.gameDisplay.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.gameDisplay.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.beginFill(this.color),i.graphics.drawCircle(0,0,this.r),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC}),this.body.addShape(new p2.Circle({radius:this.p2m(this.r),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER})),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.update=function(){this.fixedUpdate()},e.prototype.fixedUpdate=function(){this.display.x=this.px=this.x,this.display.y=this.py=this.y,Camera2D.transform(this.display),0==this.pass&&this.x<Player.I.x&&(this.pass=!0,Score.I.addPoint(this.point),egret.Tween.removeTweens(this),new EffectCircle(this.X,this.Y,this.r,EFFECT_COLOR,-Player.I.vx,0)),this.display.x+this.r<0&&this.destroy()},e}(PhysicsObject);__reflect(Ball.prototype,"Ball");var Box=function(t){function e(e,i,o,s,n){var a=t.call(this)||this;return a.pass=!1,a.x=e,a.y=i,a.s=o,a.color=s,a.point=n,a.setDisplay(e,i),a.setBody(e,i),a.display.rotation=180*a.body.angle/Math.PI,Camera2D.transform(a.display),a}return __extends(e,t),e.newBox=function(t,i,o,s,n){void 0===n&&(n=2);var a=Util.w(PILLAR_INTER_PER_W),r=Util.w(BOX_MIN_SIZE_PER_W),l=Util.w(BOX_MAX_SIZE_PER_W);t+=l;for(var h=Util.w(.25),p=1500/Player.speedCo,c=0;n>c;c++){var d=Util.h(.5)+Util.w(GAME_AREA_H_PER_W*s.f(-.5,.5)),y=Util.lerp(r,l,s.f01()*o),u=new e(t+s.f(0,a),d,y,OBJECT_COLOR,3);s.bool(.25*i)&&(s.bool(.5*Wave.hardRate)?d<Util.h(.5)?egret.Tween.get(u,{loop:!0}).to({y:u.y+h},p).to({y:u.y+0},p):egret.Tween.get(u,{loop:!0}).to({y:u.y-h},p).to({y:u.y+0},p):s.bool()?egret.Tween.get(u,{loop:!1}).to({y:u.y-h},p):egret.Tween.get(u,{loop:!1}).to({y:u.y+h},p))}},e.prototype.setDisplay=function(t,e){this.display&&GameObject.gameDisplay.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.gameDisplay.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.beginFill(this.color),i.graphics.drawRect(-.5*this.s,-.5*this.s,this.s,this.s),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC}),this.body.addShape(new p2.Box({width:this.p2m(this.s),height:this.p2m(this.s),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER}),[0,0],0),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.update=function(){this.fixedUpdate()},e.prototype.fixedUpdate=function(){this.display.x=this.px=this.x,this.display.y=this.py=this.y,Camera2D.transform(this.display),0==this.pass&&this.x<Player.I.x&&(this.pass=!0,Score.I.addPoint(this.point),egret.Tween.removeTweens(this),new EffectFrame(this.X,this.Y,this.s,this.s,EFFECT_COLOR,-Player.I.vx,0)),this.display.x+this.s/2<0&&this.destroy()},e}(PhysicsObject);__reflect(Box.prototype,"Box");var Cave=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.newCave=function(t,i,o,s){var n=Util.w(CAVE_WIDTH_PER_W),a=Util.w(GAME_AREA_H_PER_W),r=Util.w(Util.lerp(CAVE_HOLE_MAX_PW,CAVE_HOLE_MIN_PW,o))*s,l=.5*(r+a),h=i-l,p=i+l,c=Math.min(h,e.prevPy0),d=Math.max(p,e.prevPy1),y=Util.w(1/256),u=!1;new Pillar(t+.5*n,c,n+y,a,OBJECT_COLOR,1,u),new Pillar(t+.5*n,d,n+y,a,OBJECT_COLOR,0,u),new Pillar(t+1.5*n,h,n+y,a,OBJECT_COLOR,1,u),new Pillar(t+1.5*n,p,n+y,a,OBJECT_COLOR,0,u),e.prevPy0=h,e.prevPy1=p},e}(Pillar);__reflect(Cave.prototype,"Cave");var Coin=function(t){function e(e,i){var o=t.call(this)||this;return o.step=0,o.radius=Util.w(COIN_RADIUS_PER_W),o.setShape(e,i),o.setBody(e,i),o}return __extends(e,t),e.prototype.setShape=function(t,e){var i=this.display;null==this.display?(this.display=i=new egret.Shape,GameObject.gameDisplay.addChild(this.display)):i.graphics.clear(),i.x=t,i.y=e,i.graphics.beginFill(COIN_COLOR),i.graphics.drawCircle(0,0,this.radius),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:.1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Circle({radius:this.p2m(this.radius),collisionGroup:PHYSICS_GROUP_PLAYER,collisionMask:PHYSICS_GROUP_OBSTACLE})),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){this.body.velocity[0]*=.1,this.body.velocity[1]*=.1;var t=Util.h(.5),e=Util.w(.45*GAME_AREA_H_PER_W);this.py=Util.clamp(this.py,t-e,t+e),Camera2D.transform(this.display),this.isPicked()||this.isOutOfScreen()},e.prototype.isPicked=function(){var t=Player.I.x-this.px,e=Player.I.y-this.py,i=Math.pow(t,2)+Math.pow(e,2);if(i<=Math.pow(Player.I.radius+4*this.radius,2)){Score.I.addCombo();var o=10*Score.I.combo;return Score.I.addPoint(o),new EffectPopText("+"+o,this.display.x,this.display.y,30,FONT_COLOR),new EffectCircle(this.X,this.Y,2*this.radius,COIN_COLOR,-Player.I.vx,0),this.destroy(),!0}return!1},e.prototype.isOutOfScreen=function(){return 0==this.step&&this.px+this.radius<Player.I.x-Player.I.radius&&(this.step=1,Score.I.resetCombo(),new EffectPopText("MISS!",this.display.x,this.display.y,30,FONT_COLOR)),this.px+this.radius<=Camera2D.x?(this.destroy(),!0):!1},e}(PhysicsObject);__reflect(Coin.prototype,"Coin");var SaveKeyBestScore="thread-bestScore",DefaultBestScore=10,SaveKeyNextLevel="thread-nextLevel",PIXEL_PER_METER=1,GAME_AREA_H_PER_W=1.2,THREAD_WIDTH_PER_W=1/256,PLAYER_SPEED_PER_W=1/180,RISE_POWER_PER_W=5e-4,MAX_SPEED_CO=2,MIN_SPEED_CO=1.4,PILLAR_WIDTH_PER_W=1/32,PILLAR_INTER_PER_W=.5,PILLAR_HOLE_MAX_PW=.25,PILLAR_HOLE_MIN_PW=.13,CAVE_WIDTH_PER_W=.5,CAVE_INTER_PER_W=2*CAVE_WIDTH_PER_W,CAVE_HOLE_MAX_PW=.3,CAVE_HOLE_MIN_PW=.13,BALL_MIN_RADIUS_PER_W=1/24,BALL_MAX_RADIUS_PER_W=.2,BOX_MIN_SIZE_PER_W=1/16,BOX_MAX_SIZE_PER_W=1/3,COIN_RADIUS_PER_W=1/64,PHYSICS_GROUP_PLAYER=2,PHYSICS_GROUP_OBSTACLE=4,PHYSICS_GRAVITY_PER_H=0,BACK_COLOR=3158064,FONT_COLOR=16777215,FONT_COLOR2=0,PLAYER_COLOR=14737632,OBJECT_COLOR=12632256,COIN_COLOR=16744703,EFFECT_COLOR=16777215,Game=function(){function t(){}return t.level=0,t}();__reflect(Game.prototype,"Game");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return Util.initial(this),GameObject.initial(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),[4,Social.init()];case 1:return t.sent(),SceneTitle.loadScene(),egret.startTick(this.tickLoop,this),[2]}})})},e.prototype.tickLoop=function(t){return PhysicsObject.progress(),GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Player=function(t){function e(i,o){var s=t.call(this)||this;s.xyListMax=32,s.xyListStep=2,s.xyIndex=0,s.state=s.stateNone,e.I=s,s.radius=Util.w(THREAD_WIDTH_PER_W),s.x=i,s.y=o,s.vx=Util.w(PLAYER_SPEED_PER_W)*e.speedCo,s.vy=0,s.xyList=[];for(var n=0;n<s.xyListMax;n++)s.xyList[n]=[],s.xyList[n][0]=i-n*s.vx*s.xyListStep,s.xyList[n][1]=o;return s.scrollCamera(),s.setDisplay(i,o),s.setBody(i,o),s.button=new Button(null,0,0,.5,.5,1,1,0,0,null),s}return __extends(e,t),e.prototype.onDestroy=function(){this.button.destroy(),e.I=null},e.prototype.setDisplay=function(t,e){null==this.display&&(this.display=new egret.Shape,GameObject.gameDisplay.addChild(this.display));var i=this.display;i.graphics.clear(),this.xyIndex-=1/this.xyListStep,this.xyIndex<0&&(this.xyIndex+=this.xyListMax);var o=Math.floor(this.xyIndex);this.xyList[o][0]=t,this.xyList[o][1]=e,i.x=0,i.y=0,i.graphics.lineStyle(6,PLAYER_COLOR,1,!1,null,null,egret.JointStyle.MITER),i.graphics.moveTo(Camera2D.transX(this.xyList[o][0]),Camera2D.transY(this.xyList[o][1])),o=++o%this.xyListMax;for(var s=1;s<this.xyListMax;s++)i.graphics.lineTo(Camera2D.transX(this.xyList[o][0]),Camera2D.transY(this.xyList[o][1])),o=++o%this.xyListMax},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:.1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Circle({radius:this.p2m(this.radius),collisionGroup:PHYSICS_GROUP_PLAYER,collisionMask:PHYSICS_GROUP_OBSTACLE})),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body),PhysicsObject.world.on("beginContact",this.beginContact,this)},e.prototype.beginContact=function(t){var e=t.bodyA,i=t.bodyB;(e==this.body||i==this.body)&&this.miss()},e.prototype.update=function(){this.fixedUpdate()},e.prototype.fixedUpdate=function(){this.state()},e.prototype.scrollCamera=function(){Camera2D.x=this.x-Util.w(1/3),Camera2D.y=0},e.prototype.setStateNone=function(){this.state=this.stateNone},e.prototype.stateNone=function(){},e.prototype.setStateMove=function(){this.state=this.stateMove},e.prototype.stateMove=function(){this.vx=Util.w(PLAYER_SPEED_PER_W)*e.speedCo,this.x+=this.vx;for(var t=e.speedCo;t>0;t-=1){var i=Util.clamp01(t),o=Math.pow(.97,i);this.vy*=o;var s=Util.w(RISE_POWER_PER_W)*i;this.vy+=this.button.touch?-s:+s,this.y+=this.vy*i}this.px=this.x,this.py=this.y,this.scrollCamera(),this.setDisplay(this.px,this.py),this.checkOut()},e.prototype.checkOut=function(){Math.pow(this.py-Util.h(.5),2)>Math.pow(Util.w(.5*GAME_AREA_H_PER_W),2)&&this.miss()},e.prototype.miss=function(){this.state!=this.stateNone&&(new GameOver,PhysicsObject.deltaScale=.1,egret.Tween.removeAllTweens(),this.state=this.stateNone)},e.I=null,e.speedCo=1,e}(PhysicsObject);__reflect(Player.prototype,"Player");var Wave=function(t){function e(i){var o=t.call(this)||this;return o.count=0,o.goalCount=0,o.modeCount=0,o.endInterval=2,o.state=o.stateNone,e.hardRate=0,Cave.prevPy0=Util.h(.5)-Util.w(.3*GAME_AREA_H_PER_W),Cave.prevPy1=Util.h(.5)+Util.w(.3*GAME_AREA_H_PER_W),o.level=i,o.waveX=Util.w(1),Player.speedCo=1,0==i?(o.rand=new Random,o.setStatePillar()):(o.rand=new Random(e.levelSeeds[i]),o.count=2*i,o.goalCount=12+i/4),o}return __extends(e,t),e.prototype.update=function(){if(Player.I.state!=Player.I.stateNone&&Player.I.x+Util.w(2/3)>=this.waveX){if(this.count++,this.modeCount--,this.level>0&&(this.goalCount--,this.goalCount<=3))return this.waveX+=Util.w(PILLAR_INTER_PER_W),void(this.goalCount<=0&&(new GameOver(this.level),PhysicsObject.deltaScale=0,egret.Tween.removeAllTweens(),this.setStateNone(),Player.I.setStateNone()));if(this.modeCount<=0){if(this.endInterval>0)return this.waveX+=Util.w(PILLAR_INTER_PER_W)*this.endInterval,void(this.endInterval=0);switch(e.hardRate=Util.clamp(this.count/200,0,1),this.rand.bool(.5)&&Player.speedCo<=1&&this.state!=this.stateNone?(Player.speedCo=Util.lerp(MIN_SPEED_CO,MAX_SPEED_CO,e.hardRate),e.hardRate=Util.clamp(e.hardRate-.25,0,1)):Player.speedCo=1,this.rand.i(0,4)){case 0:this.setStatePillar();break;case 1:this.setStateCave();break;case 2:this.setStateBall();break;case 3:this.setStateBox()}}this.state()}},e.prototype.setStateNone=function(){this.state=this.stateNone},e.prototype.stateNone=function(){},e.prototype.setStatePillar=function(){this.state=this.statePillar,this.endInterval=2,Player.speedCo<=1?this.modeCount=this.rand.i(4,16):this.modeCount=4},e.prototype.statePillar=function(){this.newPillar()},e.prototype.newPillar=function(t){void 0===t&&(t=.3);var i=this.waveX,o=Util.h(.5)+Util.w(this.rand.f(-t,+t)*Util.lerp(.5,1,e.hardRate)),s=PType.Normal;this.rand.bool(.8*e.hardRate)&&(s=this.rand.i(PType.Normal,PType.Total)),Pillar.newPillar(i,o,s,e.hardRate);var n=Util.w(PILLAR_INTER_PER_W);this.waveX+=n,this.rand.bool(.25)&&new Coin(i+.5*n,o)},e.prototype.setStateCave=function(){this.state=this.stateCave,this.endInterval=2,Player.speedCo<=1?this.modeCount=this.rand.i(2,8):this.modeCount=2},e.prototype.stateCave=function(){this.newCave()},e.prototype.newCave=function(t){void 0===t&&(t=.45);var i=this.waveX,o=Util.h(.5)+Util.w(this.rand.f(-t,+t)*Util.lerp(.5,1,e.hardRate));Cave.newCave(i,o,e.hardRate,this.rand.f(.8,1.2));var s=Util.w(PILLAR_INTER_PER_W);this.waveX+=2*s,this.rand.bool(.25)&&new Coin(i+1.5*s,o)},e.prototype.setStateBall=function(){this.state=this.stateBall,this.endInterval=3,Player.speedCo<=1?this.modeCount=this.rand.i(4,16):this.modeCount=4},e.prototype.stateBall=function(){this.newBall()},e.prototype.newBall=function(){var t=this.waveX;if(this.rand.bool()?Ball.newBall(t,e.hardRate,1,this.rand,2):Ball.newBall(t,e.hardRate,0,this.rand,4),this.waveX+=Util.w(PILLAR_INTER_PER_W),this.rand.bool(.25)){var i=Util.h(.5)+Util.w(GAME_AREA_H_PER_W*this.rand.f(-.4,.4));new Coin(t,i)}},e.prototype.setStateBox=function(){this.state=this.stateBox,this.endInterval=3,Player.speedCo<=1?this.modeCount=this.rand.i(4,16):this.modeCount=4},e.prototype.stateBox=function(){this.newBox()},e.prototype.newBox=function(){var t=this.waveX;if(this.rand.bool()?Box.newBox(t,e.hardRate,1,this.rand,2):Box.newBox(t,e.hardRate,0,this.rand,5),this.waveX+=Util.w(PILLAR_INTER_PER_W),this.rand.bool(.25)){var i=Util.h(.5)+Util.w(GAME_AREA_H_PER_W*this.rand.f(-.4,.4));new Coin(t,i)}},e.levelSeeds=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],e}(GameObject);__reflect(Wave.prototype,"Wave");var EffectCircle=function(t){function e(e,i,o,s,n,a){void 0===n&&(n=0),void 0===a&&(a=0);var r=t.call(this)||this;return r.vx=0,r.vy=0,r.delta=.025,r.r=o,r.c=s,r.a=.5,r.vx=n,r.vy=a,r.dr=.1*Util.w(PILLAR_WIDTH_PER_W)*randF(.5,1.5),r.delta*=randF(.8,1.2),r.setShape(e+n,i+a,r.r,s,r.a),r}return __extends(e,t),e.prototype.setShape=function(t,e,i,o,s){var n=this.display;null==this.display?(this.display=n=new egret.Shape,GameObject.gameDisplay.addChild(this.display)):n.graphics.clear(),n.x=t,n.y=e,n.graphics.lineStyle(8,o,s),n.graphics.drawCircle(0,0,this.r)},e.prototype.update=function(){return this.X+=this.vx,this.Y+=this.vy,this.a-=this.delta,this.r+=this.dr,this.setShape(this.X,this.Y,this.r,this.c,this.a),this.a<=0?void this.destroy():void 0},e}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var SceneTitle=function(t){function e(){var e=t.call(this)||this;e.texts=[],e.startButton=null,e.levelButton=null,e.settingsButton=null,e.texts[0]=Util.newTextField("糸の冒険",Util.width/12,FONT_COLOR,.5,.25,!0,!1);var i=Util.getSaveDataNumber(SaveKeyBestScore,DefaultBestScore);return e.texts[3]=Util.newTextField("自己ベスト:"+i,Util.width/16,FONT_COLOR,.5,.35,!0,!0),e.startButton=new Button("スタート",Util.width/16,BACK_COLOR,.5,.7,.7,.12,FONT_COLOR,1,e.onTapStart),e.texts.forEach(function(t){t&&GameObject.baseDisplay.addChild(t)}),e}return __extends(e,t),e.loadScene=function(){PhysicsObject.deltaScale=1,new Player(Util.w(.3),Util.h(.5)),new BackGround,new Score,new e},e.prototype.onDestroy=function(){this.texts.forEach(function(t){t&&t.parent.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.onTapStart=function(){GameObject.transit=ScenePlay.loadScene,Game.level=0},e.prototype.onTapLevel=function(){GameObject.transit=ScenePlay.loadScene,Game.level=Util.getSaveDataNumber(SaveKeyNextLevel,1)},e}(GameObject);__reflect(SceneTitle.prototype,"SceneTitle");var Button=function(t){function e(e,i,o,s,n,a,r,l,h,p){var c=t.call(this)||this;c.text=null,c.onTap=null,c.press=!1,c.touch=!1,c.x=0,c.y=0;var d=new egret.Shape;GameObject.gameDisplay.addChild(d),d.graphics.beginFill(l,h);var y=a*Util.width,u=r*Util.height;return d.graphics.drawRoundRect(-.5*y,-.5*u,y,u,.2*y),d.graphics.endFill(),d.touchEnabled=!0,d.x=s*Util.width,d.y=n*Util.height,c.display=d,e&&(c.text=Util.newTextField(e,i,o,s,n,!0,!1),GameObject.gameDisplay.addChild(c.text)),c.onTap=p,c.onTap&&c.display.addEventListener(egret.TouchEvent.TOUCH_TAP,c.onTap,c),c.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,c.touchBegin,c),c.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,c.touchMove,c),c.display.addEventListener(egret.TouchEvent.TOUCH_END,c.touchEnd,c),c}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.gameDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.gameDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.gameDisplay.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.gameDisplay.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e,i){void 0===i&&(i=1),e.x=t.transX(e.x),e.y=t.transY(e.y),e.scaleX=e.scaleY=t.scale*i},t.transX=function(e){return(e-t.x)*t.scale},t.transY=function(e){return(e-t.y)*t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var EffectFrame=function(t){function e(e,i,o,s,n,a,r){void 0===a&&(a=0),void 0===r&&(r=0);var l=t.call(this)||this;return l.vx=0,l.vy=0,l.delta=.025,l.w=o,l.h=s,l.c=n,l.a=.5,l.vx=a,l.vy=r,l.dw=.1*Util.w(PILLAR_WIDTH_PER_W)*randF(.5,1.5),l.dh=l.dw,l.delta*=randF(.8,1.2),l.setShape(e+a,i+r,l.w,l.h,n,l.a),l}return __extends(e,t),e.prototype.setShape=function(t,e,i,o,s,n){var a=this.display;null==this.display?(this.display=a=new egret.Shape,GameObject.gameDisplay.addChild(this.display)):a.graphics.clear(),a.x=t,a.y=e,a.graphics.lineStyle(8,s,n),a.graphics.drawRect(-.5*i,-.5*o,i,o)},e.prototype.update=function(){return this.X+=this.vx,this.Y+=this.vy,this.a-=this.delta,this.w+=this.dw,this.h+=this.dh,this.setShape(this.X,this.Y,this.w,this.h,this.c,this.a),this.a<=0?void this.destroy():void 0},e}(GameObject);__reflect(EffectFrame.prototype,"EffectFrame");var EffectPopText=function(t){function e(e,i,o,s,n){var a=t.call(this)||this;a.text=null,a.time=60;var r=new egret.TextField;return r.text=e,r.bold=!0,r.size=s,r.textColor=n,r.x=i,r.y=o,a.text=r,GameObject.gameDisplay.addChild(a.text),a}return __extends(e,t),e.prototype.onDestroy=function(){this.text.parent.removeChild(this.text)},e.prototype.update=function(){this.text.y-=.5,this.text.x-=1,this.time--,this.time<=0&&this.destroy()},e}(GameObject);__reflect(EffectPopText.prototype,"EffectPopText");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype["int"]=function(){return this.next()&t.max},t.prototype.f01=function(){return this["int"]()/(t.max+1)},t.prototype.f=function(t,e){return t+this.f01()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(t){return void 0===t&&(t=.5),this.f01()<t},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=1073741823,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Sdk=function(){function t(){}return t.loadSdk=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i;return __generator(this,function(o){switch(o.label){case 0:return console.log("============================================================"),console.log("Liberapp.loadSdk:"),this.env=this.detectMode(location.origin),console.log("env: ",this.env),t=this.resolveSdkUrl(this.sdkPath),console.log("srcUrl: ",t),[4,this.loadScript(t)];case 1:return e=o.sent(),console.log("script:",e),i=window.LiberappSdk,"egret-wing"!==this.env?[3,3]:[4,i.enableDebug()];case 2:o.sent(),o.label=3;case 3:return console.log("liberappSdk:",i),[2,i]}})})},t.detectMode=function(t){return/^https:\/\/(.+)\.a\.liberapp\.net$/.test(t)?"production":/^https:\/\/(.+)\.a\.staging.\.liberapp\.net$/.test(t)?"staging":/^https:\/\/(.+)\.a\.development\.liberapp\.net$/.test(t)?"development":"egret-wing"},t.resolveSdkUrl=function(t){var e=this.baseUrls[this.env];return""+e+t},t.loadScript=function(t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,new Promise(function(e,i){var o=document.createElement("script");o.async=!1,o.src=t,o.onload=function(){return e(o)},o.onerror=function(){return i(new Error("Can not load script: src:"+t))},document.head.append(o)})]})})},t.baseUrls={production:"https://liberapp.net",staging:"https://staging.liberapp.net",development:"https://localhost","egret-wing":"https://staging.liberapp.net"},t.sdkPath="/dist/sdk/liberapp-ja-0_9.js",t}();__reflect(Sdk.prototype,"Sdk");var Social=function(){function t(){}return t.init=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,o,s,n,a,r,l;return __generator(this,function(h){switch(h.label){case 0:return[4,Sdk.loadSdk()];case 1:return t=h.sent(),this.sdk=t,Toast.show({text:"ログイン中・・・",delay:3e4,canHide:!0}),[4,t.initializeAsync()];case 2:return h.sent(),[4,t.startGameAsync()];case 3:return h.sent(),Toast.show({text:this.playerName+"さんようこそ！",delay:3e4,canHide:!0}),e=this,[4,t.getLeaderboardAsync("default")];case 4:return e.leaderboard=h.sent(),[4,Promise.all([this.leaderboard.getEntryCountAsync(),this.leaderboard.getEntriesAsync(3,0),this.leaderboard.getPlayerEntryAsync()])];case 5:return i=h.sent(),o=i[0],s=i[1],n=i[2],this.playerEntry=n,this.hasBest?Toast.show({text:"今のところ"+o+"人中"+this.bestRank+"位です",delay:3e3}):(a=s[0],a&&(console.log(a),r=a.getPlayer().getName(),l=a.getScore(),Toast.show({text:o+"人が遊んでいます!\n一番は"+r+"さん\nスコアは"+l+"です",delay:3e3}))),[2]}})})},Object.defineProperty(t,"hasBest",{get:function(){return!!this.myBestEntry},enumerable:!0,configurable:!0}),Object.defineProperty(t,"bestScore",{get:function(){return this.hasBest?this.myBestEntry.getScore():0},enumerable:!0,configurable:!0}),Object.defineProperty(t,"bestRank",{get:function(){return this.hasBest?this.myBestEntry.getRank():void 0},enumerable:!0,configurable:!0}),Object.defineProperty(t,"playerEntry",{set:function(e){console.log("myBest:",this.myBestEntry,e),this.myBestEntry=e,Score.bestScore=t.bestScore,Score.bestRank=t.bestRank
},enumerable:!0,configurable:!0}),t.setScore=function(t){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(i){switch(i.label){case 0:return console.log("setScore "+t),Toast.show({text:"ハイスコアを送信中",delay:3e4,canHide:!0}),e=this,[4,this.leaderboard.setScoreAsync(t)];case 1:return e.playerEntry=i.sent(),Toast.show({text:"順位は"+this.bestRank+"位でした",delay:3e3}),[2]}})})},Object.defineProperty(t,"playerName",{get:function(){return this.sdk.player.getName()||"名無し"},enumerable:!0,configurable:!0}),t}();__reflect(Social.prototype,"Social");var Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.initial=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t["break"]=function(t,e){t&&console.log(e)},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.clamp01=function(e){return t.clamp(e,0,1)},t.lerp=function(t,e,i){return t+(e-t)*i},t.deltaAngle=function(t){var e=(t+Math.PI)/(2*Math.PI);return e=65536*e&65535,e=e/65536*Math.PI*2-Math.PI},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var o=1-i,s=((16711680&t)*o+(16711680&e)*i&16711680)+((65280&t)*o+(65280&e)*i&65280)+((255&t)*o+(255&e)*i&255);return s},t.newTextField=function(e,i,o,s,n,a,r){var l=new egret.TextField;return l.text=e,l.bold=a,l.size=i,l.textColor=o,r?(l.x=(t.width-l.width)*s,l.y=(t.height-l.height)*n):(l.x=t.width*s-.5*l.width,l.y=t.height*n-.5*l.height),l},t.newShadowText=function(t,e,i){void 0===i&&(i=1.5);var o=new egret.TextField;return o.text=t.text,o.bold=t.bold,o.size=t.size,o.textColor=e,o.x=t.x+i,o.y=t.y+i,o.alpha=.5,o},t.newBitmap=function(t,e,i,o){var s=new egret.Bitmap;return s.texture=RES.getRes(t),GameObject.baseDisplay.addChild(s),s.x=e,s.y=i,s.anchorOffsetX=.5*s.width,s.anchorOffsetY=.5*s.height,s.scaleX=s.scaleY=o,s},t.getSaveDataNumber=function(t,e){var i=egret.localStorage.getItem(t),o=e;return null!=i&&(o=parseInt(i)),o},t.setSaveDataNumber=function(t,e){egret.localStorage.setItem(t,""+e)},t.getSaveDataString=function(t,e){var i=egret.localStorage.getItem(t);return null==i&&(i=e),i},t.setSaveDataString=function(t,e){egret.localStorage.setItem(t,e)},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(e){void 0===e&&(e=0);var i=t.call(this)||this;return i.texts=[],i.retryButton=null,i.backButton=null,i.step=0,i.fadeInFrame=64,i.level=0,i.level=e,i.texts[0]=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/13,FONT_COLOR,.5,.5,!0,!1),egret.Tween.get(i.texts[0],{loop:!1}).to({alpha:0},0).to({alpha:1},1e3),GameObject.gameDisplay.addChild(i.texts[0]),e>0&&(i.texts[1]=Util.newTextField("レベル"+e+"クリア",Util.width/13,FONT_COLOR,.5,.3,!0,!1),GameObject.gameDisplay.addChild(i.texts[1])),Score.I.point>Score.bestScore&&0==i.level&&Social.setScore(Score.I.point),i}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.gameDisplay.removeChild(t)}),this.texts=null},e.prototype.update=function(){this.step++,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.75,.4,.1,FONT_COLOR,1,this.onTapRetry),this.backButton=new Button("終了",Util.width/18,BACK_COLOR,.1,.1,.2,.075,FONT_COLOR,1,this.onTapBack),Score.I.point>Score.bestScore&&0==this.level&&(this.texts[1]=Util.newTextField("NEW RECORD!",Util.width/13,FONT_COLOR,.5,.4,!0,!1),egret.Tween.get(this.texts[1],{loop:!0}).to({alpha:0},500).to({alpha:1},500),GameObject.gameDisplay.addChild(this.texts[1])))},e.prototype.onTapBack=function(){GameObject.transit=SceneTitle.loadScene,this.destroy()},e.prototype.onTapRetry=function(){GameObject.transit=ScenePlay.loadScene,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;return i.point=0,i.combo=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/16,FONT_COLOR2,.5,0,!0,!0),GameObject.gameDisplay.addChild(i.text),i.textBest=Util.newTextField("BEST:"+e.bestScore,Util.width/24,FONT_COLOR2,1,0,!0,!0),GameObject.gameDisplay.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.gameDisplay.removeChild(this.text),this.text=null,GameObject.gameDisplay.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.point+=t,this.text.text=""+this.point.toFixed(),e.bestScore<this.point&&(this.textBest.text="BEST:"+this.point.toFixed())},e.prototype.addCombo=function(){this.combo++},e.prototype.resetCombo=function(){this.combo=0},e.I=null,e.bestScore=0,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.texts[1]=Util.newTextField("タッチ中は上昇",Util.width/19,FONT_COLOR,.5,.35,!0,!1),e.texts[2]=Util.newTextField("ぶつからないように進め",Util.width/19,FONT_COLOR,.5,.4,!0,!1),e.texts.forEach(function(t){GameObject.gameDisplay.addChild(t)}),GameObject.gameDisplay.once(egret.TouchEvent.TOUCH_BEGIN,e.tap,e),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.gameDisplay.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.setStateMove(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");var DefaultToastOptions={text:"",delay:3e3,canHide:!1},Toast=function(t){function e(e){var i=t.call(this)||this;return i.queue=[],i.rect=new eui.Rect,i.rect.alpha=0,i.label=new eui.Label,i.label.maxWidth=e,i.rect.addEventListener(eui.UIEvent.CREATION_COMPLETE,i.onRectCreationComplete,i),i.label.addEventListener(eui.UIEvent.RESIZE,i.onLabelResized,i),GameObject.baseDisplay.addChild(i.rect),i}return __extends(e,t),e.prototype.update=function(){},e.show=function(t){var i=__assign({},DefaultToastOptions,t);this.I||(this.I=new e(.6*Util.width)),this.I.show(i)},e.prototype.onDestory=function(){var t=e.I;e.I=void 0,t&&(t.rect.removeChildren(),t.rect=void 0,t.label=void 0)},e.prototype.show=function(t){if(console.log("Toast.show"),this.currentOptions){if(!this.currentOptions.canHide)return void this.queue.push(t);this.currentTween.setPaused(!0),this.currentTween=void 0,this.currentOptions=void 0,this.queue=[]}this.currentOptions=t,this.toastText=t.text,this.currentTween=egret.Tween.get(this.rect),this.currentTween.to({alpha:1},300).wait(t.delay).call(this.onStartHide,this)},e.prototype.onStartHide=function(){console.log("Toast.onStartHide"),void 0!==this.currentTween&&(this.currentTween=egret.Tween.get(this.rect),this.currentTween.to({alpha:0},300).call(this.onCompleteHide,this))},e.prototype.onCompleteHide=function(){if(console.log("Toast.onCompleteHide"),this.currentTween=void 0,this.currentOptions=void 0,0!==this.queue.length){var t=this.queue.shift();this.show(t)}},e.prototype.onRectCreationComplete=function(){console.log("Toast.onRectCreationComplete"),this.rect.fillColor=0,this.rect.fillAlpha=.6,this.rect.horizontalCenter=0,this.rect.verticalCenter=0,this.rect.ellipseWidth=30,this.rect.ellipseHeight=30,this.label.x=20,this.label.y=20,this.label.size=28,this.rect.addChild(this.label),this.toastText=""},Object.defineProperty(e.prototype,"toastText",{set:function(t){console.log("Toast.toastText:"),this.label.text=t},enumerable:!0,configurable:!0}),e.prototype.onLabelResized=function(){console.log("Toast.onLabelResized:"),this.rect.width=this.label.width+40,this.rect.height=this.label.height+40,this.rect.x=(Util.width-this.rect.width)/2,this.rect.y=(Util.height-this.rect.height)/2},e.prototype.updateContent=function(){},e}(GameObject);__reflect(Toast.prototype,"Toast");