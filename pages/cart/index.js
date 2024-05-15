import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import axios from 'axios';
import { formatCurrency } from '@/lib/utils';
import getStripe from '@/lib/get-stripe';
import {
  XCircleIcon,
  XIcon,
  MinusSmIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';

const Cart = () => {
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id },
    } = await axios.post('/api/checkout_sessions', {
      items: Object.entries(cartDetails).map(([_, { id, quantity, name, price, currency, size }]) => ({
        price: id,
        quantity,
        name,
        price,
        currency,
        size,
      })),
    });

    // Redirect to  strapex.org/p/{id}
    console.log('Redirecting to checkout session:', id);
    const rootUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? 'https://pay.strapex.org' : 'http://localhost:3001';
    window.location.href = `${rootUrl}/p/${id}`;
  };

  return (
    <>
      <Head>
        <title>My Shopping Cart</title>
      </Head>
      <div className="container xl:max-w-screen-xl mx-auto py-8 px-4 sm:px-6">
        {cartCount > 0 ? (
          <div className="mt-8">
            {Object.entries(cartDetails).map(([key, product]) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-4"
              >
                {/* Image + Name */}
                <Link href={`/products/${product.id}`}>
                  <a className="flex items-center space-x-4 group">
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 group-hover:scale-110 transition-transform">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-lg sm:text-xl group-hover:underline">
                        {product.name}
                      </p>
                      {product.size && (
                        <p className="text-gray-500">Size: {product.size}</p>
                      )}
                    </div>
                  </a>
                </Link>

                {/* Price + Actions */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  {/* Quantity */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => removeItem(product, 1, product.size)}
                      disabled={product?.quantity <= 1}
                      className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-2"
                    >
                      <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                    </button>
                    <p className="font-semibold text-xl">{product.quantity}</p>
                    <button
                      onClick={() => addItem(product, 1, product.size)}
                      className="hover:bg-green-100 hover:text-green-500 rounded-md p-2"
                    >
                      <PlusSmIcon className="w-6 h-6 flex-shrink-0" />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="font-semibold text-xl">
                    <XIcon className="w-4 h-4 text-gray-500 inline-block" />
                    {formatCurrency(product.price)}
                  </p>

                  {/* Remove item */}
                  <button
                    onClick={() => removeItem(product, product.quantity, product.size)}
                    className="ml-4 hover:text-rose-500"
                  >
                    <XCircleIcon className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col items-end border-t py-4 mt-8">
              <p className="text-lg sm:text-xl">
                Total:{' '}
                <span className="font-semibold">
                  {formatCurrency(totalPrice)}
                </span>
              </p>

              <button
                onClick={redirectToCheckout}
                disabled={redirecting}
                className="border rounded py-3 px-8 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500 max-w-max mt-4"
              >
                {redirecting ? 'Redirecting...' : 'Go to Checkout'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Cart;