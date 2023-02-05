import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';   //npm i react-firebase-hooks
import { useEffect } from 'react';




export default function Login() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);


    //sign in google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push('/')
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(user){
            route.push('/')
        }else{
            console.log('login')
        }

    }, [user]);





    return (
        <div className='shadow-2xl mt-32 p-10 text-gray-700 rounded-lg'>
            <h2 className='text-xl font-bold'>Login</h2>
            <div className="py-4">
                <h3 className='py-4 font-medium'>Sign in with: </h3>
                <button onClick={GoogleLogin} className='text-white text-xl bg-gray-700 gap-2 w-full font-medium rounded-lg flex justify-center items-center p-4'>
                    Google <FcGoogle className='text-2xl ' /></button>
            </div>
        </div>
    )
}
