import { HeartIcon } from '@heroicons/react/solid';

const Footer = () => (
  <footer className="container xl:max-w-screen-xl mx-auto p-6 mt-8 text-center bg-gray-100">
    <p>
      <a
        href="https://strapex.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-current"
      >
        Made with{' '}
        <HeartIcon className="inline-block w-4 h-4 -mt-1 text-red-600 animate-pulse" />{' '}
        by Strapex Team
      </a>
    </p>
    <a href="mailto:contact@starknetstore.com" className="text-gray-500 hover:text-current">contact@starknetstore.com</a>
    <a href="https://x.com/starknetstore" className='flex items-center justify-center' >
      <img src="/twitter.svg" alt="X" width={20} height={20} />
    </a>
    <p className="text-gray-500 mt-4">&copy; StarknetStore 2024 <br/>Disclaimer: This store is not affiliated with official Starknet brand</p>
  </footer>
);

export default Footer;
