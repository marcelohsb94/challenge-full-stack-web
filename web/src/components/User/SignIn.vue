<template>
	<v-layout fill-height align-center justify-center>
		<v-flex xs3>
			<v-card>
				<v-card-title class="blue darken-4">
					<v-toolbar-title class="title white--text pl-0">
						Login
					</v-toolbar-title>
				</v-card-title>
				<v-divider></v-divider>
				<v-col>
					<validation-observer ref="observer" v-slot="{ invalid }">
						<form @submit.prevent="submit">
							<validation-provider v-slot="{ errors }" name="Email" rules="required">
								<v-text-field v-model="email" :error-messages="errors" label="E-Mail" required></v-text-field>
							</validation-provider>
							<validation-provider v-slot="{ errors }" name="Senha" rules="required">
								<v-text-field v-model="password" type="password" :error-messages="errors" label="Senha" required></v-text-field>
							</validation-provider>
							<v-btn class="mr-4" type="submit" :disabled="invalid">
								Entrar
							</v-btn>
						</form>
					</validation-observer>
				</v-col>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<script>
	import { required, email } from 'vee-validate/dist/rules';
	import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
	import { bcrypt } from 'bcrypt';
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
			email: '',
			senha: '',
		}),

		methods: {
			submit () {
				if (this.password) {
					bcrypt.hash(this.password, 10, function(err, hash) {
						axios.post('http://localhost:3001/signin',{
							email: this.email,
							password: hash
						})
					});
				}
				// Obter dados do formulário
				// Modificar a senha para bcrypt
				// Enviar dados com axios para a api
				// Obter os dados e adicionar no localstorage
				// Redirecionar para dashboard.
			},
		},
	}
</script>