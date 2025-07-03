import * as universal from '../entries/pages/admin/manage/places/_page.js';
import * as server from '../entries/pages/admin/manage/places/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/manage/places/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/admin/manage/places/+page.js";
export { server };
export const server_id = "src/routes/admin/manage/places/+page.server.js";
export const imports = ["_app/immutable/nodes/11.BT6mF9xx.js","_app/immutable/chunks/KjYeVjkE.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DQqt1VYi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DgtScFKl.js","_app/immutable/chunks/CMxo_gYf.js","_app/immutable/chunks/DEfsHgN8.js","_app/immutable/chunks/D2Ok8g_2.js","_app/immutable/chunks/DyHxZ_1q.js","_app/immutable/chunks/Dg1qgpEv.js","_app/immutable/chunks/CM8cw_so.js","_app/immutable/chunks/DG_Y3DWX.js","_app/immutable/chunks/BF7VELds.js","_app/immutable/chunks/D9GCZsvq.js","_app/immutable/chunks/BYP_nyxr.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
