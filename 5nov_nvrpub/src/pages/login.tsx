import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import AuthExperience from '@/components/auth/AuthExperience'

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | NRV Publication</title>
      </Head>
      <AuthExperience initialMode="login" />
    </>
  )
}

export default LoginPage
