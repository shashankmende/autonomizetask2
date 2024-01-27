import {FaGoogle, FaYoutube, FaTwitter, FaInstagram} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <FaGoogle size={30} className="icon-styling" />
      <FaTwitter size={30} className="icon-styling" />
      <FaInstagram size={30} className="icon-styling" />
      <FaYoutube size={30} className="icon-styling" />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
