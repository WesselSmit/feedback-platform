(function (e) { function t(t) { for (var n, o, s = t[0], c = t[1], i = t[2], p = 0, l = []; p < s.length; p++)o = s[p], Object.prototype.hasOwnProperty.call(a, o) && a[o] && l.push(a[o][0]), a[o] = 0; for (n in c)Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]); d && d(t); while (l.length)l.shift()(); return u.push.apply(u, i || []), r(); } function r() { for (var e, t = 0; t < u.length; t++) { for (var r = u[t], n = !0, o = 1; o < r.length; o++) { const s = r[o]; a[s] !== 0 && (n = !1); }n && (u.splice(t--, 1), e = c(c.s = r[0])); } return e; } const n = {}; const o = { app: 0 }; var a = { app: 0 }; var u = []; function s(e) { return `${c.p}js/${{ 404: '404', login: 'login', settings: 'settings' }[e] || e}.${{ 404: '37bb1fd9', login: '8cfb14bd', settings: 'cc36c347' }[e]}.js`; } function c(t) { if (n[t]) return n[t].exports; const r = n[t] = { i: t, l: !1, exports: {} }; return e[t].call(r.exports, r, r.exports, c), r.l = !0, r.exports; }c.e = function (e) { const t = []; const r = { login: 1 }; o[e] ? t.push(o[e]) : o[e] !== 0 && r[e] && t.push(o[e] = new Promise((((t, r) => { for (var n = `css/${{ 404: '404', login: 'login', settings: 'settings' }[e] || e}.${{ 404: '31d6cfe0', login: 'ee7b2c66', settings: '31d6cfe0' }[e]}.css`, a = c.p + n, u = document.getElementsByTagName('link'), s = 0; s < u.length; s++) { var i = u[s]; var p = i.getAttribute('data-href') || i.getAttribute('href'); if (i.rel === 'stylesheet' && (p === n || p === a)) return t(); } const l = document.getElementsByTagName('style'); for (s = 0; s < l.length; s++) { i = l[s], p = i.getAttribute('data-href'); if (p === n || p === a) return t(); } const d = document.createElement('link'); d.rel = 'stylesheet', d.type = 'text/css', d.onload = t, d.onerror = function (t) { const n = t && t.target && t.target.src || a; const u = new Error(`Loading CSS chunk ${e} failed.\n(${n})`); u.code = 'CSS_CHUNK_LOAD_FAILED', u.request = n, delete o[e], d.parentNode.removeChild(d), r(u); }, d.href = a; const f = document.getElementsByTagName('head')[0]; f.appendChild(d); }))).then((() => { o[e] = 0; }))); let n = a[e]; if (n !== 0) if (n)t.push(n[2]); else { const u = new Promise((((t, r) => { n = a[e] = [t, r]; }))); t.push(n[2] = u); let i; const p = document.createElement('script'); p.charset = 'utf-8', p.timeout = 120, c.nc && p.setAttribute('nonce', c.nc), p.src = s(e); const l = new Error(); i = function (t) { p.onerror = p.onload = null, clearTimeout(d); const r = a[e]; if (r !== 0) { if (r) { const n = t && (t.type === 'load' ? 'missing' : t.type); const o = t && t.target && t.target.src; l.message = `Loading chunk ${e} failed.\n(${n}: ${o})`, l.name = 'ChunkLoadError', l.type = n, l.request = o, r[1](l); }a[e] = void 0; } }; var d = setTimeout((() => { i({ type: 'timeout', target: p }); }), 12e4); p.onerror = p.onload = i, document.head.appendChild(p); } return Promise.all(t); }, c.m = e, c.c = n, c.d = function (e, t, r) { c.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }); }, c.r = function (e) { typeof Symbol !== 'undefined' && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 }); }, c.t = function (e, t) { if (1 & t && (e = c(e)), 8 & t) return e; if (4 & t && typeof e === 'object' && e && e.__esModule) return e; const r = Object.create(null); if (c.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && typeof e !== 'string') for (const n in e)c.d(r, n, ((t) => e[t]).bind(null, n)); return r; }, c.n = function (e) { const t = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return c.d(t, 'a', t), t; }, c.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, c.p = '/', c.oe = function (e) { throw console.error(e), e; }; let i = window.webpackJsonp = window.webpackJsonp || []; const p = i.push.bind(i); i.push = t, i = i.slice(); for (let l = 0; l < i.length; l++)t(i[l]); var d = p; u.push([0, 'chunk-vendors']), r(); }({
  0(e, t, r) { e.exports = r('56d7'); },
  '56d7': function (e, t, r) {
    r.r(t); r('e260'), r('e6cf'), r('cca6'), r('a79d'); const n = r('7a23'); const o = (r('b0c0'), { key: 1 }); function a(e, t, r, a, u, s) { const c = Object(n.u)('Navigation'); const i = Object(n.u)('router-view'); return Object(n.p)(), Object(n.d)(n.a, null, [s.isLoggedIn ? (Object(n.p)(), Object(n.d)(c, { key: 0 })) : Object(n.e)('', !0), Object(n.g)(i), s.isLoggedIn ? (Object(n.p)(), Object(n.d)('div', o, [Object(n.g)('p', null, `obj: ${Object(n.w)(this.user)}`, 1), Object(n.g)('p', null, `User: ${Object(n.w)(this.user.name)}`, 1), Object(n.g)('p', null, `Role: ${Object(n.w)(this.userRole)}`, 1), Object(n.g)('p', null, `Group: ${Object(n.w)(this.userGroup)}`, 1), Object(n.g)('p', null, `Uid: ${Object(n.w)(this.user.uid)}`, 1)])) : Object(n.e)('', !0)], 64); }r('b64b'); const u = r('5530'); function s(e, t, r, o, a, u) { return Object(n.p)(), Object(n.d)('section', null, [Object(n.g)('div', null, [Object(n.g)('a', { onClick: t[1] || (t[1] = function () { return u.logout && u.logout.apply(u, arguments); }) }, 'logout')])]); } const c = { methods: { logout() { this.$store.dispatch('user/logout'); } } }; c.render = s; const i = c; const p = r('5502'); const l = {
      components: { Navigation: i },
      computed: Object(u.a)(Object(u.a)({}, Object(p.c)('user', {
        user: 'user', userRole: 'role', userGroup: 'group', userError: 'error',
      })), {}, { isLoggedIn() { return Object.keys(this.user).length > 1; } }),
    }; l.render = a; const d = l; const f = (r('caad'), r('45fc'), r('d3b7'), r('2532'), r('96cf'), r('1da1')); const g = r('6c02'); function m(e, t, r, o, a, u) { return Object(n.p)(), Object(n.d)('p', null, 'dashboard'); } const b = {}; b.render = m; const h = b; const v = r('dc59'); const w = (r('d81d'), {
      namespaced: !0, state: { groups: [], groupNames: [], error: {} }, getters: { groups(e) { return e.groups; }, groupNames(e) { return e.groupNames; }, error(e) { return e.error; } }, mutations: { setGroups(e, t) { e.groups = t; }, setGroupNames(e, t) { e.groupNames = t; }, setError(e, t) { e.error = t; } }, actions: { fetchGroups(e) { return Object(f.a)(regeneratorRuntime.mark((function t() { let r; let n; let o; let a; let u; return regeneratorRuntime.wrap(((t) => { while (1) switch (t.prev = t.next) { case 0: return r = e.dispatch, n = e.commit, t.prev = 1, t.next = 4, v.b.get(); case 4: o = t.sent, a = o.docs.map(((e) => e.data())), u = o.docs.map(((e) => e.id)), n('setGroups', a), n('setGroupNames', u), t.next = 14; break; case 11: t.prev = 11, t.t0 = t.catch(1), r('setError', t.t0); case 14: case 'end': return t.stop(); } }), t, null, [[1, 11]]); })))(); }, setError(e, t) { const r = e.commit; r('setError', t), console.error('Error in groupStore:', t); } },
    }); const j = {
      namespaced: !0,
      state: { user: {}, error: {} },
      getters: {
        user(e) { return e.user; }, role(e) { return e.user.role; }, group(e) { return e.user.group; }, error(e) { return e.error; },
      },
      mutations: { setUser(e, t) { e.user = t; }, setError(e, t) { e.error = t; } },
      actions: {
        signUp(e, t) {
          return Object(f.a)(regeneratorRuntime.mark((function r() {
            let n; let o; let a; return regeneratorRuntime.wrap(((r) => {
              while (1) {
                switch (r.prev = r.next) {
                  case 0: return n = e.dispatch, r.prev = 1, r.next = 4, v.a.createUserWithEmailAndPassword(t.email, t.password); case 4: return o = r.sent, a = o.user, r.next = 8, v.c.doc(a.uid).set({
                    uid: a.uid, name: t.name, mail: t.email, group: t.group, role: 'student',
                  }); case 8: n('getUser', a), r.next = 14; break; case 11: r.prev = 11, r.t0 = r.catch(1), n('setError', r.t0); case 14: case 'end': return r.stop();
                }
              }
            }), r, null, [[1, 11]]);
          })))();
        },
        login(e, t) { return Object(f.a)(regeneratorRuntime.mark((function r() { let n; let o; let a; return regeneratorRuntime.wrap(((r) => { while (1) switch (r.prev = r.next) { case 0: return n = e.dispatch, r.prev = 1, r.next = 4, v.a.signInWithEmailAndPassword(t.email, t.password); case 4: o = r.sent, a = o.user, n('getUser', a), r.next = 12; break; case 9: r.prev = 9, r.t0 = r.catch(1), n('setError', r.t0); case 12: case 'end': return r.stop(); } }), r, null, [[1, 9]]); })))(); },
        getUser(e, t) { return Object(f.a)(regeneratorRuntime.mark((function r() { let n; let o; return regeneratorRuntime.wrap(((r) => { while (1) switch (r.prev = r.next) { case 0: return n = e.commit, r.next = 3, v.c.doc(t.uid).get(); case 3: o = r.sent, n('setUser', o.data()), U.currentRoute.value.name === 'login' && U.push('/'); case 6: case 'end': return r.stop(); } }), r); })))(); },
        logout(e) { return Object(f.a)(regeneratorRuntime.mark((function t() { let r; return regeneratorRuntime.wrap(((t) => { while (1) switch (t.prev = t.next) { case 0: return r = e.commit, t.next = 3, v.a.signOut(); case 3: r('setUser', {}), U.push('/login'); case 5: case 'end': return t.stop(); } }), t); })))(); },
        setError(e, t) { const r = e.commit; r('setError', t), console.error('Error in userStore:', t); },
      },
    }; const O = {
      namespaced: !0,
      state: {
        stepIndex: 1, showPopUp: !0, activeTab: 'give', showFeedbackHelperZero: !0,
      },
      getters: {
        stepIndex(e) { return e.stepIndex; }, showPopUp(e) { return e.showPopUp; }, activeTab(e) { return e.activeTab; }, showFeedbackHelperZero(e) { return e.showFeedbackHelperZero; },
      },
      mutations: {
        setStepIndex(e, t) { e.stepIndex = t; }, setShowPopUp(e, t) { e.showPopUp = t; }, setActiveTab(e, t) { e.activeTab = t; }, setShowFeedbackHelperZero(e, t) { e.showFeedbackHelperZero = t; },
      },
      actions: {
        updateStepIndex(e, t) { const r = e.commit; const n = e.getters; const o = e.dispatch; const a = t === 'previousStep' ? n.stepIndex - 1 : n.stepIndex + 1; r('setStepIndex', a), o('updateShowFeedbackHelperZero', !0); }, updateShowPopUp(e) { const t = e.commit; t('setShowPopUp', !1); }, updateActiveTab(e, t) { const r = e.commit; r('setActiveTab', t); }, updateShowFeedbackHelperZero(e, t) { const r = e.commit; const n = e.getters; typeof t === 'undefined' && (t = !n.showFeedbackHelperZero), r('setShowFeedbackHelperZero', t); },
      },
    }; const k = Object(p.a)({ modules: { group: w, user: j, sidebar: O } }); const x = [{ path: '/poc/give', name: 'give', component() { return r.e('login').then(r.bind(null, '2c9f')); } }, { path: '/poc/done', name: 'done', component() { return r.e('login').then(r.bind(null, '3e74')); } }, {
      path: '/', name: 'dashboard', component: h, meta: { requiresAuth: !0 },
    }, { path: '/login', name: 'login', component() { return r.e('login').then(r.bind(null, 'a55b')); } }, {
      path: '/settings', name: 'settings', component() { return r.e('settings').then(r.bind(null, '26d3')); }, meta: { requiresAuth: !0 },
    }, {
      path: '/admin', name: 'admin', component() { return r.e('settings').then(r.bind(null, '3530')); }, meta: { requiresAuth: !0, allowedRoles: ['admin'] },
    }, { path: '/404', name: '404', component() { return r.e('404').then(r.bind(null, '8cdb')); } }, { path: '/:pathMatch(.*)*', redirect: { name: 'dashboard' } }]; const y = Object(g.a)({ history: Object(g.b)('/'), routes: x }); y.beforeEach(function () { const e = Object(f.a)(regeneratorRuntime.mark((function e(t, r, n) { let o; let a; let u; return regeneratorRuntime.wrap(((e) => { while (1) switch (e.prev = e.next) { case 0: if (o = t.matched.some(((e) => e.meta.requiresAuth)), a = t.meta.allowedRoles, !o || v.a.currentUser) { e.next = 7; break; }console.log('requires authorisation and user is not authorised'), n('/login'), e.next = 20; break; case 7: if (!a) { e.next = 19; break; } if (v.a.currentUser) { e.next = 13; break; }console.log('requires permission and user is not authorised'), n('/login'), e.next = 17; break; case 13: return e.next = 15, k.dispatch('user/getUser', v.a.currentUser).then((() => k.getters['user/role'])); case 15: u = e.sent, u && a.includes(u) ? (console.log('user is allowed to view page'), n()) : (console.log('user does not have the required permissions'), n('/404')); case 17: e.next = 20; break; case 19: n(); case 20: case 'end': return e.stop(); } }), e); }))); return function (t, r, n) { return e.apply(this, arguments); }; }()); let S; var U = y; v.a.onAuthStateChanged(((e) => { S || (S = Object(n.c)(d).use(k).use(U).mount('#app')), e && k.dispatch('user/getUser', e); }));
  },
  dc59(e, t, r) {
    r.d(t, 'a', (() => a)), r.d(t, 'b', (() => s)), r.d(t, 'c', (() => c)); const n = r('260b'); const o = (r('ea7b'), r('e71f'), {
      apiKey: 'AIzaSyA11RU9wX76_8S95XtupC2c4ItCc7bvBpM', authDomain: 'feedback-platform-82621.firebaseapp.com', databaseURL: 'https://feedback-platform-82621-default-rtdb.europe-west1.firebasedatabase.app', projectId: 'feedback-platform-82621', storageBucket: 'feedback-platform-82621.appspot.com', messagingSenderId: '145686348099', appId: '1:145686348099:web:1f093e4b8746b47d87eff6', measurementId: 'G-KFZCMJKNNV',
    }); n.a.initializeApp(o); var a = n.a.auth(); const u = n.a.firestore(); var s = u.collection('groups'); var c = u.collection('users');
  },
}));
// # sourceMappingURL=app.f75b12d4.js.map