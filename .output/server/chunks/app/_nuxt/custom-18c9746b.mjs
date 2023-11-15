import { _ as _export_sfc, u as usePrismic, a as useRoute, d as useAsyncData, t as transitions, C as Console, e as __nuxt_component_0$2, f as __nuxt_component_0 } from '../server.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2, b as __nuxt_component_3 } from './Preloader-945038db.mjs';
import { useSSRContext, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import 'gsap';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';
import 'destr';
import 'ohash';
import '@prismicio/client';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'defu';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const __default__ = {
  props: ["slices"],
  name: "list-doc",
  methods: {
    scrollToAnchor(e) {
      let $click = e.target.closest(".anchor");
      console.log($click);
      let anchor = $click.dataset.anchor;
      let $target = document.querySelector(`${anchor}`);
      let offset = parseInt($target.offsetTop) + window.innerWidth * 0.08;
      if (window.innerWidth > 700 && window.innerWidth < 1025) {
        offset = parseInt($target.offsetTop) + window.innerWidth * 0.02;
      } else if (window.innerWidth > 1024 && window.innerWidth < 1600) {
        offset = parseInt($target.offsetTop) + window.innerWidth * 0.1;
      } else if (window.innerWidth > 1599) {
        offset = parseInt($target.offsetTop) + window.innerWidth * 0.07;
      }
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  },
  mounted() {
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { client } = usePrismic();
    const route = useRoute();
    var page_name = null;
    if (route.params.section) {
      page_name = route.params.section;
    } else {
      page_name = route.params.uid;
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => client.getByUID("page", page_name)), __temp = await __temp, __restore(), __temp);
    const { data: slides } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(async () => {
      const document2 = await client.getAllByType("slide");
      return document2;
    }, "$LXgK4t4MpQ")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxtLink = __nuxt_component_0$2;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-doc" }, _attrs))}><div class="list-doc__hold"><div class="list-doc__ul">`);
      _push(ssrRenderComponent(_component_nuxtLink, {
        to: `/${unref(page_name)}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1${_scopeId}>${ssrInterpolate(unref(data).title)}</h1>`);
          } else {
            return [
              createVNode("h1", null, toDisplayString(unref(data).title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(data).chapters_list, (post, index) => {
        _push(`<ul class="list-doc__each"><!--[-->`);
        ssrRenderList(unref(slides), (post_list) => {
          _push(`<!--[-->`);
          if (post.chapter.uid === post_list.uid) {
            _push(`<li><details><summary>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/${unref(page_name)}/${post_list.uid}`
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(post_list.data.page_title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(post_list.data.page_title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<div class="icon-arrow"><svg width="100%" viewBox="0 0 72 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52.65 60.0106L0.486572 9.67753L9.51337 0.322479L71.35 59.9894L9.7831 119.667L0.735026 110.333L52.65 60.0106Z" fill="var(--black)"></path></svg></div></summary><div class="list-doc__childs"><!--[-->`);
            ssrRenderList(post_list.data.body, (item) => {
              _push(`<!--[-->`);
              if (item.slice_type === "doc_item") {
                _push(`<!--[-->`);
                ssrRenderList(item.items, (child) => {
                  _push(`<!--[-->`);
                  if (child.is_anchor) {
                    _push(`<div class="${ssrRenderClass([child.class, "list-doc__childs__each"])}">`);
                    _push(ssrRenderComponent(_component_NuxtLink, {
                      class: "anchor",
                      to: `/${unref(page_name)}/${post_list.uid}#${child.class}`,
                      "data-anchor": `#${child.class}`
                    }, {
                      default: withCtx((_, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                          _push2(`${ssrInterpolate(child.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(child.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent));
                    _push(`</div>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`<!--]-->`);
                });
                _push(`<!--]-->`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            });
            _push(`<!--]--></div></details></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ListDoc.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main$1;
const _sfc_main = {
  mounted() {
    const $current = document.querySelector(".page");
    transitions.firstEntrance();
    transitions.instancingPages($current, $current.dataset.page);
    new Console();
    console.log($current);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_MenuFixed = __nuxt_component_0;
  const _component_NumbIndicatorSlider = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  const _component_Preloader = __nuxt_component_3;
  const _component_ListDoc = __nuxt_component_4;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_MenuFixed, null, null, _parent));
  _push(ssrRenderComponent(_component_NumbIndicatorSlider, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(ssrRenderComponent(_component_Preloader, null, null, _parent));
  _push(ssrRenderComponent(_component_ListDoc, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/custom.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const custom = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { custom as default };
//# sourceMappingURL=custom-18c9746b.mjs.map
