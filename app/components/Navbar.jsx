'use client'
import { Menu } from 'lucide-react' 
import React, { useState } from 'react' 
import Modal from './Modal'

export default function Navbar({ name }) {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className='flex h-16 bg-deep-blue sm:hidden text-white'> 
            <div className='flex justify-between items-center w-full p-2'>

                <div className='flex items-center justify-between gap-2'>
                    <div className='border-0 hover:border-1 flex items-center justify-center rounded-full bg-light-blue p-2 h-10 w-10 cursor-pointer'>{name?.charAt(0)}</div>
                    <div>
                        <div>Welcome {name}</div>
                    </div>
                </div>

                <div className='relative'>
                    <Menu
                        color='white'
                        className='cursor-pointer'
                        onClick={() => setOpenMenu(!openMenu)}
                    />
                    {openMenu &&
                        <div className='absolute bg-deep-blue top-full z-50 right-0 mr-2'>
                            <Modal openMenu={openMenu} setOpenMenu={setOpenMenu} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
