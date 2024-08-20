import React from "react"
import { GoogleTagManager } from '@next/third-parties/google'


interface Props {
    children: React.ReactNode;
  }
  

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className='flex flex-col mt-24 lg:mt-20'>
        <GoogleTagManager gtmId="G-JCQST79BSL" />
        {children}
    </div>
  )
}

export  {Layout}
