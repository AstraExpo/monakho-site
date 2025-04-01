import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useRouter } from '@tanstack/react-router';
import { useContext, createContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z as ze } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:stream';
import 'react-dom/server';
import 'node:stream/web';

const h = createContext(void 0);
function p() {
  const t = useContext(h);
  if (!t) throw new Error("useTheme must be used within a ThemeProvider");
  return t;
}
function f() {
  const { theme: t, toggleTheme: o } = p();
  return jsx("button", { onClick: o, className: "p-2 rounded-md bg-gray-200 dark:bg-gray-800", children: t === "light" ? jsx(Moon, { size: 20 }) : jsx(Sun, { size: 20 }) });
}
function x() {
  return jsxs("nav", { className: "w-full p-4 bg-gray-900 text-white", children: [jsx("div", { className: "container mx-auto flex justify-between", children: jsx("h1", { className: "text-xl font-bold", children: "Monakho Ministry" }) }), jsx("div", { children: jsx(f, {}) })] });
}
function g({ children: t }) {
  return jsx("div", { className: "border rounded-lg p-4 shadow-md", children: t });
}
function b(...t) {
  return twMerge(clsx(t));
}
function w({ className: t, ...o }) {
  return jsx("button", { className: b("px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", t), ...o });
}
function N() {
  return jsxs("footer", { className: "w-full p-4 bg-gray-900 text-white text-center", children: ["\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Monakho Ministry. All Rights Reserved."] });
}
const L = function() {
  return ze.useLoaderData(), useRouter(), jsxs(Fragment, { children: [jsx(x, {}), jsx("main", { className: "container mx-auto p-6", children: jsxs(g, { children: [jsx("h2", { className: "text-xl font-bold", children: "Welcome to Monakho Ministry" }), jsx("p", { className: "text-gray-700", children: "Experience the power of worship and ministry." }), jsx(w, { className: "mt-4", children: "Learn More" })] }) }), jsx(N, {})] });
};

export { L as component };
//# sourceMappingURL=index-B-ufCL2F.mjs.map
