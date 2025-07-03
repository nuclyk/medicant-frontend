import { init } from '../serverless.js';

export const handler = init((() => {
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
		client: {start:"_app/immutable/entry/start.VM-e0_RH.js",app:"_app/immutable/entry/app.CXZ9lHA_.js",imports:["_app/immutable/entry/start.VM-e0_RH.js","_app/immutable/chunks/D2Ok8g_2.js","_app/immutable/chunks/DyHxZ_1q.js","_app/immutable/chunks/DQqt1VYi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Dg1qgpEv.js","_app/immutable/chunks/DgtScFKl.js","_app/immutable/chunks/CM8cw_so.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/entry/app.CXZ9lHA_.js","_app/immutable/chunks/DQqt1VYi.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Dg1qgpEv.js","_app/immutable/chunks/DgtScFKl.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/DyHxZ_1q.js","_app/immutable/chunks/CM8cw_so.js","_app/immutable/chunks/BiOzYf2j.js","_app/immutable/chunks/BMillbw9.js","_app/immutable/chunks/Bs2Mp6PR.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js')),
			__memo(() => import('../server/nodes/14.js')),
			__memo(() => import('../server/nodes/15.js')),
			__memo(() => import('../server/nodes/16.js')),
			__memo(() => import('../server/nodes/17.js')),
			__memo(() => import('../server/nodes/18.js'))
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
})());
