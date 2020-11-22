<template>
	<v-row align="center" class="list px-2">
		<v-col>
			<h1 class="d-inline-block">Usuários</h1>
		</v-col>
		<v-col cols="12" md="5">
			<form @submit.prevent="searchUser">
				<v-text-field label="Buscar..." v-model="search" append-icon="mdi-magnify" class="float-right" @click:append="searchUser"></v-text-field>
			</form>
		</v-col>
		<v-col cols="12" sm="12">
			<v-card class="mx-auto" tile>
				<v-data-table :headers="headers" :items="users" :items-per-page="15" class="elevation-1" locale="pt-BR">
					<template v-slot:[`item.actions`]={item}>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-bind="attrs" v-on="on" color="primary" fab small outlined class="mr-2" link :to="{ path: '/dashboard/usuarios/editar/' + item.id }">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Editar</span>
						</v-tooltip>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-bind="attrs" v-on="on" color="error" fab small outlined dark @click="openDeleteDialog(item.id)">
									<v-icon small>mdi-delete</v-icon>
								</v-btn>
							</template>
							<span>Excluir</span>
						</v-tooltip>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
		<v-tooltip left>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on" fab absolute bottom right dark color="primary" style="bottom:20px" link to="/dashboard/usuarios/novo">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</template>
			<span>Novo Usuário</span>
		</v-tooltip>
		<v-dialog v-model="dialog" persistent max-width="290">
			<v-card>
				<v-card-title class="headline">
					Excluir este registro?
				</v-card-title>
				<v-card-text>A remoção é permanente, portando não há como reverter. Tem certeza?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="grey darken-1" text @click="dialog = false; id = null">
						Cancelar
					</v-btn>
					<v-btn color="green darken-1" text @click="deleteUser(id); dialog = false; id = null">
						Sim
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
	import axios from 'axios'
	export default {
		data: () => ({
			id: null,
			search: '',
			headers: [
				{ text: 'Nome', value: 'name', align: 'start' },
				{ text: 'E-Mail', value: 'email' },
				{ text: 'Ações', value: 'actions', align: 'center', sortable: false }
			],
			users: [],
			dialog: false,
		}),

		mounted () {
			axios.get('http://localhost:3001/usuarios', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			})
			.then(response => {
				this.users = response.data
			})
			.catch(error => {
				console.log(error)
			})
		},

		methods: {
			searchUser() {
				axios.get('http://localhost:3001/usuarios?search=' + this.search, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('userToken')
					}
				})
				.then(response => {
					this.users = response.data
				})
				.catch(error => {
					console.log(error)
				})
			},
			openDeleteDialog(id) {
				this.id = id;
				this.dialog = true;
			},
			deleteUser(id) {
				axios.delete('http://localhost:3001/usuarios/' + id, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('userToken')
					}
				})
				.then(() => {
					this.searchUser();
				})
				.catch(error => {
					console.log(error);
				})
			}
		}
	}
</script>