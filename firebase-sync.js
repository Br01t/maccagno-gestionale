// Sincronizzazione opzionale con Firestore (piano gratuito Spark). Carica l'SDK solo se la config è presente.
const cfg = window.FIREBASE_CONFIG, M = window.MAPSYNC, btn = document.getElementById("fb-b");
const V = "10.12.2", B = `https://www.gstatic.com/firebasejs/${V}/`;
if (cfg && cfg.projectId && M && btn) {
  btn.hidden = false;
  let unsub = null, auth, db, fs, au, uid = null;
  const flag = () => { try { return localStorage.getItem("maccagno-fb") === "1"; } catch (e) { return false; } };
  const setFlag = v => { try { v ? localStorage.setItem("maccagno-fb", "1") : localStorage.removeItem("maccagno-fb"); } catch (e) {} };
  async function load() {
    if (db) return;
    const [app, a, f] = await Promise.all([import(B + "firebase-app.js"), import(B + "firebase-auth.js"), import(B + "firebase-firestore.js")]);
    au = a; fs = f;
    const ap = app.initializeApp(cfg);
    auth = a.getAuth(ap);
    db = f.initializeFirestore(ap, { localCache: f.persistentLocalCache({ tabManager: f.persistentMultipleTabManager() }) });
  }
  function connect(user) {
    uid = user.uid;
    const d = fs.doc(db, "users", uid, "maps", "main");
    M.use({ set: x => fs.setDoc(d, x) }, "☁️ Firebase: " + (user.email || "collegato"));
    btn.textContent = "☁️ Scollega Firebase";
    unsub = fs.onSnapshot(d, s => M.remote({ exists: s.exists(), data: () => s.data() }),
      () => M.sy("⚠️ Firebase non raggiungibile (modalità offline)", "err"));
  }
  function disconnect() { if (unsub) unsub(); unsub = null; M.drop("💾 Solo su questo dispositivo"); btn.textContent = "☁️ Sincronizza con Firebase"; }
  btn.onclick = async () => {
    try {
      await load();
      if (unsub) { disconnect(); setFlag(false); await au.signOut(auth); return; }
      const r = await au.signInWithPopup(auth, new au.GoogleAuthProvider());
      setFlag(true); connect(r.user);
    } catch (e) { M.sy("⚠️ Login Firebase non riuscito: " + (e.code || e.message), "err"); }
  };
  if (flag()) load().then(() => au.onAuthStateChanged(auth, u => { if (u && !unsub) connect(u); })).catch(() => {});
}
