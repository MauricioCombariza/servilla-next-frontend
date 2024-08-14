import React from "react";
import { GoogleTagManager } from '@next/third-parties/google';

interface Props {
  children: React.ReactNode;
}

interface GTMConfig {
  gtmId: string;
  // Add other GTM-related properties if needed
}

const Layout: React.FC<Props> = ({ children }) => {
  const gtmConfig: GTMConfig = {
    gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?.toString() || 'default-gtm-id',
  };

  return (
    <div className='flex flex-col mt-24 lg:mt-20'>
      <GoogleTagManager {...gtmConfig} />
      
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmConfig}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      
    </div>
  );
}

export { Layout };