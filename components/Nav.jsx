import React from 'react';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';







function Nav() {

  const [user, loading] = useAuthState(auth); //importa il logn per l''user


  return (
    <nav className='flex justify-between items-center py-1 bg-zinc-300 rounded-lg px-5 mt-5'>
      <Link href='/'>
        <div className='text-lg font-medium'>Creative minds</div>
      </Link>
      <ul className='flex items-center gap-10'>
        {!user && (
          <Link legacyBehavior href={'/auth/login'}>
            <a className='py-2 px-2 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8 my-3'>
              Login
            </a>
          </Link>
        )}{user && (
          <div className="flex items-center gap-6 my-3">
            <Link href='/post'>
              <button className='font-medium bg-cyan-500 text-white  py-2 px-4 rounded-lg text-md'>
                Post
              </button>
            </Link>
            <Link href='/dashboard'>
              <img className='w-12 rounded-full cursor-pointer'
               src={user.photoURL} />
            </Link>
          </div>
        )}

      </ul>
    </nav>
  )
}

export default Nav;
