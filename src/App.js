import React, { useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//scss
import "./assets/scss/socialv.scss"
import "./assets/custom/app.css"
import './assets/scss/custom.scss'
import "./assets/scss/customizer.scss"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "choices.js/public/assets/styles/choices.min.css";
import "flatpickr/dist/flatpickr.css";


// Redux Selector / Action
import { useDispatch } from 'react-redux';

// import state selectors
import { setSetting } from './store/setting/actions'
import "./assets/custom/scss/socialv-custom.scss"


function App({ children }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
      console.log('baseUrl', baseUrl);
      try {
        const response = await axios.get(`${baseUrl}/api/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const dispatch = useDispatch();
  dispatch(setSetting());

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserContext.Provider value={{ userData, setUserData }}>
        <NotificationProvider>
          {/* Your existing App content */}
          {children}
        </NotificationProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;