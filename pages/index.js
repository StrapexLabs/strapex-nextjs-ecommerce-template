import { useState } from 'react';
import { ProductCard } from '@/components/index';
import Link from 'next/link';
import Image from 'next/image';
import products from 'products';
import { Button } from '@radix-ui/themes';

// Fetch the specific item from products array
const item = products.find(product => product.id === 'starkwolves_312');
const donationItem = products.find(product => product.id === 'donation');

export default function Home() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-8 px-8 sm:px-32">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
        <Link href={`/products/${item.id}`}>
          <div className="col-span-1 h-60 rounded-xl border-2 border-gray-300">
            <div className='flex flex-row h-3/4 p-4 justify-center'>
              <Image src={item.image} alt={item.name} width={150} height={125} />
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-xs">{item.name}</div>
              <div className='text-xs'>{item.description}</div>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>
                  <div className='font-bold'>{item.price}</div>
                  <img src='./tokens/strk.png' alt={item.currency} className='h-4' />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="col-span-1 sm:col-span-2 bg-blue-500 sm:h-60 rounded-xl">
          <div className='flex flex-col sm:flex-row h-full'>
            <div className='flex flex-col sm:justify-between text-white p-8 flex-grow'>
              <h1 className='text-2xl font-bold'> Enjoy a 25% Refund! </h1>
              <p className='text-sm'> To celebrate our store's launch, we've teamed up with Strapex to offer you a 25% refund on your StarkWolves T-shirt purchase. All we ask in return is your valuable feedback on the checkout process. </p>
              <a href='#' className=''>
                <button className='bg-white text-black rounded-lg p-2 hidden'>
                  Learn More
                </button>
              </a>
            </div>
            <div className='w-full h-full flex p-4'>
              <Image src='/get25refund.png' alt='Get 25% Refund' width={200} height={200} />
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 bg-orange-500 sm:h-60 rounded-xl">
          <div className='flex flex-col sm:flex-row h-full'>
            <div className='flex flex-col sm:justify-between text-white py-8 pl-8'>
              <h1 className='text-2xl font-bold'> Are you an Artist/Meme dev?</h1>
              <p className='text-sm'> We are looking for talented indiviuals
                to collaborate with and empower the Starknet ecosystem through unique
                merch.   </p>
              <a href='mailto:contact@starknetstore.com' className='bg-white text-black rounded-lg p-2 w-max'>
                Contact us
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
        <div className="col-span-1  h-60 rounded-xl">
        <Link href={`/products/${donationItem.id}`}>
          <div className="col-span-1 h-60 rounded-xl border-2 border-gray-300">
            <div className='flex flex-row h-3/4 p-4 justify-center'>
              <Image src={donationItem.image} alt={donationItem.name} width={150} height={125} />
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-xs">{donationItem.name}</div>
              <div className='text-xs'>{donationItem.description}</div>
              <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-1'>
                  <div className='font-bold'>{donationItem.price}</div>
                  <img src='./tokens/strk.png' alt={donationItem.currency} className='h-4' />
                </div>
              </div>
            </div>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
  }