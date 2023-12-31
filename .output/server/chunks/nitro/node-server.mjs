globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import gracefulShutdown from 'http-graceful-shutdown';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "prismic": {
      "endpoint": "https://slides-testing.cdn.prismic.io/api/v2",
      "clientConfig": {
        "routes": [
          {
            "type": "homepage",
            "path": "/"
          },
          {
            "type": "page",
            "path": "/:uid"
          }
        ]
      },
      "client": "~/app/prismic/client",
      "linkResolver": "~/app/prismic/linkResolver",
      "richTextSerializer": "~/app/prismic/richTextSerializer",
      "injectComponents": true,
      "components": {},
      "preview": false,
      "toolbar": true
    }
  }
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function trapUnhandledNodeErrors() {
  {
    process.on(
      "unhandledRejection",
      (err) => console.error("[nitro] [unhandledRejection] " + err)
    );
    process.on(
      "uncaughtException",
      (err) => console.error("[nitro]  [uncaughtException] " + err)
    );
  }
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(html);
});

const assets = {
  "/cover.png": {
    "type": "image/png",
    "etag": "\"85f80-Xvy/1DM1PZCEAU4eW+5LBqNwuQM\"",
    "mtime": "2023-11-08T01:42:36.134Z",
    "size": 548736,
    "path": "../public/cover.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"18cf6-dHS9aftiLKehVIkwmAKaSmou2go\"",
    "mtime": "2023-11-08T01:42:36.132Z",
    "size": 101622,
    "path": "../public/favicon.ico"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": "\"2ee-bUquvhvR8QIF8wqsd3zCbV79fIQ\"",
    "mtime": "2023-11-08T01:42:36.131Z",
    "size": 750,
    "path": "../public/favicon.png"
  },
  "/_nuxt/Inter-300-1.1c3007b8.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2023-11-08T01:42:36.130Z",
    "size": 27284,
    "path": "../public/_nuxt/Inter-300-1.1c3007b8.woff2"
  },
  "/_nuxt/Inter-300-2.eba94878.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2023-11-08T01:42:36.130Z",
    "size": 17600,
    "path": "../public/_nuxt/Inter-300-2.eba94878.woff2"
  },
  "/_nuxt/Inter-300-3.81f77e51.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2023-11-08T01:42:36.130Z",
    "size": 12732,
    "path": "../public/_nuxt/Inter-300-3.81f77e51.woff2"
  },
  "/_nuxt/Inter-300-4.d92c6cbc.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2023-11-08T01:42:36.129Z",
    "size": 22480,
    "path": "../public/_nuxt/Inter-300-4.d92c6cbc.woff2"
  },
  "/_nuxt/Inter-300-5.15df7612.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2023-11-08T01:42:36.129Z",
    "size": 10540,
    "path": "../public/_nuxt/Inter-300-5.15df7612.woff2"
  },
  "/_nuxt/Inter-300-6.a2bfd9fe.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2023-11-08T01:42:36.129Z",
    "size": 79940,
    "path": "../public/_nuxt/Inter-300-6.a2bfd9fe.woff2"
  },
  "/_nuxt/Inter-300-7.88df0b5a.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2023-11-08T01:42:36.129Z",
    "size": 46704,
    "path": "../public/_nuxt/Inter-300-7.88df0b5a.woff2"
  },
  "/_nuxt/Preloader.1bdc4099.js": {
    "type": "application/javascript",
    "etag": "\"e0f-wXqoEawoy7MuLc8mG4/y1qVgB3k\"",
    "mtime": "2023-11-08T01:42:36.129Z",
    "size": 3599,
    "path": "../public/_nuxt/Preloader.1bdc4099.js"
  },
  "/_nuxt/SlicesBlocks.e5e7ef01.js": {
    "type": "application/javascript",
    "etag": "\"bdd-YRVRbIwT74uBvZ0iRyWCaOYg3c4\"",
    "mtime": "2023-11-08T01:42:36.128Z",
    "size": 3037,
    "path": "../public/_nuxt/SlicesBlocks.e5e7ef01.js"
  },
  "/_nuxt/_commonjsHelpers.042e6b4d.js": {
    "type": "application/javascript",
    "etag": "\"2d5-P3zfHjX06vw2vuT4QCtYM1KnKLM\"",
    "mtime": "2023-11-08T01:42:36.128Z",
    "size": 725,
    "path": "../public/_nuxt/_commonjsHelpers.042e6b4d.js"
  },
  "/_nuxt/_uid_.49ec3eae.js": {
    "type": "application/javascript",
    "etag": "\"29f-Ql5eaYpl+uVjryYrAwZs4XeVxsQ\"",
    "mtime": "2023-11-08T01:42:36.128Z",
    "size": 671,
    "path": "../public/_nuxt/_uid_.49ec3eae.js"
  },
  "/_nuxt/_uid_.b74cd8a8.js": {
    "type": "application/javascript",
    "etag": "\"2aa-/MUE6KjE3JdIl2ceH7FCfopG0Dw\"",
    "mtime": "2023-11-08T01:42:36.128Z",
    "size": 682,
    "path": "../public/_nuxt/_uid_.b74cd8a8.js"
  },
  "/_nuxt/_uid_.efaa7fbd.js": {
    "type": "application/javascript",
    "etag": "\"268-+ygCq4dPLVNLwL4Mmn0a7kG52TY\"",
    "mtime": "2023-11-08T01:42:36.128Z",
    "size": 616,
    "path": "../public/_nuxt/_uid_.efaa7fbd.js"
  },
  "/_nuxt/browser.bdd0494e.js": {
    "type": "application/javascript",
    "etag": "\"5ed-MVaajcIsDU7aEcjzefMyzvWyK3g\"",
    "mtime": "2023-11-08T01:42:36.127Z",
    "size": 1517,
    "path": "../public/_nuxt/browser.bdd0494e.js"
  },
  "/_nuxt/custom.95d66afa.js": {
    "type": "application/javascript",
    "etag": "\"a8e-uPcxo1VC1UcX1udC9HNLcozbdKI\"",
    "mtime": "2023-11-08T01:42:36.127Z",
    "size": 2702,
    "path": "../public/_nuxt/custom.95d66afa.js"
  },
  "/_nuxt/default.f8777b63.js": {
    "type": "application/javascript",
    "etag": "\"194-1XHCwN6d+fN1Chsih58dI/tFvU4\"",
    "mtime": "2023-11-08T01:42:36.127Z",
    "size": 404,
    "path": "../public/_nuxt/default.f8777b63.js"
  },
  "/_nuxt/entry.2a97c8f1.js": {
    "type": "application/javascript",
    "etag": "\"4795f-jB2N5gPuWxCnmIcA/x6Y/3jaCW0\"",
    "mtime": "2023-11-08T01:42:36.127Z",
    "size": 293215,
    "path": "../public/_nuxt/entry.2a97c8f1.js"
  },
  "/_nuxt/graphik_bold.0f0505ca.woff": {
    "type": "font/woff",
    "etag": "\"8eb0-sB4FbGjj+HxNce/dsj/FV7/StrY\"",
    "mtime": "2023-11-08T01:42:36.126Z",
    "size": 36528,
    "path": "../public/_nuxt/graphik_bold.0f0505ca.woff"
  },
  "/_nuxt/graphik_bold.5e5a4e58.woff2": {
    "type": "font/woff2",
    "etag": "\"6edc-nPIrKmqutmVEschNb2YWaDYdyiQ\"",
    "mtime": "2023-11-08T01:42:36.126Z",
    "size": 28380,
    "path": "../public/_nuxt/graphik_bold.5e5a4e58.woff2"
  },
  "/_nuxt/graphik_light.1787594d.woff": {
    "type": "font/woff",
    "etag": "\"8d1c-FgGpT4TwdhzYWiNPFiMXAH4hEMw\"",
    "mtime": "2023-11-08T01:42:36.126Z",
    "size": 36124,
    "path": "../public/_nuxt/graphik_light.1787594d.woff"
  },
  "/_nuxt/graphik_light.7ba765ad.woff2": {
    "type": "font/woff2",
    "etag": "\"6e70-RwZ/l787UNkClc+VcsWBxj72XOc\"",
    "mtime": "2023-11-08T01:42:36.125Z",
    "size": 28272,
    "path": "../public/_nuxt/graphik_light.7ba765ad.woff2"
  },
  "/_nuxt/graphik_medium.996f8b02.woff2": {
    "type": "font/woff2",
    "etag": "\"7314-TFkbR2tgEQKixvTz8CPzBkvXl6c\"",
    "mtime": "2023-11-08T01:42:36.125Z",
    "size": 29460,
    "path": "../public/_nuxt/graphik_medium.996f8b02.woff2"
  },
  "/_nuxt/graphik_medium.a4b3ee6e.woff": {
    "type": "font/woff",
    "etag": "\"934c-NMsy6oYk2WTHgrPlCq8AIx0vyYA\"",
    "mtime": "2023-11-08T01:42:36.125Z",
    "size": 37708,
    "path": "../public/_nuxt/graphik_medium.a4b3ee6e.woff"
  },
  "/_nuxt/graphik_regular.562aef5a.woff2": {
    "type": "font/woff2",
    "etag": "\"6d60-8ww+G1CGp1cV9ebGde7lfk2DF3o\"",
    "mtime": "2023-11-08T01:42:36.125Z",
    "size": 28000,
    "path": "../public/_nuxt/graphik_regular.562aef5a.woff2"
  },
  "/_nuxt/graphik_regular.b135f130.woff": {
    "type": "font/woff",
    "etag": "\"8b70-L9pQ6oILChPumQohU3uUg+tvp+4\"",
    "mtime": "2023-11-08T01:42:36.125Z",
    "size": 35696,
    "path": "../public/_nuxt/graphik_regular.b135f130.woff"
  },
  "/_nuxt/index.6b10439a.js": {
    "type": "application/javascript",
    "etag": "\"37b-pBa+2v92nHIl43PtfbKVhCBXGgo\"",
    "mtime": "2023-11-08T01:42:36.124Z",
    "size": 891,
    "path": "../public/_nuxt/index.6b10439a.js"
  },
  "/_nuxt/prism-pug.95730773.js": {
    "type": "application/javascript",
    "etag": "\"57c3-6qT9Gc7HH6gYlIBsya2/w1Pmv6M\"",
    "mtime": "2023-11-08T01:42:36.124Z",
    "size": 22467,
    "path": "../public/_nuxt/prism-pug.95730773.js"
  },
  "/_nuxt/prism-pug.caf9166c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4fc-MzFz8HbP7g7XmXsiRrU6zgrluMo\"",
    "mtime": "2023-11-08T01:42:36.124Z",
    "size": 1276,
    "path": "../public/_nuxt/prism-pug.caf9166c.css"
  },
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f3a-oWcvAw5maAIij24nb6jt+OszsOg\"",
    "mtime": "2023-11-08T01:42:36.123Z",
    "size": 7994,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/fonts/Inter-300-1.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2023-11-08T01:42:36.122Z",
    "size": 27284,
    "path": "../public/fonts/Inter-300-1.woff2"
  },
  "/fonts/Inter-300-2.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2023-11-08T01:42:36.122Z",
    "size": 17600,
    "path": "../public/fonts/Inter-300-2.woff2"
  },
  "/fonts/Inter-300-3.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2023-11-08T01:42:36.122Z",
    "size": 12732,
    "path": "../public/fonts/Inter-300-3.woff2"
  },
  "/fonts/Inter-300-4.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2023-11-08T01:42:36.122Z",
    "size": 22480,
    "path": "../public/fonts/Inter-300-4.woff2"
  },
  "/fonts/Inter-300-5.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2023-11-08T01:42:36.122Z",
    "size": 10540,
    "path": "../public/fonts/Inter-300-5.woff2"
  },
  "/fonts/Inter-300-6.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2023-11-08T01:42:36.121Z",
    "size": 79940,
    "path": "../public/fonts/Inter-300-6.woff2"
  },
  "/fonts/Inter-300-7.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2023-11-08T01:42:36.121Z",
    "size": 46704,
    "path": "../public/fonts/Inter-300-7.woff2"
  },
  "/fonts/Inter-400-10.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2023-11-08T01:42:36.121Z",
    "size": 12732,
    "path": "../public/fonts/Inter-400-10.woff2"
  },
  "/fonts/Inter-400-11.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2023-11-08T01:42:36.121Z",
    "size": 22480,
    "path": "../public/fonts/Inter-400-11.woff2"
  },
  "/fonts/Inter-400-12.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2023-11-08T01:42:36.120Z",
    "size": 10540,
    "path": "../public/fonts/Inter-400-12.woff2"
  },
  "/fonts/Inter-400-13.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2023-11-08T01:42:36.120Z",
    "size": 79940,
    "path": "../public/fonts/Inter-400-13.woff2"
  },
  "/fonts/Inter-400-14.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2023-11-08T01:42:36.120Z",
    "size": 46704,
    "path": "../public/fonts/Inter-400-14.woff2"
  },
  "/fonts/Inter-400-8.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2023-11-08T01:42:36.120Z",
    "size": 27284,
    "path": "../public/fonts/Inter-400-8.woff2"
  },
  "/fonts/Inter-400-9.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2023-11-08T01:42:36.119Z",
    "size": 17600,
    "path": "../public/fonts/Inter-400-9.woff2"
  },
  "/fonts/Inter-500-15.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2023-11-08T01:42:36.119Z",
    "size": 27284,
    "path": "../public/fonts/Inter-500-15.woff2"
  },
  "/fonts/Inter-500-16.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2023-11-08T01:42:36.119Z",
    "size": 17600,
    "path": "../public/fonts/Inter-500-16.woff2"
  },
  "/fonts/Inter-500-17.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2023-11-08T01:42:36.118Z",
    "size": 12732,
    "path": "../public/fonts/Inter-500-17.woff2"
  },
  "/fonts/Inter-500-18.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2023-11-08T01:42:36.118Z",
    "size": 22480,
    "path": "../public/fonts/Inter-500-18.woff2"
  },
  "/fonts/Inter-500-19.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2023-11-08T01:42:36.118Z",
    "size": 10540,
    "path": "../public/fonts/Inter-500-19.woff2"
  },
  "/fonts/Inter-500-20.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2023-11-08T01:42:36.118Z",
    "size": 79940,
    "path": "../public/fonts/Inter-500-20.woff2"
  },
  "/fonts/Inter-500-21.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2023-11-08T01:42:36.117Z",
    "size": 46704,
    "path": "../public/fonts/Inter-500-21.woff2"
  },
  "/fonts/Inter-600-22.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2023-11-08T01:42:36.117Z",
    "size": 27284,
    "path": "../public/fonts/Inter-600-22.woff2"
  },
  "/fonts/Inter-600-23.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2023-11-08T01:42:36.117Z",
    "size": 17600,
    "path": "../public/fonts/Inter-600-23.woff2"
  },
  "/fonts/Inter-600-24.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2023-11-08T01:42:36.117Z",
    "size": 12732,
    "path": "../public/fonts/Inter-600-24.woff2"
  },
  "/fonts/Inter-600-25.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2023-11-08T01:42:36.116Z",
    "size": 22480,
    "path": "../public/fonts/Inter-600-25.woff2"
  },
  "/fonts/Inter-600-26.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2023-11-08T01:42:36.116Z",
    "size": 10540,
    "path": "../public/fonts/Inter-600-26.woff2"
  },
  "/fonts/Inter-600-27.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2023-11-08T01:42:36.116Z",
    "size": 79940,
    "path": "../public/fonts/Inter-600-27.woff2"
  },
  "/fonts/Inter-600-28.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2023-11-08T01:42:36.116Z",
    "size": 46704,
    "path": "../public/fonts/Inter-600-28.woff2"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    if (!event.handled) {
      event.node.res.statusCode = 304;
      event.node.res.end();
    }
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_zOvUGo = () => import('../handlers/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_zOvUGo, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_zOvUGo, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  gracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const listener = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
