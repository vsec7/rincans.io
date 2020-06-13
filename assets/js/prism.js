/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism-funky&languages=markup+css+clike+javascript+bash+go+http+markup-templating+php+python+regex+sql&plugins=line-numbers+show-language+toolbar */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
  , Prism = function(u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i
      , n = 0
      , C = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
            encode: function e(n) {
                return n instanceof _ ? new _(n.type,e(n.content),n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(e) {
                return Object.prototype.toString.call(e).slice(8, -1)
            },
            objId: function(e) {
                return e.__id || Object.defineProperty(e, "__id", {
                    value: ++n
                }),
                e.__id
            },
            clone: function t(e, r) {
                var a, n, l = C.util.type(e);
                switch (r = r || {},
                l) {
                case "Object":
                    if (n = C.util.objId(e),
                    r[n])
                        return r[n];
                    for (var i in a = {},
                    r[n] = a,
                    e)
                        e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                    return a;
                case "Array":
                    return n = C.util.objId(e),
                    r[n] ? r[n] : (a = [],
                    r[n] = a,
                    e.forEach(function(e, n) {
                        a[n] = t(e, r)
                    }),
                    a);
                default:
                    return e
                }
            },
            getLanguage: function(e) {
                for (; e && !c.test(e.className); )
                    e = e.parentElement;
                return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none"
            },
            currentScript: function() {
                if ("undefined" == typeof document)
                    return null;
                if ("currentScript"in document)
                    return document.currentScript;
                try {
                    throw new Error
                } catch (e) {
                    var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                    if (n) {
                        var t = document.getElementsByTagName("script");
                        for (var r in t)
                            if (t[r].src == n)
                                return t[r]
                    }
                    return null
                }
            }
        },
        languages: {
            extend: function(e, n) {
                var t = C.util.clone(C.languages[e]);
                for (var r in n)
                    t[r] = n[r];
                return t
            },
            insertBefore: function(t, e, n, r) {
                var a = (r = r || C.languages)[t]
                  , l = {};
                for (var i in a)
                    if (a.hasOwnProperty(i)) {
                        if (i == e)
                            for (var o in n)
                                n.hasOwnProperty(o) && (l[o] = n[o]);
                        n.hasOwnProperty(i) || (l[i] = a[i])
                    }
                var s = r[t];
                return r[t] = l,
                C.languages.DFS(C.languages, function(e, n) {
                    n === s && e != t && (this[e] = l)
                }),
                l
            },
            DFS: function e(n, t, r, a) {
                a = a || {};
                var l = C.util.objId;
                for (var i in n)
                    if (n.hasOwnProperty(i)) {
                        t.call(n, i, n[i], r || i);
                        var o = n[i]
                          , s = C.util.type(o);
                        "Object" !== s || a[l(o)] ? "Array" !== s || a[l(o)] || (a[l(o)] = !0,
                        e(o, t, i, a)) : (a[l(o)] = !0,
                        e(o, t, null, a))
                    }
            }
        },
        plugins: {},
        highlightAll: function(e, n) {
            C.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, t) {
            var r = {
                callback: t,
                container: e,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            C.hooks.run("before-highlightall", r),
            r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),
            C.hooks.run("before-all-elements-highlight", r);
            for (var a, l = 0; a = r.elements[l++]; )
                C.highlightElement(a, !0 === n, r.callback)
        },
        highlightElement: function(e, n, t) {
            var r = C.util.getLanguage(e)
              , a = C.languages[r];
            e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
            var l = e.parentNode;
            l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
            var i = {
                element: e,
                language: r,
                grammar: a,
                code: e.textContent
            };
            function o(e) {
                i.highlightedCode = e,
                C.hooks.run("before-insert", i),
                i.element.innerHTML = i.highlightedCode,
                C.hooks.run("after-highlight", i),
                C.hooks.run("complete", i),
                t && t.call(i.element)
            }
            if (C.hooks.run("before-sanity-check", i),
            !i.code)
                return C.hooks.run("complete", i),
                void (t && t.call(i.element));
            if (C.hooks.run("before-highlight", i),
            i.grammar)
                if (n && u.Worker) {
                    var s = new Worker(C.filename);
                    s.onmessage = function(e) {
                        o(e.data)
                    }
                    ,
                    s.postMessage(JSON.stringify({
                        language: i.language,
                        code: i.code,
                        immediateClose: !0
                    }))
                } else
                    o(C.highlight(i.code, i.grammar, i.language));
            else
                o(C.util.encode(i.code))
        },
        highlight: function(e, n, t) {
            var r = {
                code: e,
                grammar: n,
                language: t
            };
            return C.hooks.run("before-tokenize", r),
            r.tokens = C.tokenize(r.code, r.grammar),
            C.hooks.run("after-tokenize", r),
            _.stringify(C.util.encode(r.tokens), r.language)
        },
        tokenize: function(e, n) {
            var t = n.rest;
            if (t) {
                for (var r in t)
                    n[r] = t[r];
                delete n.rest
            }
            var a = new l;
            return M(a, a.head, e),
            function e(n, t, r, a, l, i, o) {
                for (var s in r)
                    if (r.hasOwnProperty(s) && r[s]) {
                        var u = r[s];
                        u = Array.isArray(u) ? u : [u];
                        for (var c = 0; c < u.length; ++c) {
                            if (o && o == s + "," + c)
                                return;
                            var g = u[c]
                              , f = g.inside
                              , h = !!g.lookbehind
                              , d = !!g.greedy
                              , v = 0
                              , p = g.alias;
                            if (d && !g.pattern.global) {
                                var m = g.pattern.toString().match(/[imsuy]*$/)[0];
                                g.pattern = RegExp(g.pattern.source, m + "g")
                            }
                            g = g.pattern || g;
                            for (var y = a.next, k = l; y !== t.tail; k += y.value.length,
                            y = y.next) {
                                var b = y.value;
                                if (t.length > n.length)
                                    return;
                                if (!(b instanceof _)) {
                                    var x = 1;
                                    if (d && y != t.tail.prev) {
                                        g.lastIndex = k;
                                        var w = g.exec(n);
                                        if (!w)
                                            break;
                                        var A = w.index + (h && w[1] ? w[1].length : 0)
                                          , P = w.index + w[0].length
                                          , S = k;
                                        for (S += y.value.length; S <= A; )
                                            y = y.next,
                                            S += y.value.length;
                                        if (S -= y.value.length,
                                        k = S,
                                        y.value instanceof _)
                                            continue;
                                        for (var O = y; O !== t.tail && (S < P || "string" == typeof O.value && !O.prev.value.greedy); O = O.next)
                                            x++,
                                            S += O.value.length;
                                        x--,
                                        b = n.slice(k, S),
                                        w.index -= k
                                    } else {
                                        g.lastIndex = 0;
                                        var w = g.exec(b)
                                    }
                                    if (w) {
                                        h && (v = w[1] ? w[1].length : 0);
                                        var A = w.index + v
                                          , w = w[0].slice(v)
                                          , P = A + w.length
                                          , E = b.slice(0, A)
                                          , N = b.slice(P)
                                          , j = y.prev;
                                        E && (j = M(t, j, E),
                                        k += E.length),
                                        W(t, j, x);
                                        var L = new _(s,f ? C.tokenize(w, f) : w,p,w,d);
                                        if (y = M(t, j, L),
                                        N && M(t, y, N),
                                        1 < x && e(n, t, r, y.prev, k, !0, s + "," + c),
                                        i)
                                            break
                                    } else if (i)
                                        break
                                }
                            }
                        }
                    }
            }(e, a, n, a.head, 0),
            function(e) {
                var n = []
                  , t = e.head.next;
                for (; t !== e.tail; )
                    n.push(t.value),
                    t = t.next;
                return n
            }(a)
        },
        hooks: {
            all: {},
            add: function(e, n) {
                var t = C.hooks.all;
                t[e] = t[e] || [],
                t[e].push(n)
            },
            run: function(e, n) {
                var t = C.hooks.all[e];
                if (t && t.length)
                    for (var r, a = 0; r = t[a++]; )
                        r(n)
            }
        },
        Token: _
    };
    function _(e, n, t, r, a) {
        this.type = e,
        this.content = n,
        this.alias = t,
        this.length = 0 | (r || "").length,
        this.greedy = !!a
    }
    function l() {
        var e = {
            value: null,
            prev: null,
            next: null
        }
          , n = {
            value: null,
            prev: e,
            next: null
        };
        e.next = n,
        this.head = e,
        this.tail = n,
        this.length = 0
    }
    function M(e, n, t) {
        var r = n.next
          , a = {
            value: t,
            prev: n,
            next: r
        };
        return n.next = a,
        r.prev = a,
        e.length++,
        a
    }
    function W(e, n, t) {
        for (var r = n.next, a = 0; a < t && r !== e.tail; a++)
            r = r.next;
        (n.next = r).prev = n,
        e.length -= a
    }
    if (u.Prism = C,
    _.stringify = function n(e, t) {
        if ("string" == typeof e)
            return e;
        if (Array.isArray(e)) {
            var r = "";
            return e.forEach(function(e) {
                r += n(e, t)
            }),
            r
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t
        }
          , l = e.alias;
        l && (Array.isArray(l) ? Array.prototype.push.apply(a.classes, l) : a.classes.push(l)),
        C.hooks.run("wrap", a);
        var i = "";
        for (var o in a.attributes)
            i += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
        return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + i + ">" + a.content + "</" + a.tag + ">"
    }
    ,
    !u.document)
        return u.addEventListener && (C.disableWorkerMessageHandler || u.addEventListener("message", function(e) {
            var n = JSON.parse(e.data)
              , t = n.language
              , r = n.code
              , a = n.immediateClose;
            u.postMessage(C.highlight(r, C.languages[t], t)),
            a && u.close()
        }, !1)),
        C;
    var e = C.util.currentScript();
    function t() {
        C.manual || C.highlightAll()
    }
    if (e && (C.filename = e.src,
    e.hasAttribute("data-manual") && (C.manual = !0)),
    !C.manual) {
        var r = document.readyState;
        "loading" === r || "interactive" === r && e && e.defer ? document.addEventListener("DOMContentLoaded", t) : window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.setTimeout(t, 16)
    }
    return C
}(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {
                pattern: /(\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/,
            name: /[^\s<>'"]+/
        }
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: "attr-equals"
                    }, /"|'/]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
},
Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup,
Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}),
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function(a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        },
        s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: s
            }
        };
        n["language-" + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
        };
        var t = {};
        t[a] = {
            pattern: RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
                return a
            }), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: n
        },
        Prism.languages.insertBefore("markup", "cdata", t)
    }
}),
Prism.languages.html = Prism.languages.markup,
Prism.languages.mathml = Prism.languages.markup,
Prism.languages.svg = Prism.languages.markup,
Prism.languages.xml = Prism.languages.extend("markup", {}),
Prism.languages.ssml = Prism.languages.xml,
Prism.languages.atom = Prism.languages.xml,
Prism.languages.rss = Prism.languages.xml;
!function(s) {
    var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
            inside: {
                rule: /^@[\w-]+/,
                "selector-function-argument": {
                    pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
                    lookbehind: !0,
                    alias: "selector"
                }
            }
        },
        url: {
            pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/
            }
        },
        selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
        string: {
            pattern: e,
            greedy: !0
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
    },
    s.languages.css.atrule.inside.rest = s.languages.css;
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"),
    s.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
                "attr-name": {
                    pattern: /^\s*style/i,
                    inside: t.tag.inside
                },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": {
                    pattern: /.+/i,
                    inside: s.languages.css
                }
            },
            alias: "language-css"
        }
    }, t.tag))
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}),
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function"
    },
    parameter: [{
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}),
Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: !0,
        inside: {
            "template-punctuation": {
                pattern: /^`|`$/,
                alias: "string"
            },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\${|}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}),
Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"),
Prism.languages.js = Prism.languages.javascript;
!function(e) {
    var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b"
      , n = {
        environment: {
            pattern: RegExp("\\$" + t),
            alias: "constant"
        },
        variable: [{
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: !0,
            inside: {
                variable: [{
                    pattern: /(^\$\(\([\s\S]+)\)\)/,
                    lookbehind: !0
                }, /^\$\(\(/],
                number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                punctuation: /\(\(?|\)\)?|,|;/
            }
        }, {
            pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
            greedy: !0,
            inside: {
                variable: /^\$\(|^`|\)$|`$/
            }
        }, {
            pattern: /\$\{[^}]+\}/,
            greedy: !0,
            inside: {
                operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                punctuation: /[\[\]]/,
                environment: {
                    pattern: RegExp("(\\{)" + t),
                    lookbehind: !0,
                    alias: "constant"
                }
            }
        }, /\$(?:\w+|[#?*!@$])/],
        entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
    };
    e.languages.bash = {
        shebang: {
            pattern: /^#!\s*\/.*/,
            alias: "important"
        },
        comment: {
            pattern: /(^|[^"{\\$])#.*/,
            lookbehind: !0
        },
        "function-name": [{
            pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: !0,
            alias: "function"
        }, {
            pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
            alias: "function"
        }],
        "for-or-select": {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: "variable",
            lookbehind: !0
        },
        "assign-left": {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
            inside: {
                environment: {
                    pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
                    lookbehind: !0,
                    alias: "constant"
                }
            },
            alias: "variable",
            lookbehind: !0
        },
        string: [{
            pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: !0,
            greedy: !0,
            inside: n
        }, {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
            lookbehind: !0,
            greedy: !0,
            inside: n
        }],
        environment: {
            pattern: RegExp("\\$?" + t),
            alias: "constant"
        },
        variable: n.variable,
        function: {
            pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        keyword: {
            pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        builtin: {
            pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
            lookbehind: !0,
            alias: "class-name"
        },
        boolean: {
            pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        "file-descriptor": {
            pattern: /\B&\d\b/,
            alias: "important"
        },
        operator: {
            pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
            inside: {
                "file-descriptor": {
                    pattern: /^\d/,
                    alias: "important"
                }
            }
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: !0
        }
    };
    for (var a = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"], r = n.variable[1].inside, s = 0; s < a.length; s++)
        r[a[s]] = e.languages.bash[a[s]];
    e.languages.shell = e.languages.bash
}(Prism);
Prism.languages.go = Prism.languages.extend("clike", {
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    string: {
        pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: !0
    }
}),
delete Prism.languages.go["class-name"];
!function(t) {
    t.languages.http = {
        "request-line": {
            pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
            inside: {
                property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
                "attr-name": /:\w+/
            }
        },
        "response-status": {
            pattern: /^HTTP\/1.[01] \d+.*/m,
            inside: {
                property: {
                    pattern: /(^HTTP\/1.[01] )\d+.*/i,
                    lookbehind: !0
                }
            }
        },
        "header-name": {
            pattern: /^[\w-]+:(?=.)/m,
            alias: "keyword"
        }
    };
    var a, e, n, i = t.languages, p = {
        "application/javascript": i.javascript,
        "application/json": i.json || i.javascript,
        "application/xml": i.xml,
        "text/xml": i.xml,
        "text/html": i.html,
        "text/css": i.css
    }, s = {
        "application/json": !0,
        "application/xml": !0
    };
    for (var r in p)
        if (p[r]) {
            a = a || {};
            var T = s[r] ? (void 0,
            n = (e = r).replace(/^[a-z]+\//, ""),
            "(?:" + e + "|\\w+/(?:[\\w.-]+\\+)+" + n + "(?![+\\w.-]))") : r;
            a[r.replace(/\//g, "-")] = {
                pattern: RegExp("(content-type:\\s*" + T + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*", "i"),
                lookbehind: !0,
                inside: p[r]
            }
        }
    a && t.languages.insertBefore("http", "header-name", a)
}(Prism);
!function(h) {
    function v(e, n) {
        return "___" + e.toUpperCase() + n + "___"
    }
    Object.defineProperties(h.languages["markup-templating"] = {}, {
        buildPlaceholders: {
            value: function(a, r, e, o) {
                if (a.language === r) {
                    var c = a.tokenStack = [];
                    a.code = a.code.replace(e, function(e) {
                        if ("function" == typeof o && !o(e))
                            return e;
                        for (var n, t = c.length; -1 !== a.code.indexOf(n = v(r, t)); )
                            ++t;
                        return c[t] = e,
                        n
                    }),
                    a.grammar = h.languages.markup
                }
            }
        },
        tokenizePlaceholders: {
            value: function(p, k) {
                if (p.language === k && p.tokenStack) {
                    p.grammar = h.languages[k];
                    var m = 0
                      , d = Object.keys(p.tokenStack);
                    !function e(n) {
                        for (var t = 0; t < n.length && !(m >= d.length); t++) {
                            var a = n[t];
                            if ("string" == typeof a || a.content && "string" == typeof a.content) {
                                var r = d[m]
                                  , o = p.tokenStack[r]
                                  , c = "string" == typeof a ? a : a.content
                                  , i = v(k, r)
                                  , u = c.indexOf(i);
                                if (-1 < u) {
                                    ++m;
                                    var g = c.substring(0, u)
                                      , l = new h.Token(k,h.tokenize(o, p.grammar),"language-" + k,o)
                                      , s = c.substring(u + i.length)
                                      , f = [];
                                    g && f.push.apply(f, e([g])),
                                    f.push(l),
                                    s && f.push.apply(f, e([s])),
                                    "string" == typeof a ? n.splice.apply(n, [t, 1].concat(f)) : a.content = f
                                }
                            } else
                                a.content && e(a.content)
                        }
                        return n
                    }(p.tokens)
                }
            }
        }
    })
}(Prism);
!function(n) {
    n.languages.php = n.languages.extend("clike", {
        keyword: /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
        boolean: {
            pattern: /\b(?:false|true)\b/i,
            alias: "constant"
        },
        constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
        comment: {
            pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
            lookbehind: !0
        }
    }),
    n.languages.insertBefore("php", "string", {
        "shell-comment": {
            pattern: /(^|[^\\])#.*/,
            lookbehind: !0,
            alias: "comment"
        }
    }),
    n.languages.insertBefore("php", "comment", {
        delimiter: {
            pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
            alias: "important"
        }
    }),
    n.languages.insertBefore("php", "keyword", {
        variable: /\$+(?:\w+\b|(?={))/i,
        package: {
            pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
            lookbehind: !0,
            inside: {
                punctuation: /\\/
            }
        }
    }),
    n.languages.insertBefore("php", "operator", {
        property: {
            pattern: /(->)[\w]+/,
            lookbehind: !0
        }
    });
    var e = {
        pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
        lookbehind: !0,
        inside: n.languages.php
    };
    n.languages.insertBefore("php", "string", {
        "nowdoc-string": {
            pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
            greedy: !0,
            alias: "string",
            inside: {
                delimiter: {
                    pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                    alias: "symbol",
                    inside: {
                        punctuation: /^<<<'?|[';]$/
                    }
                }
            }
        },
        "heredoc-string": {
            pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
            greedy: !0,
            alias: "string",
            inside: {
                delimiter: {
                    pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                    alias: "symbol",
                    inside: {
                        punctuation: /^<<<"?|[";]$/
                    }
                },
                interpolation: e
            }
        },
        "single-quoted-string": {
            pattern: /'(?:\\[\s\S]|[^\\'])*'/,
            greedy: !0,
            alias: "string"
        },
        "double-quoted-string": {
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            greedy: !0,
            alias: "string",
            inside: {
                interpolation: e
            }
        }
    }),
    delete n.languages.php.string,
    n.hooks.add("before-tokenize", function(e) {
        if (/<\?/.test(e.code)) {
            n.languages["markup-templating"].buildPlaceholders(e, "php", /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi)
        }
    }),
    n.hooks.add("after-tokenize", function(e) {
        n.languages["markup-templating"].tokenizePlaceholders(e, "php")
    })
}(Prism);
Prism.languages.python = {
    comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0
    },
    "string-interpolation": {
        pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                lookbehind: !0,
                inside: {
                    "format-spec": {
                        pattern: /(:)[^:(){}]+(?=}$)/,
                        lookbehind: !0
                    },
                    "conversion-option": {
                        pattern: /![sra](?=[:}]$)/,
                        alias: "punctuation"
                    },
                    rest: null
                }
            },
            string: /[\s\S]+/
        }
    },
    "triple-quoted-string": {
        pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: "string"
    },
    string: {
        pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0
    },
    "class-name": {
        pattern: /(\bclass\s+)\w+/i,
        lookbehind: !0
    },
    decorator: {
        pattern: /(^\s*)@\w+(?:\.\w+)*/im,
        lookbehind: !0,
        alias: ["annotation", "punctuation"],
        inside: {
            punctuation: /\./
        }
    },
    keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
},
Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python,
Prism.languages.py = Prism.languages.python;
!function(n) {
    var a = {
        pattern: /\\[\\(){}[\]^$+*?|.]/,
        alias: "escape"
    }
      , e = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/
      , t = "(?:[^\\\\-]|" + e.source + ")"
      , i = RegExp(t + "-" + t)
      , r = {
        pattern: /(<|')[^<>']+(?=[>']$)/,
        lookbehind: !0,
        alias: "variable"
    };
    n.languages.regex = {
        charset: {
            pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
            lookbehind: !0,
            inside: {
                "charset-negation": {
                    pattern: /(^\[)\^/,
                    lookbehind: !0,
                    alias: "operator"
                },
                "charset-punctuation": {
                    pattern: /^\[|\]$/,
                    alias: "punctuation"
                },
                range: {
                    pattern: i,
                    inside: {
                        escape: e,
                        "range-punctuation": {
                            pattern: /-/,
                            alias: "operator"
                        }
                    }
                },
                "special-escape": a,
                charclass: {
                    pattern: /\\[wsd]|\\p{[^{}]+}/i,
                    alias: "class-name"
                },
                escape: e
            }
        },
        "special-escape": a,
        charclass: {
            pattern: /\.|\\[wsd]|\\p{[^{}]+}/i,
            alias: "class-name"
        },
        backreference: [{
            pattern: /\\(?![123][0-7]{2})[1-9]/,
            alias: "keyword"
        }, {
            pattern: /\\k<[^<>']+>/,
            alias: "keyword",
            inside: {
                "group-name": r
            }
        }],
        anchor: {
            pattern: /[$^]|\\[ABbGZz]/,
            alias: "function"
        },
        escape: e,
        group: [{
            pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
            alias: "punctuation",
            inside: {
                "group-name": r
            }
        }, {
            pattern: /\)/,
            alias: "punctuation"
        }],
        quantifier: {
            pattern: /(?:[+*?]|\{(?:\d+,?\d*)\})[?+]?/,
            alias: "number"
        },
        alternation: {
            pattern: /\|/,
            alias: "keyword"
        }
    },
    ["actionscript", "coffescript", "flow", "javascript", "typescript", "vala"].forEach(function(a) {
        var e = n.languages[a];
        e && (e.regex.inside = {
            "language-regex": {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/i,
                lookbehind: !0,
                inside: n.languages.regex
            },
            "regex-flags": /[a-z]+$/i,
            "regex-delimiter": /^\/|\/$/
        })
    })
}(Prism);
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0
    },
    variable: [{
        pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
        greedy: !0
    }, /@[\w.$]+/],
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: !0,
        lookbehind: !0
    },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
!function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var l = "line-numbers"
          , c = /\n(?!$)/g
          , m = function(e) {
            var t = a(e)["white-space"];
            if ("pre-wrap" === t || "pre-line" === t) {
                var n = e.querySelector("code")
                  , r = e.querySelector(".line-numbers-rows");
                if (!n || !r)
                    return;
                var s = e.querySelector(".line-numbers-sizer")
                  , i = n.textContent.split(c);
                s || ((s = document.createElement("span")).className = "line-numbers-sizer",
                n.appendChild(s)),
                s.style.display = "block",
                i.forEach(function(e, t) {
                    s.textContent = e || "\n";
                    var n = s.getBoundingClientRect().height;
                    r.children[t].style.height = n + "px"
                }),
                s.textContent = "",
                s.style.display = "none"
            }
        }
          , a = function(e) {
            return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
        };
        window.addEventListener("resize", function() {
            Array.prototype.forEach.call(document.querySelectorAll("pre." + l), m)
        }),
        Prism.hooks.add("complete", function(e) {
            if (e.code) {
                var t = e.element
                  , n = t.parentNode;
                if (n && /pre/i.test(n.nodeName) && !t.querySelector(".line-numbers-rows")) {
                    for (var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t; i; i = i.parentNode)
                        if (s.test(i.className)) {
                            r = !0;
                            break
                        }
                    if (r) {
                        t.className = t.className.replace(s, " "),
                        s.test(n.className) || (n.className += " line-numbers");
                        var l, a = e.code.match(c), o = a ? a.length + 1 : 1, u = new Array(o + 1).join("<span></span>");
                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"),
                        l.className = "line-numbers-rows",
                        l.innerHTML = u,
                        n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)),
                        e.element.appendChild(l),
                        m(n),
                        Prism.hooks.run("line-numbers", e)
                    }
                }
            }
        }),
        Prism.hooks.add("line-numbers", function(e) {
            e.plugins = e.plugins || {},
            e.plugins.lineNumbers = !0
        }),
        Prism.plugins.lineNumbers = {
            getLine: function(e, t) {
                if ("PRE" === e.tagName && e.classList.contains(l)) {
                    var n = e.querySelector(".line-numbers-rows")
                      , r = parseInt(e.getAttribute("data-start"), 10) || 1
                      , s = r + (n.children.length - 1);
                    t < r && (t = r),
                    s < t && (t = s);
                    var i = t - r;
                    return n.children[i]
                }
            },
            resize: function(e) {
                m(e)
            }
        }
    }
}();
!function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var i = []
          , l = {}
          , c = function() {};
        Prism.plugins.toolbar = {};
        var e = Prism.plugins.toolbar.registerButton = function(e, n) {
            var t;
            t = "function" == typeof n ? n : function(e) {
                var t;
                return "function" == typeof n.onClick ? ((t = document.createElement("button")).type = "button",
                t.addEventListener("click", function() {
                    n.onClick.call(this, e)
                })) : "string" == typeof n.url ? (t = document.createElement("a")).href = n.url : t = document.createElement("span"),
                n.className && t.classList.add(n.className),
                t.textContent = n.text,
                t
            }
            ,
            e in l ? console.warn('There is a button with the key "' + e + '" registered already.') : i.push(l[e] = t)
        }
          , t = Prism.plugins.toolbar.hook = function(a) {
            var e = a.element.parentNode;
            if (e && /pre/i.test(e.nodeName) && !e.parentNode.classList.contains("code-toolbar")) {
                var t = document.createElement("div");
                t.classList.add("code-toolbar"),
                e.parentNode.insertBefore(t, e),
                t.appendChild(e);
                var r = document.createElement("div");
                r.classList.add("toolbar");
                var n = i
                  , o = function(e) {
                    for (; e; ) {
                        var t = e.getAttribute("data-toolbar-order");
                        if (null != t)
                            return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                        e = e.parentElement
                    }
                }(a.element);
                o && (n = o.map(function(e) {
                    return l[e] || c
                })),
                n.forEach(function(e) {
                    var t = e(a);
                    if (t) {
                        var n = document.createElement("div");
                        n.classList.add("toolbar-item"),
                        n.appendChild(t),
                        r.appendChild(n)
                    }
                }),
                t.appendChild(r)
            }
        }
        ;
        e("label", function(e) {
            var t = e.element.parentNode;
            if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
                var n, a, r = t.getAttribute("data-label");
                try {
                    a = document.querySelector("template#" + r)
                } catch (e) {}
                return a ? n = a.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"),
                n.textContent = r),
                n
            }
        }),
        Prism.hooks.add("complete", t)
    }
}();
!function() {
    if ("undefined" != typeof self && self.Prism && self.document)
        if (Prism.plugins.toolbar) {
            var r = {
                html: "HTML",
                xml: "XML",
                svg: "SVG",
                mathml: "MathML",
                ssml: "SSML",
                rss: "RSS",
                css: "CSS",
                clike: "C-like",
                js: "JavaScript",
                abap: "ABAP",
                abnf: "Augmented Backus–Naur form",
                al: "AL",
                antlr4: "ANTLR4",
                g4: "ANTLR4",
                apacheconf: "Apache Configuration",
                apl: "APL",
                aql: "AQL",
                arff: "ARFF",
                asciidoc: "AsciiDoc",
                adoc: "AsciiDoc",
                asm6502: "6502 Assembly",
                aspnet: "ASP.NET (C#)",
                autohotkey: "AutoHotkey",
                autoit: "AutoIt",
                basic: "BASIC",
                bbcode: "BBcode",
                bnf: "Backus–Naur form",
                rbnf: "Routing Backus–Naur form",
                conc: "Concurnas",
                csharp: "C#",
                cs: "C#",
                dotnet: "C#",
                cpp: "C++",
                cil: "CIL",
                coffee: "CoffeeScript",
                cmake: "CMake",
                csp: "Content-Security-Policy",
                "css-extras": "CSS Extras",
                dax: "DAX",
                django: "Django/Jinja2",
                jinja2: "Django/Jinja2",
                "dns-zone-file": "DNS zone file",
                "dns-zone": "DNS zone file",
                dockerfile: "Docker",
                ebnf: "Extended Backus–Naur form",
                ejs: "EJS",
                etlua: "Embedded Lua templating",
                erb: "ERB",
                "excel-formula": "Excel Formula",
                xlsx: "Excel Formula",
                xls: "Excel Formula",
                fsharp: "F#",
                "firestore-security-rules": "Firestore security rules",
                ftl: "FreeMarker Template Language",
                gcode: "G-code",
                gdscript: "GDScript",
                gedcom: "GEDCOM",
                glsl: "GLSL",
                gml: "GameMaker Language",
                gamemakerlanguage: "GameMaker Language",
                graphql: "GraphQL",
                hs: "Haskell",
                hcl: "HCL",
                hlsl: "HLSL",
                http: "HTTP",
                hpkp: "HTTP Public-Key-Pins",
                hsts: "HTTP Strict-Transport-Security",
                ichigojam: "IchigoJam",
                iecst: "Structured Text (IEC 61131-3)",
                inform7: "Inform 7",
                javadoc: "JavaDoc",
                javadoclike: "JavaDoc-like",
                javastacktrace: "Java stack trace",
                jq: "JQ",
                jsdoc: "JSDoc",
                "js-extras": "JS Extras",
                "js-templates": "JS Templates",
                json: "JSON",
                webmanifest: "Web App Manifest",
                jsonp: "JSONP",
                json5: "JSON5",
                latex: "LaTeX",
                tex: "TeX",
                context: "ConTeXt",
                lilypond: "LilyPond",
                ly: "LilyPond",
                emacs: "Lisp",
                elisp: "Lisp",
                "emacs-lisp": "Lisp",
                llvm: "LLVM IR",
                lolcode: "LOLCODE",
                md: "Markdown",
                "markup-templating": "Markup templating",
                matlab: "MATLAB",
                mel: "MEL",
                moon: "MoonScript",
                n1ql: "N1QL",
                n4js: "N4JS",
                n4jsd: "N4JS",
                "nand2tetris-hdl": "Nand To Tetris HDL",
                nasm: "NASM",
                neon: "NEON",
                nginx: "nginx",
                nsis: "NSIS",
                objectivec: "Objective-C",
                objc: "Objective-C",
                ocaml: "OCaml",
                opencl: "OpenCL",
                parigp: "PARI/GP",
                objectpascal: "Object Pascal",
                pcaxis: "PC-Axis",
                px: "PC-Axis",
                peoplecode: "PeopleCode",
                pcode: "PeopleCode",
                php: "PHP",
                phpdoc: "PHPDoc",
                "php-extras": "PHP Extras",
                plsql: "PL/SQL",
                powerquery: "PowerQuery",
                pq: "PowerQuery",
                mscript: "PowerQuery",
                powershell: "PowerShell",
                properties: ".properties",
                protobuf: "Protocol Buffers",
                purebasic: "PureBasic",
                pbfasm: "PureBasic",
                py: "Python",
                q: "Q (kdb+ database)",
                qml: "QML",
                rkt: "Racket",
                jsx: "React JSX",
                tsx: "React TSX",
                renpy: "Ren'py",
                rpy: "Ren'py",
                rest: "reST (reStructuredText)",
                robotframework: "Robot Framework",
                robot: "Robot Framework",
                rb: "Ruby",
                sas: "SAS",
                sass: "Sass (Sass)",
                scss: "Sass (Scss)",
                "shell-session": "Shell session",
                solidity: "Solidity (Ethereum)",
                sol: "Solidity (Ethereum)",
                "solution-file": "Solution file",
                sln: "Solution file",
                soy: "Soy (Closure Template)",
                sparql: "SPARQL",
                rq: "SPARQL",
                "splunk-spl": "Splunk SPL",
                sqf: "SQF: Status Quo Function (Arma 3)",
                sql: "SQL",
                tap: "TAP",
                toml: "TOML",
                tt2: "Template Toolkit 2",
                trig: "TriG",
                ts: "TypeScript",
                "t4-cs": "T4 Text Templates (C#)",
                t4: "T4 Text Templates (C#)",
                "t4-vb": "T4 Text Templates (VB)",
                "t4-templating": "T4 templating",
                uscript: "UnrealScript",
                uc: "UnrealScript",
                vbnet: "VB.Net",
                vhdl: "VHDL",
                vim: "vim",
                "visual-basic": "Visual Basic",
                vb: "Visual Basic",
                wasm: "WebAssembly",
                wiki: "Wiki markup",
                xeoracube: "XeoraCube",
                "xml-doc": "XML doc (.net)",
                xojo: "Xojo (REALbasic)",
                xquery: "XQuery",
                yaml: "YAML",
                yml: "YAML"
            };
            Prism.plugins.toolbar.registerButton("show-language", function(e) {
                var a = e.element.parentNode;
                if (a && /pre/i.test(a.nodeName)) {
                    var s, t = a.getAttribute("data-language") || r[e.language] || ((s = e.language) ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(/s(?=cript)/, "S") : s);
                    if (t) {
                        var o = document.createElement("span");
                        return o.textContent = t,
                        o
                    }
                }
            })
        } else
            console.warn("Show Languages plugin loaded before Toolbar plugin.")
}();
