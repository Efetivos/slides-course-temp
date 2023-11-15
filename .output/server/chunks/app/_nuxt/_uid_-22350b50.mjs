import { u as usePrismic, a as useRoute, b as useHead } from '../server.mjs';
import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
    const { data } = ([__temp, __restore] = withAsyncContext(() => client.getByUID("page", route.params.uid)), __temp = await __temp, __restore(), __temp);
    useHead({
      title: data.meta_title + " | VWLab",
      bodyAttrs: {
        class: "page"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "e-hvh e-wvw e-flex-col" }, _attrs))}><h1> This is course: ${ssrInterpolate(unref(data).title)}</h1></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[uid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_uid_-22350b50.mjs.map
