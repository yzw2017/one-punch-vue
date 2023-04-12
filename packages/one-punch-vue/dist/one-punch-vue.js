import { defineComponent, computed, createVNode, unref, getCurrentScope, onScopeDispose, getCurrentInstance, onMounted, nextTick, watch, customRef, onUpdated, ref, shallowRef, watchPostEffect, openBlock, createBlock, Teleport, Transition, withCtx, createElementBlock, createElementVNode, Fragment, normalizeStyle, normalizeClass, createCommentVNode, renderList, toDisplayString, pushScopeId, popScopeId, createApp } from 'vue';

const index$3 = '';

const Button = /* @__PURE__ */ defineComponent({
  name: 'opButton',
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'md'
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  emits: ['click'],
  setup(props, {
    slots,
    emit
  }) {
    return () => {
      const {
        type,
        size,
        htmlType
      } = props;
      const classes = computed(() => {
        return {
          'ant-btn': true,
          [`ant-btn-${type}`]: type,
          [`ant-btn-${size}`]: size
        };
      });
      const clickFn = e => {
        emit('click');
      };
      return createVNode("button", {
        "class": classes.value,
        "onClick": clickFn,
        "type": htmlType
      }, [slots.default?.()]);
    };
  }
});

const index$2 = '';

const Space = /* @__PURE__ */ defineComponent({
  name: 'opSpace',
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    size: {
      type: Number,
      default: 8
    }
  },
  setup(props, {
    slots
  }) {
    return () => {
      const {
        direction,
        size
      } = props;
      const classes = computed(() => {
        return {
          'ant-space': true,
          [`ant-space-${direction}`]: direction
        };
      });
      return createVNode("div", {
        "class": classes.value,
        "style": {
          gap: size + 'px'
        }
      }, [slots.default?.()]);
    };
  }
});

const index$1 = '';

const Input = /* @__PURE__ */ defineComponent({
  name: 'opInput',
  props: {
    modelValue: {
      type: String
    },
    size: {
      type: String,
      default: 'md'
    },
    status: {
      type: String
    }
  },
  emits: ['update:modelValue', 'change', 'blur'],
  setup(props, {
    emit
  }) {
    return () => {
      const {
        size,
        status,
        modelValue
      } = props;
      const classes = computed(() => {
        return {
          'ant-input': true,
          [`ant-input-${size}`]: size,
          [`ant-input-status-${status}`]: status
        };
      });
      const onInputChange = e => {
        const target = e.target;
        emit('change', target.value);
        emit('update:modelValue', target.value);
      };
      const onBlur = e => {
        const target = e.target;
        emit('blur', target.value);
      };
      return createVNode("input", {
        "class": classes.value,
        "value": modelValue,
        "onInput": onInputChange,
        "onBlur": onBlur
      }, null);
    };
  }
});

var _a;
const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function identity(arg) {
  return arg;
}

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}

function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}

const defaultWindow = isClient ? window : void 0;

function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener, options2));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}

function templateRef(key, initialValue = null) {
  const instance = getCurrentInstance();
  let _trigger = () => {
  };
  const element = customRef((track, trigger) => {
    _trigger = trigger;
    return {
      get() {
        var _a, _b;
        track();
        return (_b = (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$refs[key]) != null ? _b : initialValue;
      },
      set() {
      }
    };
  });
  tryOnMounted(_trigger);
  onUpdated(_trigger);
  return element;
}

const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};

var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);

