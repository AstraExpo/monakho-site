import * as _ from 'node:fs';
import { V, l, L, O as O$1 } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import 'react';
import 'node:stream';
import 'react-dom/server';
import 'node:stream/web';

function g(e) {
  if (Array.isArray(e)) return e.flatMap((d) => g(d));
  if (typeof e != "string") return [];
  const n = [];
  let t = 0, r, s, o, i, a;
  const c = () => {
    for (; t < e.length && /\s/.test(e.charAt(t)); ) t += 1;
    return t < e.length;
  }, l = () => (s = e.charAt(t), s !== "=" && s !== ";" && s !== ",");
  for (; t < e.length; ) {
    for (r = t, a = false; c(); ) if (s = e.charAt(t), s === ",") {
      for (o = t, t += 1, c(), i = t; t < e.length && l(); ) t += 1;
      t < e.length && e.charAt(t) === "=" ? (a = true, t = i, n.push(e.slice(r, o)), r = t) : t = o + 1;
    } else t += 1;
    (!a || t >= e.length) && n.push(e.slice(r, e.length));
  }
  return n;
}
function E(e) {
  return e instanceof Headers ? new Headers(e) : Array.isArray(e) ? new Headers(e) : typeof e == "object" ? new Headers(e) : new Headers();
}
function O(...e) {
  return e.reduce((n, t) => {
    const r = E(t);
    for (const [s, o] of r.entries()) s === "set-cookie" ? g(o).forEach((a) => n.append("set-cookie", a)) : n.set(s, o);
    return n;
  }, new Headers());
}
const T = [];
function p(e, n) {
  const t = n || e || {};
  return typeof t.method > "u" && (t.method = "GET"), { options: t, middleware: (r) => p(void 0, Object.assign(t, { middleware: r })), validator: (r) => p(void 0, Object.assign(t, { validator: r })), type: (r) => p(void 0, Object.assign(t, { type: r })), handler: (...r) => {
    const [s, o] = r;
    Object.assign(t, { ...s, extractedFn: s, serverFn: o });
    const i = [...t.middleware || [], H(t)];
    return Object.assign(async (a) => m(i, "client", { ...s, ...t, data: a == null ? void 0 : a.data, headers: a == null ? void 0 : a.headers, signal: a == null ? void 0 : a.signal, context: {} }).then((c) => {
      if (t.response === "full") return c;
      if (c.error) throw c.error;
      return c.result;
    }), { ...s, __executeServer: async (a, c) => {
      const l = a instanceof FormData ? I(a) : a;
      l.type = typeof t.type == "function" ? t.type(l) : t.type;
      const d = { ...s, ...l, signal: c }, h = () => m(i, "server", d).then((u) => ({ result: u.result, error: u.error, context: u.sendContext }));
      if (d.type === "static") {
        let u;
        if ((f == null ? void 0 : f.getItem) && (u = await f.getItem(d)), u || (u = await h().then((w) => ({ ctx: w, error: null })).catch((w) => ({ ctx: void 0, error: w })), (f == null ? void 0 : f.setItem) && await f.setItem(d, u)), V(u), u.error) throw u.error;
        return u.ctx;
      }
      return h();
    } });
  } };
}
async function m(e, n, t) {
  const r = A([...T, ...e]), s = async (o) => {
    const i = r.shift();
    if (!i) return o;
    i.options.validator && (n !== "client" || i.options.validateClient) && (o.data = await N(i.options.validator, o.data));
    const a = n === "client" ? i.options.client : i.options.server;
    return a ? M(a, o, async (c) => s(c).catch((l) => {
      if (L(l) || O$1(l)) return { ...c, error: l };
      throw l;
    })) : s(o);
  };
  return s({ ...t, headers: t.headers || {}, sendContext: t.sendContext || {}, context: t.context || {} });
}
let f;
function x(e) {
  const n = f;
  return f = typeof e == "function" ? e() : e, () => {
    f = n;
  };
}
x(() => {
  const e = (r, s) => `/__tsr/staticServerFnCache/${r.functionId}__${s}.json`, n = (r) => JSON.stringify(r != null ? r : "", (i, a) => a && typeof a == "object" && !Array.isArray(a) ? Object.keys(a).sort().reduce((c, l) => (c[l] = a[l], c), {}) : a).replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "_"), t = typeof document < "u" ? /* @__PURE__ */ new Map() : null;
  return { getItem: async (r) => {
    if (typeof document > "u") {
      const s = n(r.data), o = e(r, s), i = "/home/astra/Documents/astraExpo/monakho-site/.output/public", { promises: a } = await import('node:fs'), l$1 = (await import('node:path')).join(i, o), [d, h] = await a.readFile(l$1, "utf-8").then((u) => [l.parse(u), null]).catch((u) => [null, u]);
      if (h && h.code !== "ENOENT") throw h;
      return d;
    }
  }, setItem: async (r, s) => {
    const { promises: o } = await import('node:fs'), i = await import('node:path'), a = n(r.data), c = e(r, a), d = i.join("/home/astra/Documents/astraExpo/monakho-site/.output/public", c);
    await o.mkdir(i.dirname(d), { recursive: true }), await o.writeFile(d, l.stringify(s));
  }, fetchItem: async (r) => {
    const s = n(r.data), o = e(r, s);
    let i = t == null ? void 0 : t.get(o);
    return i || (i = await fetch(o, { method: "GET" }).then((a) => a.text()).then((a) => l.parse(a)), t == null ? void 0 : t.set(o, i)), i;
  } };
});
function I(e) {
  const n = e.get("__TSR_CONTEXT");
  if (e.delete("__TSR_CONTEXT"), typeof n != "string") return { context: {}, data: e };
  try {
    return { context: l.parse(n), data: e };
  } catch {
    return { data: e };
  }
}
function A(e) {
  const n = /* @__PURE__ */ new Set(), t = [], r = (s) => {
    s.forEach((o) => {
      o.options.middleware && r(o.options.middleware), n.has(o) || (n.add(o), t.push(o));
    });
  };
  return r(e), t;
}
const M = async (e, n, t) => e({ ...n, next: async (r = {}) => {
  var _a, _b;
  return t({ ...n, ...r, context: { ...n.context, ...r.context }, sendContext: { ...n.sendContext, ...(_a = r.sendContext) != null ? _a : {} }, headers: O(n.headers, r.headers), result: r.result !== void 0 ? r.result : n.response === "raw" ? r : n.result, error: (_b = r.error) != null ? _b : n.error });
} });
function N(e, n) {
  if (e == null) return {};
  if ("~standard" in e) {
    const t = e["~standard"].validate(n);
    if (t instanceof Promise) throw new Error("Async validation not supported");
    if (t.issues) throw new Error(JSON.stringify(t.issues, void 0, 2));
    return t.value;
  }
  if ("parse" in e) return e.parse(n);
  if (typeof e == "function") return e(n);
  throw new Error("Invalid validator type!");
}
function H(e) {
  return { _types: void 0, options: { validator: e.validator, validateClient: e.validateClient, client: async ({ next: n, sendContext: t, ...r }) => {
    var s;
    const o = { ...r, context: t, type: typeof r.type == "function" ? r.type(r) : r.type };
    if (r.type === "static" && typeof document < "u") {
      V(f);
      const a = await f.fetchItem(o);
      if (a) {
        if (a.error) throw a.error;
        return n(a.ctx);
      }
      `${o.functionId}${JSON.stringify(o.data)}`;
    }
    const i = await ((s = e.extractedFn) == null ? void 0 : s.call(e, o));
    return n(i);
  }, server: async ({ next: n, ...t }) => {
    var r;
    const s = await ((r = e.serverFn) == null ? void 0 : r.call(e, t));
    return n({ ...t, result: s });
  } } };
}
function $(e) {
  return e.replace(/^\/|\/$/g, "");
}
const C = (e, n, t) => {
  V(t);
  const r = `/${$(n)}/${e}`;
  return Object.assign(t, { url: r, functionId: e });
}, F = "count.txt";
async function S() {
  return parseInt(await _.promises.readFile(F, "utf-8").catch(() => "0"));
}
const R = C("app_functions_ts--getCount_createServerFn_handler", "/_server", (e, n) => U.__executeServer(e, n)), P = C("app_functions_ts--updateCount_createServerFn_handler", "/_server", (e, n) => z.__executeServer(e, n)), U = p({ method: "GET" }).handler(R, () => S()), z = p({ method: "POST" }).validator((e) => e).handler(P, async ({ data: e }) => {
  const n = await S();
  await _.promises.writeFile(F, `${n + e}`);
});

export { R as getCount_createServerFn_handler, P as updateCount_createServerFn_handler };
//# sourceMappingURL=functions-RHPYwc0W.mjs.map
