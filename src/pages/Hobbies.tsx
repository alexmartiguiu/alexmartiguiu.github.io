import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function Hobbies() {
  const collageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const folderPath = "assets/img/hobbies/"
    const imageNames = [
      "7f3b2f77-4313-4368-bdef-6919493141a4.JPG",
      "ad6ddd0f-c610-4886-8628-9ed11528c234.JPG",
      "chess.png",
      "DSCF0981.JPEG",
      "IMG_1240.jpg",
      "piano_pad.png",
      "IMG_5486.jpg",
      "IMG_7072.jpg",
      "hockey.JPEG",
      "ski.JPG",
      "japo.png"
    ]

    const collage = collageRef.current
    if (!collage) return

    const containerWidth = collage.offsetWidth
    const containerHeight = collage.offsetHeight
    let placedImages: Array<{ x: number; y: number; width: number; height: number }> = []
    const maxOverlapPercentage = 0.15

    function checkOverlap(x: number, y: number, width: number, height: number) {
      let overlapArea = 0

      for (let img of placedImages) {
        const xOverlap = Math.max(0, Math.min(x + width, img.x + img.width) - Math.max(x, img.x))
        const yOverlap = Math.max(0, Math.min(y + height, img.y + img.height) - Math.max(y, img.y))
        overlapArea += xOverlap * yOverlap
      }

      const newImageArea = width * height
      return (overlapArea / newImageArea) <= maxOverlapPercentage
    }

    imageNames.forEach((image) => {
      const img = document.createElement("img")
      img.src = folderPath + image
      img.classList.add("collage-img")

      const size = Math.floor(Math.random() * 100) + 140
      img.style.width = `${size}px`
      img.style.height = `${size}px`

      let maxAttempts = 15
      let placed = false
      let x = 0, y = 0

      while (!placed && maxAttempts > 0) {
        x = Math.floor(Math.random() * (containerWidth - size - 20)) + 10
        y = Math.floor(Math.random() * (containerHeight - size - 20)) + 10

        if (checkOverlap(x, y, size, size)) {
          placed = true
        }
        maxAttempts--
      }

      img.style.left = `${x}px`
      img.style.top = `${y}px`

      const rotation = Math.floor(Math.random() * 30) - 15
      img.style.transform = `rotate(${rotation}deg)`

      placedImages.push({ x, y, width: size, height: size })

      collage.appendChild(img)
    })
  }, [])

  return (
    <div className="flex justify-center">
      <main className="container mx-auto max-w-[700px] px-6 py-10">
        {/* Back Button */}
        <Link to="/" className="back-link text-blue-500">
          ← back
        </Link>

        {/* Hobbies Section */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">My hobbies!</h2>
          <p className="mt-2">
            <span className="text-black font-semibold">Sports:</span> Former field hockey player (Spanish league), Currently Basketball & Triathlon. Huge FC Barcelona fan.
            <span className="text-black font-semibold"> Coaching:</span> Hockey coach for 6 yrs (kids 10-18 y/o). Developed leadership and communication skills.
            <span className="text-black font-semibold"> Music:</span> I play the piano. <span className="text-black font-semibold">Science:</span> Journalism, Neuroscience, New technologies.
            <span className="text-black font-semibold"> Reading:</span> Fantasy, SciFi, Thrillers
            <span className="text-black font-semibold"> Chess:</span> 1300 ELO mediocre player, but I enjoy it a lot!!
            <span className="text-black font-semibold"> Culture:</span> Always been very attracted to other cultures and countries, really enjoy traveling.
            <span className="text-black font-semibold"> Pasta:</span> I LOVE PASTA!
          </p>
        </section>

        {/* Collage of images */}
        <div className="collage-container" ref={collageRef}></div>
      </main>
    </div>
  )
}
