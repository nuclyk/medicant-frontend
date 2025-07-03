import * as server from '../entries/pages/admin/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/9.C5uSIOWd.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DyHxZ_1q.js","_app/immutable/chunks/DQqt1VYi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Dg1qgpEv.js","_app/immutable/chunks/DgtScFKl.js","_app/immutable/chunks/CM8cw_so.js","_app/immutable/chunks/BiOzYf2j.js","_app/immutable/chunks/CMxo_gYf.js","_app/immutable/chunks/DG_Y3DWX.js","_app/immutable/chunks/BF7VELds.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/QtCe8tbb.js","_app/immutable/chunks/BYP_nyxr.js","_app/immutable/chunks/KjYeVjkE.js","_app/immutable/chunks/CYgJF_JY.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
