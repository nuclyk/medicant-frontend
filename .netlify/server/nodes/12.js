import * as universal from '../entries/pages/admin/manage/retreats/_page.js';
import * as server from '../entries/pages/admin/manage/retreats/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/manage/retreats/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/admin/manage/retreats/+page.js";
export { server };
export const server_id = "src/routes/admin/manage/retreats/+page.server.js";
export const imports = ["_app/immutable/nodes/12.DYApMa6T.js","_app/immutable/chunks/KjYeVjkE.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BHCDbYjI.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/uq3tYx7w.js","_app/immutable/chunks/CP1hUgR_.js","_app/immutable/chunks/CSWbaJWA.js","_app/immutable/chunks/CNhLC-q5.js","_app/immutable/chunks/CS8JrgrT.js","_app/immutable/chunks/CKdGoujf.js","_app/immutable/chunks/BYWFG7NC.js","_app/immutable/chunks/BPijbY_g.js","_app/immutable/chunks/quB2HYJk.js","_app/immutable/chunks/2rai63wT.js","_app/immutable/chunks/Qq3VosFY.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
