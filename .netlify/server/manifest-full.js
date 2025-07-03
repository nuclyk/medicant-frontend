export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BVdzuQ2N.js",app:"_app/immutable/entry/app.DHRctplA.js",imports:["_app/immutable/entry/start.BVdzuQ2N.js","_app/immutable/chunks/CS8JrgrT.js","_app/immutable/chunks/CKdGoujf.js","_app/immutable/chunks/BHCDbYjI.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/uq3tYx7w.js","_app/immutable/chunks/CP1hUgR_.js","_app/immutable/chunks/BYWFG7NC.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/entry/app.DHRctplA.js","_app/immutable/chunks/BHCDbYjI.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/uq3tYx7w.js","_app/immutable/chunks/CP1hUgR_.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CKdGoujf.js","_app/immutable/chunks/BYWFG7NC.js","_app/immutable/chunks/BTcLUuqF.js","_app/immutable/chunks/DyBHCqYk.js","_app/immutable/chunks/DXuRZFiB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/manage",
				pattern: /^\/admin\/manage\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,4,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/manage/places",
				pattern: /^\/admin\/manage\/places\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,4,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/manage/retreats",
				pattern: /^\/admin\/manage\/retreats\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,4,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/manage/users",
				pattern: /^\/admin\/manage\/users\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,4,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/manage/users/[slug]",
				pattern: /^\/admin\/manage\/users\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,4,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/qrcodes",
				pattern: /^\/admin\/qrcodes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/form/checkin",
				pattern: /^\/form\/checkin\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,6,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/form/checkout",
				pattern: /^\/form\/checkout\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,6,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,,], errors: [1,7,], leaf: 18 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
