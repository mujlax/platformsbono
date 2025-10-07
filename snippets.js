const snippets = [
  {
    id: 1,
    title: 'Граница и Box Sizing для domOverlay',
    code: `var domOverlay = document.getElementById("dom_overlay_container");
domOverlay.style.border = '1px solid #666666'; // width solid/dotted/dashed + color 05 = alpha
domOverlay.style.boxSizing = 'border-box';`
  },
  {
    id: 2,
    title: 'Инициализация и адаптивная раскладка баннера',
    code: `_main = this;
            //sost_1 = this.sost_1;

//Рамка в 1px
var domOverlay = document.getElementById("dom_overlay_container");
domOverlay.style.border = '1px solid #666666';
domOverlay.style.boxSizing = 'border-box';

var minBannerWidth = 300;
var maxBannerWidth = 6000;

function animBanner() {
    var nowW = clamp(document.documentElement.clientWidth, minBannerWidth, maxBannerWidth); //Ограничить ширину баннера ex: от X до X

    if (nowW > minBannerWidth && nowW < maxBannerWidth) {
		canvas.width = domOverlay.width = animation_container.width = nowW * window.devicePixelRatio;
		canvas.style.width = domOverlay.style.width = animation_container.style.width = 100 + "%";
	} else {
		canvas.width = domOverlay.width = animation_container.width = nowW * window.devicePixelRatio;
		canvas.style.width = domOverlay.style.width = animation_container.style.width = nowW + "px";
	}
  if (nowW >= 320) {
    _main.VO.x = nowW;
    //sost_1.x = nowW / 2; центровка
  }
}

//createjs.Tween.get(sost_240.boss_2).to({x:(nowW - 240) / 2}, 1000, createjs.Ease.cubicInOut);



animBanner();
window.onresize = animBanner;

var page_body = document.getElementsByTagName('body')[0];
page_body.style.overflow = 'hidden';

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}`
  },
  {
    id: 3,
    title: 'Ограничитель количества циклов анимации',
    code: `function loopLimiter(_loops) {
  if (typeof this.loop_counter === 'undefined') {
    this.loop_counter = 0;
  }
  if (this.loop_counter >= _loops) {
    createjs.Ticker.removeAllEventListeners();
    createjs.Tween.removeAllTweens();
  } else {
    this.loop_counter++;
  }
}
loopLimiter(1);`
  },
  {
    id: 4,
    title: 'Переход на указанный кадр',
    code: `// Вставить на нужный кадр и указать кадр на который перейти
this.gotoAndPlay(20);`
  },
{
    id: 5,
    title: 'Символ для T2',
    code: ` ,  , `
  },
	{
	id: 6,
    title: 'Символ для T2',
    code: `s_970 = this.s_970;

//Рамка в 1px
var domOverlay = document.getElementById("dom_overlay_container");
domOverlay.style.border = '1px solid #666666';
domOverlay.style.boxSizing = 'border-box';

var minBannerWidth = 300;
var maxBannerWidth = 6000;


function animBanner() {
	var nowW = clamp(document.documentElement.clientWidth, minBannerWidth, maxBannerWidth); //Ограничить ширину баннера ex: от X до X

	if (nowW > minBannerWidth && nowW < maxBannerWidth) {
		canvas.width = domOverlay.width = animation_container.width = nowW * window.devicePixelRatio;
		canvas.style.width = domOverlay.style.width = animation_container.style.width = 100 + "%";
	} else {
		canvas.width = domOverlay.width = animation_container.width = nowW * window.devicePixelRatio;
		canvas.style.width = domOverlay.style.width = animation_container.style.width = nowW + "px";
	}

	


	if (nowW > 970) {
		//Удалять эту строчку window.applyCommon970 на других кейфреймах, оставлять только applyCommon970(nowW);
		window.applyCommon970 = function (nowW) {
		//Тут пишем большую часть кода, которая будет вызывать на других кадрах через applyCommon970(nowW);
		
			s_970.
		};
	
		//Здесь пишем код, который будет вызываться только на этом кадре (например центровка, которую потом надо убрать, из-за вызова creatjs кода на другом кадре)
		
	
		//Эту штуку оставляем на других кейфреймах, в ней будет код, который пишем выше
		applyCommon970(nowW);
	}
}





animBanner();
window.onresize = animBanner;

var page_body = document.getElementsByTagName('body')[0];
page_body.style.overflow = 'hidden';

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

// внутри this.frame_0
if (!window.__tweenPatched) {
  const __rememberedTargets = new Set();

  function rememberAxesOnce(target, axes) {
    if (!target.__origPos) target.__origPos = {};
    axes.forEach(axis => {
      if (target.__origPos[axis] === undefined) {
        target.__origPos[axis] = target[axis];
        __rememberedTargets.add(target);
      }
    });
  }

  function resetRememberedTargets(axes = ['x']) {
    __rememberedTargets.forEach(target => {
      axes.forEach(axis => {
        const val = target.__origPos && target.__origPos[axis];
        if (val !== undefined) target[axis] = val;
      });
      createjs.Tween.removeTweens(target);
    });
  }

  // экспортируем глобально для повторного использования
  window.resetRememberedTargets = resetRememberedTargets;

  // одноразовый монки‑патч Tween.get
  (function patchTweenGet(){
    const origGet = createjs.Tween.get;
    createjs.Tween.get = function(target, props, pluginData, override){
      const tween = origGet.call(createjs.Tween, target, props, pluginData, override);
      const origTo = tween.to;
      tween.to = function(toProps, duration, ease, param){
        const axes = [];
        if (toProps && Object.prototype.hasOwnProperty.call(toProps, 'x')) axes.push('x');
        if (toProps && Object.prototype.hasOwnProperty.call(toProps, 'y')) axes.push('y');
        if (axes.length) rememberAxesOnce(target, axes);
        return origTo.call(this, toProps, duration, ease, param);
      };
      return tween;
    };
  })();

  window.__tweenPatched = true; // флаг «инициализировано»
}

// при входе в кадр 0 можно сразу сбросить всех отмеченных
if (window.resetRememberedTargets) {
  window.resetRememberedTargets(['x']); // или ['x','y'] если нужно
}`
	}
	
];
