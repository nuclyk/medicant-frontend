import * as server from '../entries/pages/admin/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.DVWgfp6f.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DQqt1VYi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CM8cw_so.js","_app/immutable/chunks/DgtScFKl.js","_app/immutable/chunks/BiOzYf2j.js","_app/immutable/chunks/DG_Y3DWX.js","_app/immutable/chunks/BF7VELds.js"];
export const stylesheets = [];
export const fonts = [];
