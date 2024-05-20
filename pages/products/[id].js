import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import Image from 'next/image';
import Head from 'next/head';
import { formatCurrency } from '@/lib/utils';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import ModalImage from 'react-modal-image';
import products from 'products';

const Product = (props) => {
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState(props.sizes?.[0] || '');

  const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = () => {
    setAdding(true);
    console.log('Adding', qty, props.name, selectedSize);
    toastId.current = toast.loading(
      `Adding ${qty} item${qty > 1 ? 's' : ''}...`
    );
    addItem({ ...props, size: selectedSize }, qty, selectedSize);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAdding(false);
    toast.success(`${qty} ${props.name} (${selectedSize}) added`, {
      id: toastId.current,
    });
    setQty(1);
  }, [cartCount]);

  return router.isFallback ? (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <p className="text-center text-lg py-12">Loading...</p>
    </>
  ) : (
    <>
      <Head>
        <title>{props.name}</title>
      </Head>
      <div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Product's image */}
          <div className='flex flex-col w-96'>
            {/* Main image */}
            <div className="relative w-full h-72 sm:h-96 mb-4 ">
              <ModalImage
                small={props.imageCompressed}
                large={props.image}
                alt={props.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            {/* Additional images below the main image */}
            <div className='flex flex-row w-full overflow-x-auto justify-center'>
              {props.imagesCompressed?.map((image, index) => (
                <div key={index} className="relative w-24 h-24 sm:w-32 sm:h-32 mr-2 rounded">
                  <ModalImage
                    small={image}
                    large={props.images[index]}
                    alt={`${props.name} ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product's details */}
          <div className="flex-1 max-w-md border border-opacity-50 rounded-md shadow-lg p-6">
            <h2 className="text-3xl font-semibold">{props.name}</h2>
            <p>
              <span className="text-gray-500">Availability:</span>{' '}
              <span className="font-semibold">In stock</span>
            </p>
            

        
           
            {/* Price */}
            <div className="mt-8 border-t pt-4">
              <span className='text-sm text-gray-500'>Price</span>
              <div className="flex flex-row justify-start items-center space-x-2">
                <p className="text-xl font-semibold">
                  {props.price}
                </p>
                <img src="/tokens/strk.png" alt="STRK" className="h-4" />
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              {/* Size Selection */}
              {props.sizes && (
                <div className="mt-4">
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm rounded-md"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {props.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-4">
                <p className="text-gray-500">Quantity:</p>
                <div className="mt-1 flex items-center space-x-3">
                  <button
                    onClick={() => setQty((prev) => prev - 1)}
                    disabled={qty <= 1}
                    className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                  >
                    <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                  </button>
                  <p className="font-semibold text-xl">{qty}</p>
                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                  >
                    <PlusSmIcon className="w-6 h-6 flex-shrink-0 " />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                type="button"
                onClick={handleOnAddToCart}
                disabled={adding}
                className="mt-8 border rounded py-2 px-6 bg-black hover:bg-gray-800 border-black hover:border-gray-800 focus:ring-4 focus:ring-opacity-50 focus:ring-black text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to cart ({qty})
              </button>
            </div>
          </div>
        </div>
      </div>

{/* Description */}
<div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
  <p>{props.longDescription}</p>
  <ul className="list-disc list-inside mt-4">
    {props.bulletPoints?.map((point, index) => (
      <li key={index} className="text-gray-700">{point}</li>
    ))}
  </ul>
  {/* Size Chart */}
  <div className="mt-8">
    <h2 className="text-xl font-semibold">Size Chart</h2>
    <table className="table-auto mt-4 w-full text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">SIZE LABEL</th>
          <th className="px-4 py-2">LENGTH (inches)</th>
          <th className="px-4 py-2">WIDTH (inches)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">XS</td>
          <td className="border px-4 py-2">27</td>
          <td className="border px-4 py-2">16 ½</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">S</td>
          <td className="border px-4 py-2">28</td>
          <td className="border px-4 py-2">18</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">M</td>
          <td className="border px-4 py-2">29</td>
          <td className="border px-4 py-2">20</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">L</td>
          <td className="border px-4 py-2">30</td>
          <td className="border px-4 py-2">22</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">XL</td>
          <td className="border px-4 py-2">31</td>
          <td className="border px-4 py-2">24</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">2XL</td>
          <td className="border px-4 py-2">32</td>
          <td className="border px-4 py-2">26</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">3XL</td>
          <td className="border px-4 py-2">33</td>
          <td className="border px-4 py-2">28</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">4XL</td>
          <td className="border px-4 py-2">34</td>
          <td className="border px-4 py-2">30</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">5XL</td>
          <td className="border px-4 py-2">35</td>
          <td className="border px-4 py-2">32</td>
        </tr>
      </tbody>
    </table>
    <p className="mt-2 text-gray-500">Product measurements may vary by up to 2" (5 cm).</p>
  </div>
</div>
</>
);
};
export async function getStaticPaths() {
  return {
    // Existing posts are rendered to HTML at build time
    paths: Object.keys(products)?.map(id => ({
      params: { id },
    })),
    // Enable statically generating additional pages
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const props = products?.find(product => product.id === params.id) ?? {};

    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Product;
