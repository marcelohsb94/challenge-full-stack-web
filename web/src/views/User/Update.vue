<template>
	<v-row class="px-2">
		<v-col>
			<v-btn link to="/dashboard/usuarios/" class="float-left mr-2 mt-2" small color="primary" outlined>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<h1 class="d-inline-block">Atualizar Usuário</h1>
		</v-col>
		<v-col cols="12">
			<v-card class="px-5 py-5">
				<validation-observer ref="observer" v-slot="{ invalid }">
					<form @submit.prevent="submit">
						<validation-provider v-slot="{ errors }" name="Nome" rules="required">
							<v-text-field v-model="name" :error-messages="errors" label="Nome" required></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="Email" rules="required|email">
							<v-text-field v-model="email" :error-messages="errors" label="E-Mail" required></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="Senha">
							<v-text-field v-model="password" :error-messages="errors" label="Senha" type="password"></v-text-field>
						</validation-provider>
						<v-tooltip left>
							<template v-slot:activator="{ on, attrs }">
								<v-btn type="submit" v-bind="attrs" v-on="on" fab fixed bottom right color="primary" style="bottom:55px" :disabled="invalid">
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
	import bcrypt from 'bcryptjs';
	import axios from 'axios';
	import router from '../../routes';

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
			password: '',
		}),

		methods: {
			submit() {
				if (this.password != null) {
					var thisId = this.id;
					var thisName = this.name;
					var thisEmail = this.email;
					bcrypt.hash(this.password, 10).then(function(hash) {
						axios.put('http://localhost:3001/usuarios/' + thisId, {
							name: thisName,
							email: thisEmail,
							password: hash,
						}, {
							headers: {
								Authorization: 'Bearer ' + localStorage.getItem('userToken')
							}
						}).then(() => {
							router.replace('/dashboard/usuarios');
						}).catch((error) => {
							console.log(error);
						})
					});
				} else {
					axios.put('http://localhost:3001/usuarios/' + this.id, {
						name: this.name,
						email: this.email
					}).then((response) => {
						console.log(response);
					}).catch((error) => {
						console.log(error);
					})
				}
			}
		},

		mounted() {
			this.id = this.$route.params.id;
			axios.get('http://localhost:3001/usuarios/' + this.id, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			})
			.then(response => {
				this.id = response.data.id;
				this.name = response.data.name;
				this.email = response.data.email;
			})
			.catch(error => {
				console.log(error)
			})
		}
	}
</script>