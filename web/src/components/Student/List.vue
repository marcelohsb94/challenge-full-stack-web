<template>
	<v-row align="center" class="list px-3">
		<v-col>
			<h1>Alunos</h1>
		</v-col>
		<v-col cols="12" md="5">
			<form @submit.prevent="searchStudent">
				<v-text-field label="Buscar..." v-model="search" append-icon="mdi-magnify" class="float-right" @click:append="searchStudent"></v-text-field>
			</form>
		</v-col>
		<v-col cols="12" sm="12">
			<v-card tile>
				<v-data-table :headers="headers" :items="students" :items-per-page="15" class="elevation-1" locale="pt">
					<template v-slot:[`item.actions`]={item}>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-bind="attrs" v-on="on" color="primary" fab small class="mr-2" link :to="{ path: '/dashboard/alunos/editar/' + item.id }">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Editar</span>
						</v-tooltip>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-bind="attrs" v-on="on" color="error" fab small dark @click="deleteStudent(item.id)">
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
			<span>Novo Aluno</span>
		</v-tooltip>

	</v-row>
</template>

<script>
	import axios from 'axios'
	export default {
		data: () => ({
			search: '',
			headers: [
				{ text: 'RA', value: 'ra', align: 'start' },
				{ text: 'Nome', value: 'name', align: 'start' },
				{ text: 'E-Mail', value: 'email' },
				{ text: 'Ações', value: 'actions', align: 'center', sortable: false }
			],
			students: []
		}),

		mounted () {
			axios.get('http://localhost:3001/alunos', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			})
			.then(response => {
				this.students = response.data
			})
			.catch(error => {
				console.log(error)
			})
		},
		methods: {
			searchStudent() {
				axios.get('http://localhost:3001/alunos?search='+this.search, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('userToken')
					}
				})
				.then(response => {
					this.students = response.data
					console.log(this.students);
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>