import React, { Suspense, lazy } from 'react';

const Navbar = lazy(() => import('./Components/Navbar'));
const TopInfo = lazy(() => import('./Components/TopInfo'));
const PageHeader = lazy(() => import('./Components/PageHeader'));

const HeaderLayout = () => {
  return (
    <div style={{ 
      // position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 1000, 
      backgroundColor: 'white'
    }}>
      <Suspense fallback={<div>Loading...</div>}>
        <TopInfo />
        <Navbar />
        <PageHeader />
      </Suspense>
    </div>
  );
}

export default HeaderLayout;
