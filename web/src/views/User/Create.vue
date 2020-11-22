<template>
	<v-row class="px-2">
		<v-col>
			<v-btn link to="/dashboard/usuarios/" class="float-left mr-2 mt-2" small color="primary" outlined>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<h1 class="d-inline-block">Adicionar Usuario</h1>
		</v-col>
		<v-col cols="12">
			<v-card class="px-5 py-5">
				<validation-observer ref="observer" v-slot="{ invalid }">
					<form @submit.prevent="submit">
						<validation-provider v-slot="{ errors }" name="Nome" rules="required|alpha_spaces">
							<v-text-field v-model="name" :error-messages="errors" label="Nome" required></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="Email" rules="required|email">
							<v-text-field v-model="email" :error-messages="errors" label="E-Mail" required></v-text-field>
						</validation-provider>
						<validation-provider v-slot="{ errors }" name="Senha" rules="required">
							<v-text-field v-model="password" :error-messages="errors" label="Senha" required type="password"></v-text-field>
						</validation-provider>
						<v-tooltip left>
							<template v-slot:activator="{ on, attrs }">
								<v-btn type="submit" v-bind="attrs" v-on="on" fab fixed bottom right color="primary" style="bottom:55px; z-index:9000" :disabled="invalid">
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
	import { required, email, alpha_spaces } from 'vee-validate/dist/rules';
	import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
	import bcrypt from 'bcryptjs';
	import axios from 'axios';
	import router from '../../routes';

	setInteractionMode('eager')

	extend('required', {
		...required,
		message: 'O campo {_field_} é obrigatório!',
	});

	extend('email', {
		...email,
		message: 'Um e-mail válido é necessário!',
	});

	extend('alpha_spaces', {
		...alpha_spaces,
		message: 'Apenas letras e espaços'
	})

	export default {
		components: {
			ValidationProvider,
			ValidationObserver,
		},

		data: () => ({
			name: '',
			email: '',
			password: ''
		}),

		methods: {
			submit() {
				const thisName = this.name;
				const thisEmail = this.email;
				bcrypt.hash(this.password, 10).then(async function(hash) {
					axios.post('http://localhost:3001/usuarios/', {
						name: thisName,
						email: thisEmail,
						password: hash
					}, {
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('userToken')
						}
					})
					.then(() => {
						router.replace('/dashboard/usuarios');
					})
					.catch((error) => {
						console.log(error);
					});
				});
			}
		},
	}
</script>