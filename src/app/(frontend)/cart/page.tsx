import React from 'react'
import ShopingCart from './ShopingCart'
import ProceedToBuy from './ProceedToBuy'

const Cart = () => {
  return (
    <div className='w-[80%] mx-auto mt-10'>
      <div className='flex w-full justify-between'>
<ShopingCart/>
<ProceedToBuy/>
      </div>
    </div>
  )
}

export default Cart