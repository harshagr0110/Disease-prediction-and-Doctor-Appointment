import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom styles for the theme
const mainBg =
  'min-h-screen  flex flex-col items-center';

const container =
  'w-full max-w-6xl px-4 flex flex-col items-center gap-8 py-6';

const Home = () => {
  return (
    <div className={mainBg}>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          background: 'linear-gradient(90deg, #b2f5ea 0%, #c6f6d5 100%)',
          color: '#234e52',
          fontWeight: 500,
        }}
      />
      <div className={container}>
        <Header />
        <div className="w-full flex flex-col items-center gap-8">
          <TopDoctors />
          <SpecialityMenu />
        </div>
        <Banner />
      </div>
    </div>
  );
};

export default Home;
