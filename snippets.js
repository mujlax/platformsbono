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
  if (nowW > 320) {
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
  }
	
];
