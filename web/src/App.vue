<template>
	<v-app>
		<v-app-bar app dark elevate-on-scroll color="blue darken-4">
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
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
					<v-list-item @click="() => {}">
						<v-list-item-title>Sair</v-list-item-title>
						<v-list-item-icon>
							<v-icon color="red">mdi-logout</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-main>
			<v-navigation-drawer v-model="drawer" absolute temporary clipped>
				<v-list nav dense>
					<v-list-item-group v-model="group" active-class="blue--text text--darken-4">
						<v-list-item link to="/">
							<v-list-item-icon>
								<v-icon>mdi-dashboard</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Dashboard</v-list-item-title>
						</v-list-item>
						<v-list-item link to="/LatestMovies">
							<v-list-item-icon>
								<v-icon>mdi-users</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Usuários</v-list-item-title>
						</v-list-item>
						<v-list-item link to="/Alunos">
							<v-list-item-icon>
								<v-icon>mdi-users</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Alunos</v-list-item-title>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-navigation-drawer>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>
		<v-footer app>
			footer
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data: () => ({
			drawer: false,
			group: null,
		}),
	}
</script>