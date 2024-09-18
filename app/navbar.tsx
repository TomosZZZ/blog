import React from 'react'

import { Silkscreen } from 'next/font/google'
import Link from 'next/link'
import { NAVBAR_LINKS } from '@/constants'

const silkscreen = Silkscreen({ weight: '700', subsets: ['latin'] })

const Navbar = () => {
	return (
		<nav className=' h-[10%] py-5 px-5 bg-black text-white border-b border-white border-opacity-10 flex flex-col gap-4 sm:flex-row items-center justify-between mb-5'>
			<div className='md:w-1/2 sm:w-2/5 w-full flex justify-center'>
				<Link href={'/'}>
					<h1
						className={`text-3xl font-bold select-none cursor-pointer ${silkscreen.className}`}>
						TomCode
					</h1>
				</Link>
			</div>
			<ul className='flex md:gap-7 sm:gap-5 gap-3 items-center md:w-1/2 sm:w-3/5 w-full justify-center '>
				{NAVBAR_LINKS.map(link => (
					<li key={link.href} className='md:text-xl text-lg'>
						<Link className='hover:text-gray-200' href={link.href}>
							{link.text}
						</Link>
					</li>
				))}
				<li className='border-violet-500 border-2 rounded-lg md:py-3 py-2 md:px-5 px-4 tracking-widest md:text-xl text-lg hover:text-gray-200 md:ml-8 sm:ml-4 ml-2 hover:bg-violet-800 cursor-pointer transition '>
					<Link href='/auth/signup'>Sign up</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
