import Vue from 'vue'
import VueRouter from 'vue-router'

import AppLayout from "./layouts/App.vue";
import PublicLayout from "./layouts/Public.vue";

import SignInUser from '@/views/User/SignIn';

import Dashboard from '@/views/Dashboard';

import ListUsers from '@/views/User/List';

import ListStudents from '@/views/Student/List';
import CreateStudent from '@/views/Student/Create';
import UpdateStudent from '@/views/Student/Update';

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
					path: 'alunos/novo',
					component: CreateStudent,
					meta: {
						requiresAuth: true
					},
				},
				{
					path: 'alunos/editar/:id',
					component: UpdateStudent,
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
			if (localStorage.getItem('userToken') === null) {
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