import { u as usePrismic, d as useAsyncData, b as useHead } from '../server.mjs';
import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { client } = usePrismic();
    const { data } = ([__temp, __restore] = withAsyncContext(() => client.getSingle("homepage")), __temp = await __temp, __restore(), __temp);
    const { data: pages } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(async () => {
      const document = await client.getAllByType("page");
      return document;
    }, "$PslAyef5YX")), __temp = await __temp, __restore(), __temp);
    useHead({
      title: data.meta_title + " | VWLab",
      bodyAttrs: {
        class: "index"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "page page-index e-flex-col e-wvw e-hvh",
        "data-page": "index"
      }, _attrs))}><ul class="course-list"><!--[-->`);
      ssrRenderList(unref(data).course_list, (course, index) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(pages), (pages_list) => {
          _push(`<!--[-->`);
          if (course.course.uid === pages_list.uid) {
            _push(`<li><a${ssrRenderAttr("href", `/${course.course.uid}`)}>${ssrInterpolate(pages_list.data.title)}</a></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-b88a832e.mjs.map
