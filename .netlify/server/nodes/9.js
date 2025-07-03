import * as server from '../entries/pages/admin/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/9.BuObhRlK.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CKdGoujf.js","_app/immutable/chunks/BHCDbYjI.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/uq3tYx7w.js","_app/immutable/chunks/CP1hUgR_.js","_app/immutable/chunks/BYWFG7NC.js","_app/immutable/chunks/BTcLUuqF.js","_app/immutable/chunks/CSWbaJWA.js","_app/immutable/chunks/BPijbY_g.js","_app/immutable/chunks/quB2HYJk.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/2rai63wT.js","_app/immutable/chunks/KjYeVjkE.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/Qq3VosFY.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
