import { _ as __nuxt_component_0 } from './SlicesBlocks-b510215f.mjs';
import { u as usePrismic, a as useRoute, b as useHead } from '../server.mjs';
import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import Prism from 'prismjs';
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
  methods: {
    scrollDown(event) {
    }
  },
  mounted() {
    Prism.highlightAll();
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "[uid]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { client } = usePrismic();
    const route = useRoute();
    ref();
    const { data } = ([__temp, __restore] = withAsyncContext(() => client.getByUID("slide", route.params.uid)), __temp = await __temp, __restore(), __temp);
    useHead({
      title: data.meta_title,
      bodyAttrs: {
        class: "chapter"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SlicesBlocks = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-page": "chapter",
        class: "page page-chapter"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SlicesBlocks, {
        slices: unref(data).body
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chapter/[uid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_uid_-d1aab48d.mjs.map
