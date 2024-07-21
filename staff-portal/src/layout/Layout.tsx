import React, { ReactNode } from 'react';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen flex items-center justify-center">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center p-4 sm:max-w-screen-2xl sm:p-6 2xl:p-10">
        {children}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default Layout;
