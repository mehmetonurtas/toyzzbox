import React from 'react'
import TopBar from './TopBar'
import Logo from './Logo'
import SearchBar from './Search'
import { auth, signIn } from "@/auth";
import { MenuBar } from './MenuBar'
import Wishlist from './Wishlist'
import CartCount from './CartCount'
import { Button } from '../ui/button'
import UserButton from './UserButton'
import SignInButton from './SignInButton';
import HamburgerMenu from './HamburgerMenu';

export default async function Header () {

  const session = await auth();
const user = session?.user;

  return (
    <div className='hidden md:block'>
        <div className='flex justify-end gap-2 p-2 '>
            <TopBar/>
        </div>
        <div>
          <HamburgerMenu/>
        </div>
        <div className='flex justify-around'>
          <Logo/>
          <SearchBar/>
          <div className='flex items-center gap-5'>
            <Wishlist/>
            {user ? <UserButton user={user} /> : <SignInButton/>}
            <CartCount/>
          </div>
       
        </div>
        <div className='flex items-center justify-center border-b-1 border-gray-150'>
        <MenuBar />
        </div>
    </div>
  )
}

