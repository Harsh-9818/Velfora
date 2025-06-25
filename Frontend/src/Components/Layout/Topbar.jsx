import {TbBrandMeta} from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri"
import { CiLinkedin } from "react-icons/ci";

const Topbar = () => {
  return (
    <div className="bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">

            {/* Icons In Left */}
            <div className="hidden md:flex items-center space-x-4">
                <a href="https://www.linkedin.com/in/harshtanwar/" className="hover:text-gray-300">
                    <CiLinkedin className="h-5 w-5"/>
                </a>
                <a href="https://www.instagram.com/iamnotharsh/" className="hover:text-gray-300">
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>
                <a href="https://x.com/ezharsh" className="hover:text-gray-300">
                    <RiTwitterXLine className="h-5 w-5"/>
                </a>
            </div>

            {/* Center Heading */}
            <div className="text-sm text-center flex-grow">
                <span>We ship worldwide - Fast and reliable shipping!</span>
            </div>

            {/* Phone No. In Right */}  
            <div className="text-sm hidden md:block">
                <a href="tel:+1234567890" className="hover:text-gray-300">
                    +91 (234) 567 890
                </a>
            </div>
        </div>
      
    </div>
  )
}

export default Topbar
