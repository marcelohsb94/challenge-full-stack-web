<template>
	<v-row class="px-2">
		<v-col>
			<v-btn link to="/dashboard/alunos/" class="float-left mr-2 mt-2" small color="primary" outlined>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<h1 class="d-inline-block">Atualizar Aluno</h1>
		</v-col>
		<v-col cols="12">
			<v-card class="px-5 py-5">
				<validation-observer ref="observer" v-slot="{ invalid }">
					<form @submit.prevent="submit">
						<validation-provider v-slot="{ errors }" name="Nome" rules="required">
							<v-text-field v-model="name" :error-messages="errors" label="Nome" required></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="Email" rules="required">
							<v-text-field v-model="email" :error-messages="errors" label="E-Mail" required></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="RA" rules="required">
							<v-text-field v-model="ra" :error-messages="errors" label="RA" required disabled></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="CPF" rules="required">
							<v-text-field v-model="cpf" :error-messages="errors" label="CPF" required disabled></v-text-field>
						</validation-provider>
						<v-tooltip left>
							<template v-slot:activator="{ on, attrs }">
								<v-btn type="submit" v-bind="attrs" v-on="on" fab fixed bottom right dark color="primary" style="bottom:55px" :disabled="invalid">
									<v-icon>mdi-content-save</v-icon>
								</v-btn>
							</template>
							<span>Salvar</span>
						</v-tooltip>
					</form>
				</validation-observer>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import { required, email } from 'vee-validate/dist/rules';
	import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
	import axios from 'axios';

	setInteractionMode('eager')

	extend('required', {
		...required,
		message: 'O campo {_field_} é obrigatório',
	})

	extend('email', {
		...email,
		message: 'Email válido necessário',
	})

	export default {
		components: {
			ValidationProvider,
			ValidationObserver,
		},
		data: () => ({
			id: '',
			name: '',
			email: '',
			ra: '',
			cpf: ''
		}),

		methods: {
			submit() {
				axios.put('http://localhost:3001/alunos/'+ this.id, {
					name: this.name,
					email: this.email
				}, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('userToken')
					}
				})
				.then(response => {

					console.log(response.data);
				})
				.catch(error => {
					console.log(error);
				});
			}
		},

		mounted() {
			this.id = this.$route.params.id;
			axios.get('http://localhost:3001/alunos/' + this.id, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			})
			.then(response => {
				this.id = response.data.id;
				this.name = response.data.name;
				this.email = response.data.email;
				this.ra = response.data.ra;
				this.cpf = response.data.cpf;
			})
			.catch(error => {
				console.log(error)
			})
		}
	}
</script>