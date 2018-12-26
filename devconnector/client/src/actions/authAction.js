import axios from 'axios';
import setAuthToken from '../utile/setAuthToken'
import jwt_decode from 'jwt-decode';



import { GET_ERRORS, SET_CURRENT_USER } from './types';


// Register User
export const registerUser = (userData, history) => dispatch => {
        axios
       .post('/api/users/register', userData)
       .then(res => history.push('/login'))
       .catch(err => 
         dispatch({
         type: GET_ERRORS,
         payload: err.response.data
      })
     );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // set token to localstorage
        localStorage.setItem('jwtToken', token);
        // Set token to off header
        setAuthToken(token);
        // Decode token to get user data
        const decode = jwt_decode(token); // stores the user data
        // Set current user
        dispatch(setCurrentUser(decode));
    })
    .catch(err => 
     dispatch({
           type: GET_ERRORS,
           payload: err.response.data
    })
  );
};
    
    // Set logged in user
    export const setCurrentUser = decode => {
        return {
            type: SET_CURRENT_USER,
            payload: decode
        };
};


 