import "clsx";
import { u as useToasterStore, t as toast, a as update, e as endPause, s as startPause, p as prefersReducedMotion } from "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { c as current_component, b as attr_style, p as push, d as spread_props, a as pop, e as spread_attributes, f as attr_class, g as stringify, h as store_get, j as ensure_array_like, u as unsubscribe_stores } from "../../chunks/index3.js";
import { e as escape_html } from "../../chunks/attributes.js";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height }, false);
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts, pausedAt } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts, handlers };
}
function CheckmarkIcon($$payload, $$props) {
  let { primary = "#61d345", secondary = "#fff" } = $$props;
  $$payload.out += `<div class="svelte-11kvm4p"${attr_style("", {
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
}
function ErrorIcon($$payload, $$props) {
  let { primary = "#ff4b4b", secondary = "#fff" } = $$props;
  $$payload.out += `<div class="svelte-1ee93ns"${attr_style("", {
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
}
function LoaderIcon($$payload, $$props) {
  let { primary = "#616161", secondary = "#e0e0e0" } = $$props;
  $$payload.out += `<div class="svelte-1j7dflg"${attr_style("", {
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
}
function ToastIcon($$payload, $$props) {
  push();
  let { toast: toast2 } = $$props;
  let type = toast2.type;
  let Icon = toast2.icon;
  let iconTheme = toast2.iconTheme;
  if (typeof Icon === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="animated svelte-1kgeier">${escape_html(Icon)}</div>`;
  } else if (typeof Icon !== "undefined") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<!---->`;
    Icon($$payload, {});
    $$payload.out += `<!---->`;
  } else if (type !== "blank") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<div class="indicator svelte-1kgeier">`;
    LoaderIcon($$payload, spread_props([iconTheme]));
    $$payload.out += `<!----> `;
    if (type !== "loading") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="status svelte-1kgeier">`;
      if (type === "error") {
        $$payload.out += "<!--[-->";
        ErrorIcon($$payload, spread_props([iconTheme]));
      } else {
        $$payload.out += "<!--[!-->";
        CheckmarkIcon($$payload, spread_props([iconTheme]));
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ToastMessage($$payload, $$props) {
  push();
  let { toast: toast2 } = $$props;
  let Message = toast2.message;
  $$payload.out += `<div${spread_attributes({ class: "message", ...toast2.ariaProps }, "svelte-1nauejd")}>`;
  if (typeof toast2.message === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(toast2.message)}`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    Message($$payload, spread_props([{ toast: toast2 }, toast2.props]));
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function children$1($$payload, data) {
  ToastIcon($$payload, { toast: data.toast });
  $$payload.out += `<!----> `;
  ToastMessage($$payload, { toast: data.toast });
  $$payload.out += `<!---->`;
}
function ToastBar($$payload, $$props) {
  push();
  let {
    toast: toast2,
    position = void 0,
    Component = void 0
  } = $$props;
  let top = (toast2.position || position || "top-center").includes("top");
  let factor = top ? 1 : -1;
  const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
  let animation = toast2.visible ? enter : exit;
  $$payload.out += `<div${attr_class(`base ${stringify(toast2.height ? animation : "transparent")} ${stringify(toast2.className || "")}`, "svelte-1c9srrs")}${attr_style(toast2.style, { "--factor": factor })}>`;
  if (Component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Component($$payload, {
      $$slots: {
        icon: ($$payload2) => {
          ToastIcon($$payload2, { toast: toast2 });
        },
        message: ($$payload2) => {
          ToastMessage($$payload2, { toast: toast2 });
        }
      }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    children$1($$payload, { toast: toast2 });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function children($$payload, data) {
  ToastBar($$payload, {
    toast: data.toast,
    position: data.toast.position
  });
}
function ToastWrapper($$payload, $$props) {
  push();
  let { toast: toast2 } = $$props;
  let top = toast2.position?.includes("top") ? 0 : null;
  let bottom = toast2.position?.includes("bottom") ? 0 : null;
  let factor = toast2.position?.includes("top") ? 1 : -1;
  let justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
  $$payload.out += `<div${attr_class("wrapper svelte-v01oml", void 0, {
    "active": toast2.visible,
    "transition": !prefersReducedMotion()
  })}${attr_style("", {
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}>`;
  if (toast2.type === "custom") {
    $$payload.out += "<!--[-->";
    ToastMessage($$payload, { toast: toast2 });
  } else {
    $$payload.out += "<!--[!-->";
    children($$payload, { toast: toast2 });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Toaster($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    reverseOrder = false,
    toastOptions,
    position = "top-center",
    gutter = 8,
    containerStyle,
    containerClassName
  } = $$props;
  const { toasts, handlers: handlers2 } = useToaster(toastOptions);
  let _toasts = store_get($$store_subs ??= {}, "$toasts", toasts).map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, store_get($$store_subs ??= {}, "$toasts", toasts), {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  const each_array = ensure_array_like(_toasts);
  $$payload.out += `<div${attr_class(`toaster ${stringify(containerClassName || "")}`, "svelte-1phplh9")}${attr_style(containerStyle)} role="alert"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let toast2 = each_array[$$index];
    ToastWrapper($$payload, {
      toast: toast2
    });
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  let { children: children2 } = $$props;
  Toaster($$payload, { position: "top-center" });
  $$payload.out += `<!----> `;
  children2($$payload);
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};
