'use client'

import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import SignupFormSchema from '../schemas/signup-form-schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type SignupFormData = z.infer<typeof SignupFormSchema>

const SignupForm = () => {
	const form = useForm<SignupFormData>({
		resolver: zodResolver(SignupFormSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
		},
	})

	const submitHandler = (data: SignupFormData) => {
		console.log(data)
	}

	return (
		<Card className='lg:w-1/3 md:w-1/2 w-[80%] max-w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] border-black py-10  shadow-[0_8px_50px_rgb(255,255,255,0.2)] text-white flex flex-col items-center gap-12'>
			<h1 className='text-4xl font-extrabold  text-center up '>Sign up</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className='lg:w-1/2 sm:w-4/5 w-[90%]  sm:min-w-[300px] min-w-[250px]  flex flex-col gap-8 text-lg '>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										className='text-black'
										placeholder='Joe Doe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className='text-black'
										type='email'
										placeholder='joedoe@mail.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										className='text-black'
										placeholder='******'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='bg-violet-700 text-xl hover:bg-violet-900'>
						Create account
					</Button>
				</form>
			</Form>
		</Card>
	)
}

export default SignupForm
