import { _ as _export_sfc, P as PrismicRichText } from '../server.mjs';
import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';

function ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_prismic_rich_text = PrismicRichText;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "slice-docitem",
    "data-id": $props.slice.primary.identifier,
    id: $props.slice.primary.identifier
  }, _attrs))}>`);
  if ($props.slice.primary.section_title) {
    _push(`<h1>${ssrInterpolate($props.slice.primary.section_title)}</h1>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="slice-docitem__texts"><ul class="slice-docitem__texts__list"><!--[-->`);
  ssrRenderList($props.slice.items, (item) => {
    _push(`<li class="${ssrRenderClass([[item.is_anchor ? `sub-item ${item.class}` : item.class], "sub-item"])}"${ssrRenderAttr("id", item.class)}>`);
    if (item.title) {
      _push(`<h1 class="slice-docitem__texts__each__title">${ssrInterpolate(item.title)}</h1>`);
    } else {
      _push(`<!---->`);
    }
    if (item.video.url) {
      _push(`<video class="slice-docitem__video lazyvideo" muted controls height="fit-content"><source${ssrRenderAttr("src", item.video.url)} type="video/mp4"></video>`);
    } else {
      _push(`<!---->`);
    }
    if (item.rich.length > 0) {
      _push(ssrRenderComponent(_component_prismic_rich_text, {
        class: "rich-t subt-title slice-docitem__parag",
        field: item.rich
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(item.rich)}`);
          } else {
            return [
              createTextVNode(toDisplayString(item.rich), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
    } else {
      _push(`<!---->`);
    }
    if (item.code) {
      _push(`<div class="${ssrRenderClass([[item.path ? "has-path" : null], "slice-docitem__code"])}">`);
      if (item.path) {
        _push(`<div class="slice-docitem__code__path">${ssrInterpolate(item.path)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<pre><code class="${ssrRenderClass([`language-${item.code_lang}`, "code"])}">${ssrInterpolate(item.code)}</code></pre><div class="slice-docitem__code__copy e-flex"><div class="slice-docitem__code__copy__svg"><svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460" style="${ssrRenderStyle({ "enable-background": "new 0 0 460 460" })}" xml:space="preserve"><path d="M425.93 0H171.66a32.9 32.9 0 0 0-32.86 32.86V110h30V32.86a2.87 2.87 0 0 1 2.86-2.86h254.27a2.87 2.87 0 0 1 2.87 2.86v254.28a2.87 2.87 0 0 1-2.87 2.86H351.2v30h74.73a32.9 32.9 0 0 0 32.87-32.86V32.86A32.9 32.9 0 0 0 425.93 0z"></path><path d="M288.34 140H34.07A32.9 32.9 0 0 0 1.2 172.86v254.27A32.9 32.9 0 0 0 34.07 460h254.27a32.9 32.9 0 0 0 32.87-32.86V172.86A32.9 32.9 0 0 0 288.33 140zm0 290H34.07a2.87 2.87 0 0 1-2.87-2.86V172.86a2.87 2.87 0 0 1 2.87-2.86h254.27a2.87 2.87 0 0 1 2.87 2.86v254.28a2.87 2.87 0 0 1-2.87 2.86z"></path></svg></div></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</li>`);
  });
  _push(`<!--]--></ul></div></div>`);
}
const _sfc_main$1 = {
  name: "slice-docitem",
  props: ["slice"],
  methods: {
    copyClipboard(event) {
      const $btnCopy = event.target.closest(".slice-docitem__code__copy");
      const $code = event.target.closest(".slice-docitem__code").querySelector(".code");
      $btnCopy.classList.add("is-copied");
      navigator.clipboard.writeText($code.textContent);
      const removeCopied = setTimeout(() => {
        $btnCopy.classList.remove("is-copied");
        clearTimeout(removeCopied);
      }, 1500);
    }
  },
  mounted() {
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/slices/SliceDocItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SliceDocItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", ssrRender$1]]);
function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SliceDocItem = resolveComponent("SliceDocItem");
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "slices" }, _attrs))}><!--[-->`);
  ssrRenderList($props.slices, (slice, index) => {
    _push(`<!--[-->`);
    if (slice.slice_type === "doc_item") {
      _push(ssrRenderComponent(_component_SliceDocItem, { slice }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></main>`);
}
const _sfc_main = {
  props: ["slices"],
  name: "slice-blocks",
  components: { SliceDocItem },
  mounted() {
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SlicesBlocks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=SlicesBlocks-b510215f.mjs.map
