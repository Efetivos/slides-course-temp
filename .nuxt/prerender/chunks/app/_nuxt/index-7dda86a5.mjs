import { b as usePrismic, e as useAsyncData, u as useHead } from '../server.mjs';
import { withAsyncContext, mergeProps, unref, useSSRContext } from 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/hookable/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/unctx/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/h3/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/ufo/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/gsap/dist/gsap.js';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/unhead/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/destr/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/ohash/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/@prismicio/client/dist/index.js';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/scule/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/klona/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/victorcosta/Documents/DEV/experiments/courses-slides-testing/node_modules/pathe/dist/index.mjs';

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
    const { data: slides } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(async () => {
      const document = await client.getAllByType("slide");
      return document;
    }, "$PslAyef5YX")), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Home | " + data.meta_title,
      bodyAttrs: {
        class: "index"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "page page-index index",
        "data-page": "index"
      }, _attrs))}><h1>${ssrInterpolate(unref(data).title)}</h1><ul><!--[-->`);
      ssrRenderList(unref(data).chapters_list, (post) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(slides), (post_list) => {
          _push(`<!--[-->`);
          if (post.chapter.uid === post_list.uid) {
            _push(`<li></li>`);
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
//# sourceMappingURL=index-7dda86a5.mjs.map
