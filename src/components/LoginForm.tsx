import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Profile = {
	username: string
	password: string
	errors: string
}

interface LoginDataProps {
	onLogin(data: any): void
	data: {}
}

export const LoginForm: React.FC<LoginDataProps> = ({ onLogin }, { data }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Profile>()

	const onSubmit = handleSubmit((data) => {
		onLogin(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor='username'>Username</label>
				<input
					{...register('username', { required: true })}
					id='username'
					name='username'
					type='text'
					defaultValue={'test@bsgroup.eu'}
				/>
				{errors.username && <div className='error'>This field is required</div>}
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					{...register('password', { required: true })}
					id='password'
					name='password'
					type='password'
					defaultValue={'Test12!@'}
				/>
				{errors.username && <div className='error'>This field is required</div>}
			</div>
			<button>Login</button>
		</form>
	)
}
