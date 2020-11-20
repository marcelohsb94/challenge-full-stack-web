import Vue from 'vue'
import VueRouter from 'vue-router'

import AppLayout from "./layouts/App.vue";
import PublicLayout from "./layouts/Public.vue";

import SignInUser from '@/components/User/SignIn';
import Dashboard from '@/components/Dashboard';
import ListStudents from '@/components/Student/List';
import ListUsers from '@/components/User/List';

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: PublicLayout,
			children: [
				{
					path: '',
					component: SignInUser
				}
			]
		},
		{
			path: '/dashboard/',
			component: AppLayout,
			children: [
				{
					path: '',
					component: Dashboard,
					meta: {
						requiresAuth: true
					},

				},
				{
					path: 'alunos/',
					component: ListStudents,
					meta: {
						requiresAuth: true
					},
				},
				{
					path: 'usuarios/',
					component: ListUsers,
					meta: {
						requiresAuth: true
					},
				}
			]
		}

	]
});
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		console.log('asd');
			if (localStorage.getItem('user') === null) {
				next({
					path: '/',
				});
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router;