const _sfc_main = defineComponent({
  name: "opValidate",
  props: {
    show: {
      type: Boolean
    },
    imgUrl: {
      type: String,
      required: true
    },
    valiUrl: {
      type: String,
      required: true
    },
    container: {
      type: String,
      default: "body"
    }
  },
  emits: ["close", "success", "fail"],
  setup(props, { emit }) {
    const status = ref("free");
    const captcha = shallowRef();
    const clickImgPoints = ref([]);
    const clickImgStyle = computed(() => {
      const { tipWidth, src } = captcha.value;
      return { width: tipWidth + "px", backgroundImage: `url(${src})` };
    });
    const sliderRef = templateRef("sliderRef", null);
    const sliderBtnRef = templateRef("sliderBtnRef", null);
    const sliderBorderRef = templateRef("sliderBorderRef", null);
    const imgWrap = templateRef("imgWrap", null);
    const floatImgRef = templateRef("floatImgRef", null);
    const ready = computed(() => captcha.value && props.show);
    watchPostEffect(async () => {
      if (props.show) {
        await init();
      } else {
        status.value = "free";
        captcha.value = null;
      }
    });
    async function init() {
      const result = await (await fetch(props.imgUrl)).json();
      const { captcha: json } = result;
      captcha.value = JSON.parse(json);
    }
    const sliderMoving = computed(() => {
      return props.show && status.value === "pending" && captcha.value.type === 1;
    });
    let clicked = 0;
    let startX = 0;
    let btnWidth = 0;
    let floatImgWidth = 0;
    function mousedown(event) {
      event.stopPropagation();
      status.value = "pending";
      startX = event.clientX;
      btnWidth = sliderBtnRef.value.offsetWidth;
      floatImgWidth = floatImgRef.value.offsetWidth;
    }
    function mousemove(event) {
      event.stopPropagation();
      if (!sliderMoving.value) {
        return;
      }
      const clientX = event.clientX;
      const diff = clientX - startX;
      function btnMove() {
        const max = sliderRef.value.clientWidth - btnWidth;
        const left = diff >= max ? max : diff <= 0 ? 0 : diff;
        sliderBtnRef.value.style.left = left + "px";
        sliderBorderRef.value.style.width = sliderBtnRef.value.offsetLeft + btnWidth + "px";
      }
      function imgMove() {
        const max = imgWrap.value.clientWidth - floatImgWidth;
        const left = diff >= max ? max : diff <= 0 ? 0 : diff;
        floatImgRef.value.style.left = left + "px";
      }
      btnMove();
      imgMove();
    }
    async function mouseup(event) {
      event.stopPropagation();
      if (!sliderMoving.value) {
        return;
      }
      status.value = "ajax";
      const { offsetLeft } = sliderBtnRef.value;
      const { token } = captcha.value;
      const result = await validateFn(offsetLeft, token);
      if (result) {
        status.value = "success";
        setTimeout(() => {
          emit("success", token);
        }, 1e3);
      } else {
        status.value = "fail";
        setTimeout(() => {
          emit("fail");
          refresh();
        }, 1e3);
      }
    }
    useEventListener(document, "mousemove", mousemove);
    useEventListener(document, "mouseup", mouseup);
    async function validateFn(value, token) {
      const result = await (await fetch(props.valiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `cvp.value=${value}&cvp.token=${token}`
      })).json();
      return result.success;
    }
    function reset() {
      const { type } = captcha.value;
      if (type === 1) {
        sliderBtnRef.value.style.left = "0";
        sliderBorderRef.value.style.width = "0";
      } else if (type === 2) {
        clicked = 0;
        clickImgPoints.value = [];
      }
      status.value = "free";
    }
    function refresh() {
      reset();
      init();
    }
    async function handleImgClick(event) {
      event.stopPropagation();
      clicked++;
      const { characters: max } = captcha.value;
      const x = event.offsetX;
      const y = event.offsetY;
      if (clicked <= max) {
        status.value = "pending";
        const left = x - 25 / 2;
        const top = y - 25 / 2;
        clickImgPoints.value.push({ id: "a" + clicked, left, top, x, y });
        if (clicked === max) {
          status.value = "ajax";
          const { token } = captcha.value;
          let value = [];
          clickImgPoints.value.forEach((item) => {
            value.push(item.x, item.y);
          });
          const result = await validateFn(value.join(), token);
          if (result) {
            status.value = "success";
            setTimeout(() => {
              emit("success", token);
            }, 1e3);
          } else {
            status.value = "fail";
            setTimeout(() => {
              emit("fail");
              refresh();
            }, 1e3);
          }
        }
      }
    }
    return {
      ready,
      status,
      captcha,
      mousedown,
      clickImgPoints,
      clickImgStyle,
      handleImgClick,
      refresh
    };
  }
});

