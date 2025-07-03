import * as server from '../entries/pages/admin/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.BlSRjZZz.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/BHCDbYjI.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BYWFG7NC.js","_app/immutable/chunks/BTcLUuqF.js"];
export const stylesheets = [];
export const fonts = [];
