import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Z as Zr } from '../nitro/nitro.mjs';
import { Moon, Sun } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
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

function d() {
  const { theme: r, toggleTheme: n } = Zr();
  return jsx("button", { onClick: n, className: "p-2 rounded-md bg-gray-200 dark:bg-gray-800", children: r === "light" ? jsx(Moon, { size: 20 }) : jsx(Sun, { size: 20 }) });
}
function g() {
  const [r, n] = useState(false);
  return jsxs("nav", { className: "w-full p-4 bg-gray-900 text-white shadow-md", children: [jsxs("div", { className: "container mx-auto flex justify-between items-center", children: [jsx("h1", { className: "text-2xl font-bold", children: jsx(Link, { to: "/", className: "hover:text-gray-300", children: "Monakho Ministry" }) }), jsxs("div", { className: "hidden md:flex space-x-8", children: [jsx(Link, { to: "/", className: "text-lg hover:text-gray-300", children: "Home" }), jsx(Link, { to: "/about", className: "text-lg hover:text-gray-300", children: "About" }), jsx(Link, { to: "/contact", className: "text-lg hover:text-gray-300", children: "Contact Us" }), jsx(Link, { to: "/donate", className: "text-lg hover:text-gray-300", children: "Donate" }), jsx(Link, { to: "/sermons", className: "text-lg hover:text-gray-300", children: "Sermons" }), jsx(Link, { to: "/team", className: "text-lg hover:text-gray-300", children: "Team" }), jsx(Link, { to: "/events", className: "text-lg hover:text-gray-300", children: "Events" }), jsx(Link, { to: "/music", className: "text-lg hover:text-gray-300", children: "Music" })] }), jsxs("div", { className: "flex items-center space-x-4", children: [jsx(d, {}), jsx("div", { className: "md:hidden", children: jsx("button", { onClick: () => n(!r), className: "text-xl", children: jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h16" }) }) }) })] })] }), r && jsxs("div", { className: "md:hidden mt-4 space-y-4 px-4", children: [jsx(Link, { to: "/", className: "block text-lg hover:text-gray-300", children: "Home" }), jsx(Link, { to: "/about", className: "block text-lg hover:text-gray-300", children: "About" }), jsx(Link, { to: "/events", className: "block text-lg hover:text-gray-300", children: "Events" }), jsx(Link, { to: "/music", className: "block text-lg hover:text-gray-300", children: "Music" }), jsx(Link, { to: "/sermons", className: "block text-lg hover:text-gray-300", children: "Sermons" }), jsx(Link, { to: "/donate", className: "block text-lg hover:text-gray-300", children: "Donate" })] })] });
}
function x() {
  return jsxs("footer", { className: "w-full p-4 bg-gray-900 text-white text-center", children: ["\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Monakho Ministry. All Rights Reserved."] });
}
function u({ children: r }) {
  return jsx("div", { className: "border rounded-lg p-4 shadow-md", children: r });
}
function p(...r) {
  return twMerge(clsx(r));
}
function N({ className: r, ...n }) {
  return jsx("button", { className: p("px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", r), ...n });
}
function v() {
  return jsx("main", { className: "container mx-auto p-6", children: jsxs(u, { children: [jsx("h2", { className: "text-xl font-bold", children: "Welcome to Monakho Ministry" }), jsx("p", { className: "text-gray-700", children: "Experience the power of worship and ministry." }), jsx(N, { className: "mt-4", children: "Learn More" })] }) });
}
const E = function() {
  return jsxs(Fragment, { children: [jsx(g, {}), jsx(v, {}), jsx(x, {})] });
};

export { E as component };
//# sourceMappingURL=index-DOa1lz9E.mjs.map
