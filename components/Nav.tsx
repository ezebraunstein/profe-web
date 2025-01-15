import Head from 'next/head'
import Link from 'next/link'
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

const Nav = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Profe Web</title>
        <meta name="description" content="Clases de matemática :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="p-8 mb-6 flex items-center space-x-3">
        {/* Left Section */}
        <ul className="flex gap-2">
          <li>
            <Link href="/" className="underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
          </li>
          {session && (
            <li>
              <Link href="/admin" className="underline">
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Center Section */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <Image
            alt="Profe Web"
            height={24}
            src="/images/profeweb.png"
            width={75}
            className="mr-2"
          />
          <span className="font-cal text-lg sm:text-5xl">Profe Web</span>
        </div>

        {/* Right Section */}
        <div className="flex-1 text-right text-sm">
          {session ? (
            <div>
              {session.user?.email} <br />
              <button className="underline" onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          ) : (
            <p>
              <button onClick={() => signIn()}>Sign in with Google</button>
            </p>
          )}
        </div>
      </nav>
    </>
  )
}

export default Nav;
