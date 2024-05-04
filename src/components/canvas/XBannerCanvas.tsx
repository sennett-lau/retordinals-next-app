'use client'
import { useEffect, useRef, useState } from 'react'
import SliderControl from './SliderControl'

type Props = {
  banner: string
  rets: string[]
  canvasRef: React.RefObject<HTMLCanvasElement>
}

const XBannerCanvas = (props: Props) => {
  const { banner, rets, canvasRef } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const blackLayerRef = useRef<HTMLDivElement>(null)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [retXPositions, setRetXPositions] = useState<number[]>([])
  const [blackLayerOpacity, setBlackLayerOpacity] = useState<number>(25)

  const [retIdToPosition, setRetIdToPosition] = useState<{ [key: string]: number }>({})
  const [retIdToIsFacingLeft, setretIdToIsFacingLeft] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)

        containerRef.current.style.height = `${containerRef.current.offsetWidth / 3}px`
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (rets.length !== retXPositions.length) {
      const newretXPositions = rets.map((ret) => retIdToPosition[ret] || 0)
      const newRetFacings: { [key: string]: boolean } = {}

      for (const ret of rets) {
        newRetFacings[ret] =
          retIdToIsFacingLeft[ret] === undefined || retIdToIsFacingLeft[ret] === null || retIdToIsFacingLeft[ret]
      }

      newretXPositions.forEach((pos, index) => {
        const retLayer = document.getElementById(`ret-layer-${index}`)

        if (retLayer) {
          retLayer.style.transform = `translateX(${pos}px) scaleX(${newRetFacings[rets[index]] ? 1 : -1})`
        }
      })

      setRetXPositions(newretXPositions)
      setretIdToIsFacingLeft(newRetFacings)
    }
    if (containerWidth > 0) {
      drawImages()
    }
  }, [banner, rets, containerWidth, retXPositions, retIdToIsFacingLeft, blackLayerOpacity])

  const drawImages = () => {
    const canvas = canvasRef.current
    if (canvas && banner && rets && containerWidth) {
      const ctx = canvas.getContext('2d')

      canvas.width = 1500
      canvas.height = 500

      if (ctx) {
        const baseImage = new Image()

        baseImage.src = `/assets/banner-backgrounds/${banner}.webp`

        baseImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)

          ctx.fillStyle = `rgba(0, 0, 0, ${blackLayerOpacity / 100})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          blackLayerRef.current.style.opacity = `${blackLayerOpacity / 100}`

          setIsLoaded(true)

          drawRets(canvas, 0)
        }
      }
    }
  }

  const drawRets = (canvas: HTMLCanvasElement, index: number) => {
    if (index >= rets.length) {
      return
    }
    const ctx = canvas.getContext('2d')

    const retMaxX = canvas.width - canvas.width / 3

    const retImage = new Image()

    retImage.src = `/assets/retordinals/${rets[index]}.webp`

    const isFacingLeft =
      retIdToIsFacingLeft[rets[index]] === undefined ||
      retIdToIsFacingLeft[rets[index]] === null ||
      retIdToIsFacingLeft[rets[index]]

    const retXPositionOnCanvas = (retXPositions[index] / containerWidth) * canvas.width

    retImage.onload = () => {
      if (isFacingLeft) {
        ctx.drawImage(retImage, Math.min(retXPositionOnCanvas, retMaxX), 0, canvas.height, canvas.height)
      } else {
        ctx.save()
        ctx.translate(Math.min(retXPositionOnCanvas, retMaxX) + canvas.height, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(retImage, 0, 0, canvas.height, canvas.height)
        ctx.restore()
      }

      drawRets(canvas, index + 1)
    }
  }

  const handleBackgroundBlackLayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlackLayerOpacity(parseInt(e.target.value))

    if (blackLayerRef.current) {
      blackLayerRef.current.style.opacity = `${blackLayerOpacity / 100}`
    }
  }

  const handleRetXPositionChange = (pos: number, index: number) => {
    const newretXPositions = [...retXPositions]
    newretXPositions[index] = pos

    setRetXPositions(newretXPositions)

    const retLayer = document.getElementById(`ret-layer-${index}`)

    const newMap = { ...retIdToPosition }

    newMap[rets[index]] = newretXPositions[index]

    setRetIdToPosition(newMap)

    if (retLayer) {
      retLayer.style.transform = `translateX(${newretXPositions[index]}px) scaleX(${retIdToIsFacingLeft[rets[index]] ? 1 : -1})`
    }
  }

  const onToggleFacing = (isFacingLeft: boolean, index: number) => {
    const newRetFacings = { ...retIdToIsFacingLeft }
    newRetFacings[rets[index]] = isFacingLeft

    setretIdToIsFacingLeft(newRetFacings)

    const retLayer = document.getElementById(`ret-layer-${index}`)

    if (retLayer) {
      retLayer.style.transform = `translateX(${retXPositions[index]}px) scaleX(${isFacingLeft ? 1 : -1})`
    }
  }

  return (
    <div className={`w-full max-w-[800px]`}>
      <div
        ref={containerRef}
        className={`w-full relative mb-4 ${isLoaded ? '' : 'h-[266px]'}`}
        style={{
          backgroundImage: isLoaded ? `url(/assets/banner-backgrounds/${banner}.webp)` : '',
          backgroundSize: 'contain',
        }}
      >
        <canvas ref={canvasRef} className='hidden'></canvas>
        <div ref={blackLayerRef} className={`absolute top-0 left-0 w-full h-full ${isLoaded ? 'bg-black' : ''}`} />
        {rets.length > 0 &&
          rets.map((ret, index) => (
            <img
              key={index}
              src={`/assets/retordinals/${ret}.webp`}
              alt={ret}
              width={containerWidth / 3}
              height={containerWidth / 3}
              className={`absolute bottom-0 left-0 z-20`}
              id={`ret-layer-${index}`}
            />
          ))}
      </div>
      <SliderControl
        label='Black Layer Opacity'
        max={100}
        value={blackLayerOpacity}
        onChange={handleBackgroundBlackLayerChange}
      />
      {retXPositions.length > 0 &&
        retXPositions.map((retXPosition, index) => (
          <SliderControl
            key={index}
            label={`Ret ${index + 1} Position`}
            max={containerWidth - containerWidth / 3}
            value={retXPosition}
            onChange={(e) => handleRetXPositionChange(parseInt(e.target.value), index)}
            toggleLabel='Facing'
            toggleTextPair={['L', 'R']}
            toggleValue={retIdToIsFacingLeft[rets[index]]}
            onToggle={(isFacingLeft) => onToggleFacing(isFacingLeft, index)}
          />
        ))}
    </div>
  )
}

export default XBannerCanvas
