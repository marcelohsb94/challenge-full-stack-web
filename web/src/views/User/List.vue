<template>
	<v-row align="center" class="list px-2">
		<v-col cols="12" md="8" class="float-right">
			<v-text-field label="Buscar..."></v-text-field>
		</v-col>
		<v-col cols="12" sm="12">
			<v-card class="mx-auto" tile>
				<v-card-title>Usuários</v-card-title>
				<v-data-table :headers="headers" :items="users" :items-per-page="15" class="elevation-1" locale="pt-BR">
					<template v-slot:[`item.actions`]>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-bind="attrs" v-on="on" color="primary" fab small class="mr-2">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Editar</span>
						</v-tooltip>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-bind="attrs" v-on="on" color="error" fab small dark>
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
				<v-btn v-bind="attrs" v-on="on" fab absolute bottom right dark color="primary" style="bottom:20px" link to="/dashboard/alunos/novo">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</template>
			<span>Novo Usuário</span>
		</v-tooltip>
	</v-row>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				headers: [
					{ text: 'Nome', value: 'name', align: 'start' },
					{ text: 'E-Mail', value: 'email' },
					{ text: 'Ações', value: 'actions', align: 'center', sortable: false }
				],
				users: []
			}
		},
		mounted () {
			axios.get('http://localhost:3001/usuarios', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			})
			.then(response => {
				console.log(response.data);
				this.users = response.data
			})
			.catch(error => {
				console.log(error)
			})
		}
	}
</script>