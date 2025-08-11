'use client'

import { Button } from './button'
import { logout } from '../lib/actions'

import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/16/solid'

const SignInButton = () => {
  return (
    <Button type='button' onClick={logout}>
      Sign Out
    </Button>
  )
}

export default SignInButton
