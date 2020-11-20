<template>
	<v-row align="center" class="list px-3 mx-auto">
		<v-col cols="12" md="8">
			<v-text-field label="Buscar..."></v-text-field>
		</v-col>
		<v-col cols="12" md="4">
			<v-btn small>Buscar</v-btn>
		</v-col>
		<v-col cols="12" sm="12">
			<v-card class="mx-auto" tile>
				<v-card-title>Alunos</v-card-title>
				<v-data-table :headers="headers" :items="users" :items-per-page="5" class="elevation-1">
					<template v-slot:[`item.actions`]>
						<v-icon small class="mr-2">mdi-pencil</v-icon>
						<v-icon small>mdi-delete</v-icon>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
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
			axios.get('http://localhost:3001/usuarios')
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