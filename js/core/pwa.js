/* core/pwa.js — Installazione come app (PWA). */
const isApp=()=>matchMedia("(display-mode: standalone)").matches||matchMedia("(display-mode: window-controls-overlay)").matches||matchMedia("(display-mode: minimal-ui)").matches||navigator.standalone===true;
const hideIns=()=>{$("insec").hidden=isApp()};
