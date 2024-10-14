import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import history from './utils/history';
import {useState, useEffect} from 'react'
import {AuthProvider} from './AuthContext';
import {auth} from '@app/api/firebase2';
import {onAuthStateChanged} from 'firebase/auth'

import router from "./prebuild/routes/index";
import {wasAuthorised} from "./utils/authentication";


export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])
  // const isAuthenticated = wasAuthorised();

  return(
    <Provider store={store}>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
