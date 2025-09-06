import "./app-Dg68ys98.js";
class u {
  constructor(t = 0, s = "Network Error") {
    (this.status = t), (this.text = s);
  }
}
const w = () => {
    if (!(typeof localStorage > "u"))
      return {
        get: (e) => Promise.resolve(localStorage.getItem(e)),
        set: (e, t) => Promise.resolve(localStorage.setItem(e, t)),
        remove: (e) => Promise.resolve(localStorage.removeItem(e)),
      };
  },
  o = {
    origin: "https://api.emailjs.com",
    blockHeadless: !1,
    storageProvider: w(),
  },
  p = (e) =>
    e
      ? typeof e == "string"
        ? { publicKey: e }
        : e.toString() === "[object Object]"
        ? e
        : {}
      : {},
  E = async (e, t, s = {}) => {
    const a = await fetch(o.origin + e, {
        method: "POST",
        headers: s,
        body: t,
      }),
      r = await a.text(),
      c = new u(a.status, r);
    if (a.ok) return c;
    throw c;
  },
  k = (e, t, s) => {
    if (!e || typeof e != "string")
      throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
    if (!t || typeof t != "string")
      throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
    if (!s || typeof s != "string")
      throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
  },
  L = (e) => {
    if (e && e.toString() !== "[object Object]")
      throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
  },
  S = (e) => e.webdriver || !e.languages || e.languages.length === 0,
  T = () => new u(451, "Unavailable For Headless Browser"),
  j = (e, t) => {
    if (!Array.isArray(e)) throw "The BlockList list has to be an array";
    if (typeof t != "string")
      throw "The BlockList watchVariable has to be a string";
  },
  P = (e) => !e.list?.length || !e.watchVariable,
  x = (e, t) => (e instanceof FormData ? e.get(t) : e[t]),
  B = (e, t) => {
    if (P(e)) return !1;
    j(e.list, e.watchVariable);
    const s = x(t, e.watchVariable);
    return typeof s != "string" ? !1 : e.list.includes(s);
  },
  I = () => new u(403, "Forbidden"),
  H = (e, t) => {
    if (typeof e != "number" || e < 0)
      throw "The LimitRate throttle has to be a positive number";
    if (t && typeof t != "string")
      throw "The LimitRate ID has to be a non-empty string";
  },
  R = async (e, t, s) => {
    const a = Number((await s.get(e)) || 0);
    return t - Date.now() + a;
  },
  V = async (e, t, s) => {
    if (!t.throttle || !s) return !1;
    H(t.throttle, t.id);
    const a = t.id || e;
    return (await R(a, t.throttle, s)) > 0
      ? !0
      : (await s.set(a, Date.now().toString()), !1);
  },
  N = () => new u(429, "Too Many Requests"),
  D = async (e, t, s, a) => {
    const r = p(a),
      c = r.publicKey || o.publicKey,
      g = r.blockHeadless || o.blockHeadless,
      b = r.storageProvider || o.storageProvider,
      v = { ...o.blockList, ...r.blockList },
      y = { ...o.limitRate, ...r.limitRate };
    return g && S(navigator)
      ? Promise.reject(T())
      : (k(c, e, t),
        L(s),
        s && B(v, s)
          ? Promise.reject(I())
          : (await V(location.pathname, y, b))
          ? Promise.reject(N())
          : E(
              "/api/v1.0/email/send",
              JSON.stringify({
                lib_version: "4.4.1",
                user_id: c,
                service_id: e,
                template_id: t,
                template_params: s,
              }),
              { "Content-type": "application/json" }
            ));
  },
  n = document.getElementById("name"),
  i = document.getElementById("email"),
  d = document.getElementById("name-holder"),
  f = document.getElementById("email-holder"),
  l = document.querySelector("textarea"),
  h = document.getElementById("message-holder"),
  m = document.getElementById("submit-btn"),
  _ = (e) => {
    e.preventDefault(),
      n.value === "" || i.value === "" || l.value === ""
        ? alert("Please enter your name, email, and message.")
        : ((m.textContent = "SENDING..."),
          D(
            "joview-mail",
            "template_scnkg34",
            {
              name: n.value.trim(),
              email: i.value.trim(),
              message: l.value.trim(),
            },
            "XymwmkfziJI-JtCUJ"
          )
            .then(() => {
              (n.value = ""),
                (i.value = ""),
                (l.value = ""),
                (m.textContent = "SENT!"),
                alert("Email successfully sent!"),
                setTimeout(() => (m.textContent = "SEND EMAIL"), 2e3);
                d.style.translate = "0 49px";
                f.style.translate = "0 49px";
                h.style.translate = "0 134px";
            })
            .catch((t) => {
              console.log(t);
            }))
  };
d.addEventListener("click", () => n.focus());
n.addEventListener("focus", () => (d.style.translate = "0 30px"));
n.addEventListener("focusout", () => {
  n.value || (d.style.translate = "0 49px");
});
f.addEventListener("click", () => i.focus());
i.addEventListener("focus", () => (f.style.translate = "0 30px"));
i.addEventListener("focusout", () => {
  i.value || (f.style.translate = "0 49px");
});
h.addEventListener("click", () => n.focus());
l.addEventListener("focus", () => (h.style.translate = "0 33px"));
l.addEventListener("focusout", () => {
  l.value || (h.style.translate = "0 134px");
});
m.addEventListener("click", _);
