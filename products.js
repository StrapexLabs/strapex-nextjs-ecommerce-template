const products = [
  {
    id: 'starkwolves_312',
    name: 'StarkWolves Limited Edition',
    description: '30 Units | 100% Cotton | 100% Starknet',
    price: 34.99,
    currency: 'STRK',
    image: '/tshirts/v2/starkwolves.png',
    imageCompressed: '/tshirts/v2/compressed/starkwolves.webp',
    images: ['/tshirts/v2/starkwolvesGym.png', '/tshirts/v2/starkwolvesBordedLogo.png', '/tshirts/v2/starwovesFolded.png'],
    imagesCompressed: ['/tshirts/v2/compressed/starkwolvesGym.webp', '/tshirts/v2/compressed/starkwolvesBordedLogo.webp', '/tshirts/v2/compressed/starwovesFolded.webp'],
    quantity: 34,
    itemsLeft: 28,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    longDescription: 'In celebration of the store launch in collaboration with Strapex we are releasing 100% high quality StarkWolves t-shirts. With a unique embroidered logo on the front.',
    bulletPoints: ['100% cotton', '100% Starknet', 'Embroidered logo on the front', '30 units', 'Worldwide FREE shipping'],
    shippingRequired: true,
  },
  {
    id: 'donation',
    name: 'Donation',
    description: 'Donation',
    price: 0.5,
    currency: 'STRK',
    image: '/StarkWolveCoin.png',
    imageCompressed: '/StarkWolveCoin.png',
    images: [],
    imagesCompressed: [],
    quantity: 0,
    itemsLeft: 0,
    sizes: [],
    longDescription: '',
    bulletPoints: [],
    shippingRequired: false,
  }
];

export default products;