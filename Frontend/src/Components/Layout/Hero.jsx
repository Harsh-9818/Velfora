import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.webp";
export const Hero = () => {
  return (
    <section className="relative">
        <img
          src={heroImg}
          alt="Hero Image"
          className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
                Vacation <br/> Ready
              </h1>
              <p className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vacation ready outfits with fast worlwide shipping.
              </p>
              <Link 
                to="/collections/all"
                className="bg-white text-gray-950 px-6 py-2 rounded-4xl text-lg"
              >
                Shop Now
              </Link>
            </div>
        </div>
    </section>
  )
}
