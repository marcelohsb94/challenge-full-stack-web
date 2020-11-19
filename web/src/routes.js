import Vue from 'vue'
import VueRouter from 'vue-router'

import LatestMovies from '@/components/LatestMovie';
import Dashboard from '@/components/Dashboard';
import ListStudents from '@/components/Student/List';

Vue.use(VueRouter)

export default new VueRouter({
	routes: [{
		name: 'Dashboard',
		path: '/',
		component: Dashboard
	},
	{
		name: 'LatestMovies',
		path: '/LatestMovies/',
		component: LatestMovies
	},
	{
		name: 'ListStudents',
		path: '/Alunos/',
		component: ListStudents
	}]
})