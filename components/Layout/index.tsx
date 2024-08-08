import React from "react"
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'


interface Props {
    children: React.ReactNode;
  }
  

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className='flex flex-col mt-24 lg:mt-20'>
        {children}
        <GoogleTagManager gtmId="G-JCQST79BSL" />
        <GoogleAnalytics gaId="G-10H68Q33ER" />
    </div>
  )
}

export  {Layout}
