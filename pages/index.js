import { useState } from 'react';
import { ProductCard } from '@/components/index';
import Link from 'next/link';

import products from 'products';

// Fetch the specific item from products array
const item = products.find(product => product.id === 'starkwolves_312');

export default function Home() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-8 px-8 sm:px-32">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
      <Link href={`/products/${item.id}`}>
        <div className="col-span-1 h-60 rounded-xl border-2 border-gray-300">
          <div className='flex flex-row h-3/4 p-4 justify-center'>
            <img src={item.image} alt={item.name} className='h-auto' />
            <div className='flex flex-col justify-between p-2 space-y-2'>
              {item.images.map((image, index) => (
                <img key={index} src={image} alt={`${item.name} ${index}`} className='h-1/2 rounded-xl' />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold text-xs">{item.name}</div>
            <div className='text-xs'>{item.description}</div>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-1'>
                <div className='font-bold'>{item.quantity}</div>
                <img src='./tokens/strk.png' alt={item.currency} className='h-4' />
              </div>
              <div className='text-xs text-gray-500'>≈{item.price}$</div>
            </div>
          </div>
        </div>
      </Link>
        <div className="col-span-1 sm:col-span-2 bg-blue-500 sm:h-60 rounded-xl">
          <div className='flex flex-col sm:flex-row h-full'>

            <div className='flex flex-col  sm:justify-between text-white p-8 flex-grow'>
              <h1 className='text-2xl font-bold'> Get a 25% Refund </h1>
              <p className='text-sm'> Celebrating the launch of our Store
                we have partnered with Strapex in exchange
                of feedback </p>
              <a href='#' className=''>
                <button className='bg-white text-black rounded-lg p-2'>
                  Learn More
                </button>
              </a>
            </div>
            <div className='w-full h-full flex p-4'>
              <img src='./get25refund.png' alt='Get 25% Refund' className='h-full w-auto' />
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 bg-orange-500 sm:h-60 rounded-xl">
          <div className='flex flex-col sm:flex-row h-full'>
            <div className='flex flex-col  sm:justify-between text-white py-8 pl-8'>
              <h1 className='text-2xl font-bold'> Are you an Artist?</h1>
              <p className='text-sm'> We are looking for talented indiviuals
                to collaborate with and empower the Starknet ecosystem through unique
                merch.   </p>
              <a href='#' className=''>
                <button className='bg-white text-black rounded-lg p-2'>
                  Learn More
                </button>
              </a>
            </div>
            <div className='w-full h-full p-4'>
              <img src='./dragon.png' alt='Get 25% Refund' className='h-full w-auto' />
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-black h-60 rounded-xl">
          <div className='flex flex-col h-full text-white p-4 justify-between items-center'>
            <h1 className='text-2xl font-bold text-center'> Pay with
            <span className='text-orange-400'> ANY </span>  coin</h1>
            
            <div className='flex items-center space-x-2'>
              <img src='./tokens/eth.png' alt='Ethereum' className='h-6 sm:h-8' />
              <img src='./tokens/usdt.png' alt='USDT' className='h-6 sm:h-8' />
              <img src='./tokens/strk.png' alt='Stark' className='h-6 sm:h-8' />
              <img src='./tokens/usdc.png' alt='USDC' className='h-6 sm:h-8' />
              <img src='./tokens/socks.png' alt='Socks' className='h-6 sm:h-8' />
            </div>
            <img src='./collab.png' alt='StarknetStore collab with strapex' className='h-[55px] w-[80px]' />
          </div>
        </div>
      </div>


      {/* {products.map(product => (
          <ProductCard
            key={product.id}
            disabled={disabled}
            onClickAdd={() => setDisabled(true)}
            onAddEnded={() => setDisabled(false)}
            {...product}
          />
        ))} */}
    </div>

  );
}