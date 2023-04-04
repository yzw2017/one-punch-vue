import { defineComponent as p, computed as d, createVNode as c, createApp as y } from "vue";
const m = /* @__PURE__ */ p({
  name: "opButton",
  props: {
    type: {
      type: String,
      default: "normal"
    },
    size: {
      type: String,
      default: "md"
    },
    htmlType: {
      type: String,
      default: "button"
    }
  },
  emits: ["click"],
  setup(e, {
    slots: a,
    emit: s
  }) {
    return () => {
      const {
        type: t,
        size: n,
        htmlType: u
      } = e, i = d(() => ({
        "ant-btn": !0,
        [`ant-btn-${t}`]: t,
        [`ant-btn-${n}`]: n
      })), o = (l) => {
        s("click");
      };
      return c("button", {
        class: i.value,
        onClick: o,
        type: u
      }, [a.default?.()]);
    };
  }
});
const v = /* @__PURE__ */ p({
  name: "opSpace",
  props: {
    direction: {
      type: String,
      default: "horizontal"
    },
    size: {
      type: Number,
      default: 8
    }
  },
  setup(e, {
    slots: a
  }) {
    return () => {
      const {
        direction: s,
        size: t
      } = e, n = d(() => ({
        "ant-space": !0,
        [`ant-space-${s}`]: s
      }));
      return c("div", {
        class: n.value,
        style: {
          gap: t + "px"
        }
      }, [a.default?.()]);
    };
  }
});
const f = /* @__PURE__ */ p({
  name: "opInput",
  props: {
    modelValue: {
      type: String
    },
    size: {
      type: String,
      default: "md"
    },
    status: {
      type: String
    }
  },
  emits: ["update:modelValue", "change", "blur"],
  setup(e, {
    emit: a
  }) {
    return () => {
      const {
        size: s,
        status: t,
        modelValue: n
      } = e, u = d(() => ({
        "ant-input": !0,
        [`ant-input-${s}`]: s,
        [`ant-input-status-${t}`]: t
      })), i = (l) => {
        const r = l.target;
        a("change", r.value), a("update:modelValue", r.value);
      }, o = (l) => {
        const r = l.target;
        a("blur", r.value);
      };
      return c("input", {
        class: u.value,
        value: n,
        onInput: i,
        onBlur: o
      }, null);
    };
  }
});
const S = /* @__PURE__ */ p({
  name: "opLoading",
  render() {
    return c("div", {
      class: "el-loading-mask"
    }, [c("div", {
      class: "el-loading-spinner"
    }, [c("svg", {
      viewBox: "25 25 50 50",
      class: "circular"
    }, [c("circle", {
      cx: "50",
      cy: "50",
      r: "20",
      fill: "none",
      class: "path"
    }, null)])])]);
  }
});
function $(e, a) {
  e.classList.contains(a) || e.classList.add(a);
}
function h(e, a) {
  e.classList.remove(a);
}
const g = "g-relative", x = (e) => {
  function a(t) {
    const n = e.name, u = getComputedStyle(t);
    ["absolute", "fixed", "relative"].includes(u.position) || $(t, g), t.appendChild(t[n].instance.$el);
  }
  function s(t) {
    const n = e.name;
    h(t, g), t.removeChild(t[n].instance.$el);
  }
  return {
    mounted(t, n) {
      const i = y(e).mount(document.createElement("div")), o = e.name;
      t[o] || (t[o] = {}), t[o].instance = i, n.value && a(t);
    },
    updated(t, n) {
      n.value !== n.oldValue && (n.value ? a(t) : s(t));
    }
  };
}, z = {
  install(e) {
    e.component(m.name, m), e.component(v.name, v), e.component(f.name, f), e.directive("loading", x(S));
  }
};
export {
  m as Button,
  f as Input,
  v as Space,
  z as default
};
