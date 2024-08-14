import React from "react";
import { GoogleTagManager } from '@next/third-parties/google';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || 'default-gtm-id';

  return (
    <div className='flex flex-col mt-24 lg:mt-20'>
      <GoogleTagManager gtmId={gtmId} />
      
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
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