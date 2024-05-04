import Image from 'next/image'
import { useEffect, useState } from 'react'
import { bannerConfig } from '../../config/assets'
import CustomizerContainer from './common/CustomizerContainer'
import RetIdMultiInput from './common/RetIdMultiInput'

type Props = {
  retIds: string[]
  setRetIds: (retIds: string[]) => void
  bannerBackground: string
  setBannerBackground: (bannerBackground: string) => void
}

const XBannerCustomizer = (props: Props) => {
  const { retIds, bannerBackground, setRetIds, setBannerBackground } = props

  const [bannerPage, setBannerPage] = useState<number>(1)
  const [bannerTotalPages, setBannerTotalPages] = useState<number>(Math.ceil(bannerConfig.length / 3))
  const [banners, setBanners] = useState([])

  useEffect(() => {
    setBanners(bannerConfig.sort(() => Math.random() - 0.5))
  }, [])

  const onBannerSelect = (banner: string) => {
    setBannerBackground(banner)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <CustomizerContainer pageIndex={bannerPage} setPageIndex={setBannerPage} totalPages={bannerTotalPages}>
      <RetIdMultiInput retIds={retIds} setRetIds={setRetIds} />
      <p className='text-black italic font-bold text-lg mt-4 w-full text-left'>Choose a banner Background:</p>
      <div className='flex flex-col gap-2 max-w-full'>
        <div className='flex flex-col gap-2 w-full lg:min-h-[376px]'>
          {banners.slice((bannerPage - 1) * 3, bannerPage * 3).map((banner, index) => (
            <div key={index} className='max-w-full w-[365px] h-[120px] relative transform hover:scale-105 transition-transform duration-300'>
              <a
                className='italic text-black text-md bg-white bg-opacity-75 rounded-br-lg p-2 absolute top-0 left-0'
                href={`https://x.com/${banner.by}`}
                target='_blank'
              >
                @{banner.by}
              </a>
              <Image
                className={`cursor-pointer ${bannerBackground === banner.name ? 'max-w-full border-2 border-primary-500' : ''}`}
                key={index}
                src={`/assets/banner-backgrounds/${banner.name}.webp`}
                alt={banner.name}
                width={365}
                height={120}
                onClick={() => onBannerSelect(banner.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </CustomizerContainer>
  )
}

export default XBannerCustomizer
