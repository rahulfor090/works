import type { NextPage } from 'next'
import Head from 'next/head'
import AuthExperience from '@/components/auth/AuthExperience'

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | NRV Publication</title>
      </Head>
      <AuthExperience initialMode="signup" />
    </>
  )
}

export default SignupPage
