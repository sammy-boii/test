'use client'

import { Button } from './button'
import { login } from '../lib/actions'

import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/16/solid'

const SignInButton = () => {
  return (
    <Button type='button' onClick={login} className='mt-4 w-full'>
      Log in with Github
      <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
    </Button>
  )
}

export default SignInButton