const index_vue_vue_type_style_index_0_scoped_b5bc8801_lang = '';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _withScopeId = (n) => (pushScopeId("data-v-b5bc8801"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "mask"
};
const _hoisted_2 = { class: "box" };
const _hoisted_3 = {
  class: "img-wrap",
  ref: "imgWrap"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = ["src"];
const _hoisted_6 = {
  class: "slider-control",
  ref: "sliderRef"
};
const _hoisted_7 = {
  key: 0,
  class: "slider-tips"
};
const _hoisted_8 = { class: "img-wrap" };
const _hoisted_9 = ["src"];
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "\u8BF7\u4F9D\u6B21\u70B9\u51FB", -1));
const _hoisted_11 = { class: "bottom" };
const _hoisted_12 = { class: "bottom-left" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "bottom-right" }, "\u6839\u636E\u5353\u535A\u9A8C\u8BC1\u673A\u5236\u63D0\u4F9B", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: _ctx.container }, [
    createVNode(Transition, null, {
      default: withCtx(() => [
        _ctx.ready ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createElementVNode("div", _hoisted_2, [
            _ctx.captcha.type === 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createElementVNode("div", _hoisted_3, [
                createElementVNode("img", {
                  src: _ctx.captcha.src,
                  draggable: "false"
                }, null, 8, _hoisted_4),
                createElementVNode("img", {
                  ref: "floatImgRef",
                  class: "float",
                  src: _ctx.captcha.dst,
                  style: normalizeStyle("top:" + _ctx.captcha.y + "px"),
                  draggable: "false",
                  onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.mousedown && _ctx.mousedown(...args))
                }, null, 44, _hoisted_5)
              ], 512),
              createElementVNode("div", _hoisted_6, [
                createElementVNode("div", {
                  class: normalizeClass(["slider-border", [_ctx.status]]),
                  ref: "sliderBorderRef"
                }, null, 2),
                createElementVNode("div", {
                  ref: "sliderBtnRef",
                  class: normalizeClass(["slider-btn", [_ctx.status]]),
                  onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.mousedown && _ctx.mousedown(...args))
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(["slider-icon", [_ctx.status]])
                  }, null, 2)
                ], 34),
                _ctx.status === "free" ? (openBlock(), createElementBlock("div", _hoisted_7, "\u5411\u53F3\u62D6\u52A8\u6ED1\u5757\u586B\u5145\u62FC\u56FE")) : createCommentVNode("", true)
              ], 512)
            ], 64)) : _ctx.captcha.type === 2 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("div", _hoisted_8, [
                createElementVNode("img", {
                  class: "base",
                  draggable: "false",
                  onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleImgClick && _ctx.handleImgClick(...args)),
                  src: _ctx.captcha.src
                }, null, 8, _hoisted_9),
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.clickImgPoints, (item) => {
                  return openBlock(), createElementBlock("i", {
                    key: item.id,
                    class: normalizeClass(["point", item.id]),
                    style: normalizeStyle(`top:${item.top}px;left:${item.left}px`)
                  }, null, 6);
                }), 128))
              ]),
              createElementVNode("div", {
                class: normalizeClass(["text-control", [_ctx.status]])
              }, [
                !["success", "fail"].includes(_ctx.status) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  _hoisted_10,
                  createElementVNode("span", {
                    class: "clickImg",
                    style: normalizeStyle(_ctx.clickImgStyle)
                  }, null, 4)
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createElementVNode("i", {
                    class: normalizeClass(["icon", [_ctx.status]])
                  }, null, 2),
                  createElementVNode("span", null, toDisplayString(_ctx.status === "success" ? "\u9A8C\u8BC1\u6210\u529F" : "\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"), 1)
                ], 64))
              ], 2)
            ], 64)) : createCommentVNode("", true),
            createElementVNode("div", _hoisted_11, [
              createElementVNode("div", _hoisted_12, [
                createElementVNode("a", {
                  class: "bottom-close",
                  onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("close"))
                }),
                createElementVNode("a", {
                  class: "bottom-refresh",
                  onClick: _cache[4] || (_cache[4] = (...args) => _ctx.refresh && _ctx.refresh(...args))
                })
              ]),
              _hoisted_13
            ])
          ])
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 8, ["to"]);
}
const Validate = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5bc8801"]]);

const index = '';

const Loading = /* @__PURE__ */ defineComponent({
  name: "opLoading",
  render() {
    return createVNode("div", {
      "class": "el-loading-mask"
    }, [createVNode("div", {
      "class": "el-loading-spinner"
    }, [createVNode("svg", {
      "viewBox": "25 25 50 50",
      "class": "circular"
    }, [createVNode("circle", {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none",
      "class": "path"
    }, null)])])]);
  }
});

function addClass(el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}
function removeClass(el, className) {
  el.classList.remove(className);
}

const relativeCls = "g-relative";
const directivesLoading = (Comp) => {
  function append(el) {
    const name = Comp.name;
    const style = getComputedStyle(el);
    if (!["absolute", "fixed", "relative"].includes(style.position)) {
      addClass(el, relativeCls);
    }
    el.appendChild(el[name].instance.$el);
  }
  function remove(el) {
    const name = Comp.name;
    removeClass(el, relativeCls);
    el.removeChild(el[name].instance.$el);
  }
  return {
    mounted(el, binding) {
      const app = createApp(Comp);
      const instance = app.mount(document.createElement("div"));
      const name = Comp.name;
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;
      if (binding.value) {
        append(el);
      }
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    }
  };
};

const main = {
  install(app) {
    app.component(Button.name, Button);
    app.component(Space.name, Space);
    app.component(Input.name, Input);
    app.component(Validate.name, Validate);
    app.directive("loading", directivesLoading(Loading));
  }
};

export { Button, Input, Space, Validate, main as default };
