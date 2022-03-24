import React from 'react'
import {FaGithub, FaTwitter, FaInstagram} from 'react-icons/fa'

function Footer() {
  return (
      <footer className='text-center mt-2'>
        <a className='mx-3 fs-3 text-light' href="https://www.github.com/hahusahin" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a className='mx-3 fs-3 text-light' href="https://www.twitter.com/hahusahin" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a className='mx-3 fs-3 text-light' href="https://www.instagram.com/hahusahin" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <p></p>
        <p>{`© Copyright ${new Date().getFullYear()} Huseyin SAHIN`}</p>
      </footer>
  )
}

export default Footer