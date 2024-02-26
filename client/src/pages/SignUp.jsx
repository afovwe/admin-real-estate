/* eslint-disable react/no-unescaped-entities */

import { Label, TextInput, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
       {/* left */}  
      <div className="flex-1">  
      
       <Link to="/" className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Fovwe's </span>
        Blog
       </Link>
       <p className='text-sm mt-5'>My sample dashboard; this is the handshaking page of my 
       website's dashboard</p>
        </div>
       {/*   right */}  
      <div className='flex-1'>   
       <form className='flex flex-col gap-4'>
        <div>
          <Label value='Enter your username'/>
          <TextInput
          type='text' 
          placeholder='Username'
          id='username' />
        </div>
        <div>
          <Label value='Enter your email'/>
          <TextInput
          type='text' 
          placeholder='Email'
          id='email' />
        </div>
        <div>
          <Label value='Enter your password'/>
          <TextInput
          type='password' 
          placeholder='password'
          id='password' />
        </div>
           <div>
          <Label value='Your Sponsor ID'/>
          <TextInput
          type='text' value='REQ8160285780'     placeholder='Sponsor ID'
          id='sponsorCid' disabled readOnly />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit'>
          Sign Up
        </Button>
           <div className='flex gap-2 text-sm mt-5'>
          <span>Have an acoount </span>
          <Link to='/sign-in' className='text-blue-500'>
            Sign In
          </Link>
        </div>
       </form>
      </div>
      </div>
    </div>
  )
}
