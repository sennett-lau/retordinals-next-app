import Image from 'next/image'

const Header = () => {
  return (
    <header className='bg-white bg-opacity-50 fixed top-0 w-full bg-no-repeat bg-cover bg-center shadow-md z-10'>
      <div className='flex justify-center items-center w-full max-w-[1440px] mx-auto px-6'>
        <Image src='/logo.png' alt='logo' width={80} height={70} />
      </div>
    </header>
  )
}

export default Header
