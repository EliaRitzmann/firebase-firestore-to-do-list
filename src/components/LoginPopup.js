import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth} from '../contexts/FirebaseContext';



export const LoginPopup = (props) => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    function loginWithGoogle(){
        googleLogin()
        //Wichtig aber warum?
        navigate("/")
    }

  return (props.trigger) ? (
      <div className='bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center'>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center ">
                    <h1>Log In</h1>
                  </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col justify-center">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500  sm:w-auto sm:text-sm"
                  onClick={loginWithGoogle}
                >
                  Log in With Goolge
                </button>
                
              </div>
            </div>
      </div>
  ) : "";
  
};


