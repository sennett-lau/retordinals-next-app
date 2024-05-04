import Image from 'next/image'
import { VERSION } from '../../../config/general'

const Footer = () => {
  return (
    <footer className='w-full lg:fixed bottom-0 bg-white lg:bg-transparent'>
      <div className='w-full max-w-[1440px] mx-auto flex flex-col-reverse lg:flex-row justify-between px-6 py-4 items-center'>
        <p className='text-white italic font-bold text-lg'>
          By&nbsp;
          <a href='https://x.com/sennettlau_13' target='_blank'>
            Sennett Lau - Capyyy
          </a>
          &nbsp;| <span className='text-primary-500'>RETkhronizer v{VERSION}</span>
        </p>
        <div className='flex gap-4'>
          <p className='text-white italic font-bold text-lg'>Join Retordinals:</p>
          <a href='https://x.com/Retordinals' target='_blank'>
            <Image src='/icons/x.svg' alt='x' width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
