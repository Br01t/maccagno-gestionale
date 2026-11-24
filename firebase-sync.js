// Accesso riservato + sincronizzazione Firestore (piano gratuito Spark).
// Se firebase-config.js non ha la config, l'app resta solo locale e senza login.
const cfg = window.FIREBASE_CONFIG, M = window.MAPSYNC, root = document.documentElement;
const lkb = document.getElementById("lk-b"), lkm = document.getElementById("lk-m"), out = document.getElementById("fb-b");
const V = "10.12.2", B = `https://www.gstatic.com/firebasejs/${V}/`;
const OK = "maccagno-fb-ok";
const get = () => { try { return localStorage.getItem(OK) === "1"; } catch (e) { return false; } };
const set = v => { try { v ? localStorage.setItem(OK, "1") : localStorage.removeItem(OK); } catch (e) {} };
if (cfg && cfg.projectId && M) {
  const owner = (cfg.ownerEmail || "").toLowerCase();
  let auth, db, fs, au, unsub = null;
  const say = (m, b) => { lkm.textContent = m; lkb.disabled = !b; };
  const unlock = () => root.classList.remove("locked");
  const lock = m => { root.classList.add("locked"); say(m || "Accesso riservato.", true); };
  function disconnect() { if (unsub) unsub(); unsub = null; out.hidden = true; M.drop("💾 Solo su questo dispositivo"); }
  function connect(user) {
    const d = fs.doc(db, "users", user.uid, "maps", "main");
    M.use({ set: x => fs.setDoc(d, x) }, "☁️ Sincronizzato: " + user.email);
    out.hidden = false;
    unsub = fs.onSnapshot(d, s => M.remote({ exists: s.exists(), data: () => s.data() }),
      () => M.sy("⚠️ Offline: i dati restano sul dispositivo e si sincronizzano al ritorno della rete", "err"));
  }
  async function init() {
    const [app, a, f] = await Promise.all([import(B + "firebase-app.js"), import(B + "firebase-auth.js"), import(B + "firebase-firestore.js")]);
    au = a; fs = f;
    const ap = app.initializeApp(cfg);
    auth = a.getAuth(ap);
    db = f.initializeFirestore(ap, { localCache: f.persistentLocalCache({ tabManager: f.persistentMultipleTabManager() }) });
    au.onAuthStateChanged(auth, async u => {
      if (!u) { disconnect(); set(false); return lock("Accesso riservato."); }
      if (!owner || (u.email || "").toLowerCase() !== owner) {
        disconnect(); set(false); await au.signOut(auth);
        return lock("Account non autorizzato (" + (u.email || "") + ").");
      }
      set(true); unlock(); if (!unsub) connect(u);
    });
    lkb.onclick = async () => {
      say("Accesso in corso…", false);
      try { await au.signInWithPopup(auth, new au.GoogleAuthProvider()); }
      catch (e) { lock("Accesso non riuscito: " + (e.code || e.message)); }
    };
    out.onclick = () => au.signOut(auth);
  }
  init().catch(() => {
    // SDK non raggiungibile (offline al primo avvio): se questo dispositivo era già autorizzato, usa i dati locali.
    if (get()) { unlock(); M.sy("📴 Offline: dati locali, la sincronizzazione riprende al ritorno della rete", "err"); }
    else lock("Serve la connessione per il primo accesso.");
  });
}
