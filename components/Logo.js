import Link from 'next/link';
import Image from 'next/image';

const Logo = () => (
  <Link href="/">
    <a className="flex items-center space-x-2">
      <Image src="/StarknetShop.png" alt="Logo" width={150} height={34} />
      <span className="hidden font-extrabold text-3xl text-gray-700">
        Starknet Store
      </span>
    </a>
  </Link>
);

export default Logo;
