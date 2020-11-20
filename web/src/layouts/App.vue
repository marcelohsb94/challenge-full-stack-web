<template>
	<v-app light>
		<v-navigation-drawer v-model="drawer" app clipped>
			<v-list>
				<v-list-item-group active-class="blue--text text--darken-4">
					<v-list-item link to="/dashboard/" exact>
						<v-list-item-icon>
							<v-icon>mdi-view-dashboard</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item>
					<v-list-item link to="/dashboard/usuarios">
						<v-list-item-icon>
							<v-icon>mdi-account-multiple</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Usuários</v-list-item-title>
					</v-list-item>
					<v-list-item link to="/dashboard/alunos">
						<v-list-item-icon>
							<v-icon>mdi-school</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Alunos</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar color="blue darken-4" dark fixed app clipped-left>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Page title</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>
				<v-list dense>
					<v-list-item @click="() => {}">
						<v-list-item-title>Meus Dados</v-list-item-title>
						<v-list-item-icon>
							<v-icon>mdi-account</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="logout">
						<v-list-item-title>Sair</v-list-item-title>
						<v-list-item-icon>
							<v-icon color="red">mdi-logout</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-content>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-content>
		<v-footer app>
			footer
		</v-footer>
	</v-app>
</template>

<script>
	import router from '../routes';

	export default {
		data: () => ({
			drawer: true
		}),
		methods: {
			logout() {
				localStorage.removeItem('user');
				router.replace('/');
			}
		}
	}
</script>