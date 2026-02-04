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
    title: 'Растяжка новая',
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
	}
	{
    id: 7,
    title: 'Новая растяжка Frame 1',
    code: `// Общая база для всех кадров — объявляется один раз.
// Идея для новичков: на кадрах описываем логику один раз через BannerResponsive.setHooks({ s_600: { common, frame } }).
window.BannerResponsive = window.BannerResponsive || (function () {
	var api = {};
	api._inited = false;
	api._ctx = null; // { s_600, s_1300, s_1600, ..., domOverlay, minBannerWidth, maxBannerWidth }
	api._onResize = null;
	api._resizeListenerBound = false;
	api._hooks = null; // { s_600: { common: fn, frame: fn }, ... }
	api._transformW = function (w) { return w; }; // можно переопределить для "подгона" под другой размер

	// ===== CONFIG (все важные переменные в одном месте) =====
	api.config = {
		// Глобальный "подгон" ширины (применится ко всем кадрам автоматически).
		// Аналог старого: nowW = nowW / (250 / 400)
		scale: 250 / 250,

		// Ограничения ширины баннера
		minBannerWidth: 300,
		maxBannerWidth: 6000,

		// Авто-переключение состояний (если true — не нужно писать в common)
		autoAlpha: true,   // автоматически: активный alpha=1, остальные alpha=0
		autoCenter: true, // автоматически: ctx[activeSlot].x = nowW/2

		// Оформление domOverlay (важно: border строкой 1-в-1 для совместимости с прошивкой)
		applyDomOverlayStyles: function (domOverlay) {
			if (!domOverlay) return;
			domOverlay.style.border = "1px solid #666666";
			domOverlay.style.boxSizing = "border-box";
		},
	};

	// Хуки кадра: один объект, где ключ = слот (например "s_600"),
	// а минимальная ширина берётся автоматически из имени (600).
	//
	// Формат:
	// — без анимаций: s_300: {}
	// — с common: s_300: { common: fn }
	// — с frame: s_300: { frame: fn }
	// — с обоими: s_300: { common: fn, frame: fn }
	// BannerResponsive.setHooks({
	//   s_300: {},
	//   s_500: { common: function(nowW, ctx) { /* доп. логика */ } },
	//   s_625: { frame: function(nowW, ctx) { /* FRAME ONLY */ } },
	// })
	api.setHooks = function (hooks) {
		// Важно: хуки должны "жить" сквозь кадры (например, состояния s_600/s_900),
		// поэтому по умолчанию МЕРДЖИМ новые хуки с уже существующими,
		// а не перезаписываем их целиком.
		//
		// Важно #2: мердж должен быть "глубоким" на уровне слота:
		// если на кадре обновляем только frame, то common должен сохраниться (и наоборот).
		var prev = api._hooks || {};
		var next = hooks || {};
		var merged = {};
		for (var k in prev) {
			if (Object.prototype.hasOwnProperty.call(prev, k)) merged[k] = prev[k];
		}
		for (var k2 in next) {
			if (!Object.prototype.hasOwnProperty.call(next, k2)) continue;
			var prevSlot = merged[k2];
			var nextSlot = next[k2];

			if (prevSlot && typeof prevSlot === "object" && nextSlot && typeof nextSlot === "object") {
				merged[k2] = {
					common: (Object.prototype.hasOwnProperty.call(nextSlot, "common")) ? nextSlot.common : prevSlot.common,
					frame: (Object.prototype.hasOwnProperty.call(nextSlot, "frame")) ? nextSlot.frame : prevSlot.frame,
				};
			} else {
				merged[k2] = nextSlot;
			}
		}
		api._hooks = merged;
	};

	// Трансформация ширины (аналог вашему nowW = nowW / (400 / 250)).
	// Применяется ДО порогов и ДО вызова хуков.
	api.setTransformW = function (transformFn) {
		api._transformW = (typeof transformFn === "function") ? transformFn : function (w) { return w; };
	};

	// Упрощённый вариант: коэффициент (например 250/400).
	// scale=0.625 => теперь все nowW внутри хуков будут nowW*0.625
	api.setScale = function (scale) {
		var s = Number(scale);
		if (!isFinite(s) || s <= 0) s = 1;
		api.setTransformW(function (w) { return w * s; });
	};

	// Применяем конфиг сразу (один раз на создание модуля)
	api.setScale(api.config.scale);

	function parseMinWFromSlot(slot) {
		// slot вида "s_600" -> 600
		var n = parseInt(String(slot).slice(2), 10);
		return isFinite(n) ? n : 0;
	}

	function getLevelsFromHooks(hooks) {
		var levels = [];
		if (!hooks) return levels;
		for (var slot in hooks) {
			if (!Object.prototype.hasOwnProperty.call(hooks, slot)) continue;
			if (slot.indexOf("s_") !== 0) continue;
			levels.push({ slot: slot, minW: parseMinWFromSlot(slot) });
		}
		levels.sort(function (a, b) {
			return a.minW - b.minW;
		});
		return levels;
	}

	api.ensure = function (root) {
		// root = `this` из Adobe Animate. В некоторых кадрах `this` может быть НЕ корневым клипом,
		// поэтому мы пытаемся найти корректный root (например window.exportRoot или через parent).
		var hooks = api._hooks || {};
		var levels = getLevelsFromHooks(hooks);
		if (!levels.length) {
			throw new Error("BannerResponsive.ensure: нет хуков. Сначала вызовите BannerResponsive.setHooks(...) или BannerResponsive.mount(...).");
		}

		var requiredSlot = levels[0].slot; // минимальный брейкпоинт (например s_600)

		function resolveRoot(candidate) {
			// 1) прямой кандидат
			if (candidate && candidate[requiredSlot]) return candidate;
			// 2) стандартный exportRoot из CreateJS экспорта
			if (window.exportRoot && window.exportRoot[requiredSlot]) return window.exportRoot;
			// 3) подняться по parent-цепочке
			var cur = candidate;
			var guard = 0;
			while (cur && cur.parent && guard < 50) {
				cur = cur.parent;
				if (cur && cur[requiredSlot]) return cur;
				guard++;
			}
			return null;
		}

		var resolvedRoot = resolveRoot(root);
		if (!resolvedRoot) {
			throw new Error("BannerResponsive.ensure: не найден root с " + requiredSlot + ". Убедитесь, что на корневом клипе есть экземпляр '" + requiredSlot + "' и что скрипт выполняется в контексте таймлайна.");
		}

		function syncSlotsFromRoot(target, rootObj, hooks) {
			var levels = getLevelsFromHooks(hooks);
			for (var i = 0; i < levels.length; i++) {
				var slot = levels[i].slot;
				target[slot] = rootObj[slot] || null;
			}
		}

		if (!api._inited) {
			var domOverlay = document.getElementById("dom_overlay_container");
			if (domOverlay) {
				api.config.applyDomOverlayStyles(domOverlay);
			}

			var page_body = document.getElementsByTagName("body")[0];
			if (page_body) page_body.style.overflow = "hidden";

			api._ctx = {
				domOverlay: domOverlay,
				minBannerWidth: api.config.minBannerWidth,
				maxBannerWidth: api.config.maxBannerWidth,
			};
			syncSlotsFromRoot(api._ctx, resolvedRoot, api._hooks);

			api._inited = true;
		} else {
			// Слоты могут обновляться при смене кадра — всегда держим актуальные ссылки
			syncSlotsFromRoot(api._ctx, resolvedRoot, api._hooks);
		}

		// Один общий listener на resize, который вызывает "текущий обработчик кадра"
		if (!api._resizeListenerBound) {
			window.addEventListener("resize", function () {
				if (typeof api._onResize === "function") api._onResize();
			});
			api._resizeListenerBound = true;
		}

		return api;
	};

	api.setResizeHandler = function (fn) {
		api._onResize = fn;
	};

	// Упрощение для кадров: один вызов без имени функции.
	// - ставит хуки кадра
	// - делает ensure + resize + run
	// - вешает тот же обработчик на resize
	//
	// onFrame: function(nowW, ctx) {} — дополнительная логика кадра, если нужно (не по уровням).
	api.mount = function (root, hooks, onFrame) {
		api.setHooks(hooks);

		function handler() {
			// root может быть "this" кадра, который не всегда совпадает с exportRoot — ensure сам разрулит.
			api.ensure(root);
			var nowW_raw = api.resize();
			var nowW = api._transformW ? api._transformW(nowW_raw) : nowW_raw;
			api._ctx.nowW_raw = nowW_raw;
			api._ctx.nowW = nowW;
			api.run(nowW);
			if (typeof onFrame === "function") onFrame(nowW, api._ctx);
		}

		handler();
		api.setResizeHandler(handler);
		return handler;
	};

	api.resize = function () {
		var c = api._ctx;
		var nowW = clamp(document.documentElement.clientWidth, c.minBannerWidth, c.maxBannerWidth); // Ограничить ширину баннера ex: от X до X

		// canvas / animation_container приходят из экспорта Animate
		if (nowW > c.minBannerWidth && nowW < c.maxBannerWidth) {
			canvas.width = (c.domOverlay ? (c.domOverlay.width = nowW * window.devicePixelRatio) : nowW * window.devicePixelRatio);
			animation_container.width = nowW * window.devicePixelRatio;
			canvas.style.width = (c.domOverlay ? (c.domOverlay.style.width = "100%") : "100%");
			animation_container.style.width = "100%";
		} else {
			canvas.width = (c.domOverlay ? (c.domOverlay.width = nowW * window.devicePixelRatio) : nowW * window.devicePixelRatio);
			animation_container.width = nowW * window.devicePixelRatio;
			canvas.style.width = (c.domOverlay ? (c.domOverlay.style.width = nowW + "px") : nowW + "px");
			animation_container.style.width = nowW + "px";
		}

		return nowW;
	};

	// Запуск общей логики и "FRAME ONLY" по брейкпоинтам.
	// ВАЖНО: пороги берутся из ключей хуков (s_600 -> 600), без отдельного списка.
	// При autoAlpha/autoCenter вызывается только активный слот (максимальный minW, где nowW > minW).
	api.run = function (nowW) {
		var hooks = api._hooks || {};
		var levels = getLevelsFromHooks(hooks);
		var cfg = api.config || {};

		// Найти активный слот: уровень с максимальным minW, для которого nowW > minW
		var activeLevel = null;
		for (var i = levels.length - 1; i >= 0; i--) {
			if (nowW > levels[i].minW) {
				activeLevel = levels[i];
				break;
			}
		}

		if (!activeLevel) return;

		var activeSlot = activeLevel.slot;
		var rule = hooks[activeSlot];
		if (!rule) return;

		// autoAlpha: активный alpha=1, остальные alpha=0
		if (cfg.autoAlpha === true) {
			for (var j = 0; j < levels.length; j++) {
				var slot = levels[j].slot;
				if (api._ctx[slot]) api._ctx[slot].alpha = (slot === activeSlot) ? 1 : 0;
			}
		}

		// autoCenter: ctx[activeSlot].x = nowW/2
		if (cfg.autoCenter === true && api._ctx[activeSlot]) {
			api._ctx[activeSlot].x = nowW / 2;
		}

		// Вызвать common и frame только для активного слота
		if (rule.common && typeof rule.common === "function") rule.common(nowW, api._ctx);
		if (rule.frame && typeof rule.frame === "function") rule.frame(nowW, api._ctx);
	};

	return api;
})();

// ===== FRAME 1 =====
// Полный пример:
//   s_300: {}                                    — без анимаций (autoAlpha/autoCenter автоматически)
//   s_500: { common: fn }
//   s_625: { frame: fn }
//   s_984: { common: fn, frame: fn }              — оба на одном состоянии
BannerResponsive.mount(this, {
		s_300: {},
		s_500: {},
		s_625: {},
		s_984: {
			common: function (nowW, ctx) { /* доп. логика */ },
			frame: function (nowW, ctx) { /* FRAME ONLY */ },
		},
		s_1368: {},
	});

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

`
  },
  {
    id: 8,
    title: 'Новая растяжка Frame Next',
    code: `// ===== FRAME 70 =====
// Полный пример:
//   s_600: {}                                    — без анимаций
//   s_600: { common: function(nowW, ctx){ ... } }
//   s_600: { frame: function(nowW, ctx){ createjs.Tween.get(ctx.s_600.cube).to({ x: 0 }, 1000, createjs.Ease.cubicInOut); } }
//   s_600: { common: fn, frame: fn }              — оба на одном состоянии
if (!window.BannerResponsive) {
	throw new Error("BannerResponsive не найден. Откройте анимацию с первого кадра (где инициализируется BannerResponsive).");
}

BannerResponsive.mount(this, {
	s_600: {
		common: function (nowW, ctx) { /* доп. логика */ },
		frame: function (nowW, ctx) {
			createjs.Tween.get(ctx.s_600.cube).to({ x: 0 }, 1000, createjs.Ease.cubicInOut);
		},
	},
});

function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

`
  },
	
];
