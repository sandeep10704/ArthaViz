import React, { Suspense, lazy } from 'react';
import Notification from '../CommonComponents/Notification';
import { useSelector } from 'react-redux';

const Navbar = lazy(() => import('./Components/Navbar'));
const TopInfo = lazy(() => import('./Components/TopInfo'));
const PageHeader = lazy(() => import('./Components/PageHeader'));

const HeaderLayout = () => {
  const notification = useSelector(state => state.ui.notification);
  return (
    <> 
   <div style={{ 
  position: 'fixed',   
  top: 0, 
  width: '100%', 
  zIndex: 1000, 
  backgroundColor: 'white'
}}>
{notification &&
        <Notification type={notification.type} message={notification.message} />
      }
  <Suspense fallback={<div>Loading...</div>}>
    <TopInfo />
    <Navbar />
  </Suspense>
</div>
<div> 
<PageHeader />
</div>
</>

  );
}

export default HeaderLayout;
