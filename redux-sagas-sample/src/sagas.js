import { call, put, takeLatest, all } from 'redux-saga/effects';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT_REQUEST, 
  LOGOUT_SUCCESS 
} from './actions';

// Login Saga
function* loginSaga(action) {
    try {
      const { username, password } = action.payload;
      // Perform API call
      const user = yield call(API.login, username, password);
      
      // Save token to localStorage
      localStorage.setItem('token', user.token);
      
      // Dispatch success action
      yield put(loginSuccess(user));
    } catch (error) {
      // Dispatch failure action
      yield put(loginFailure(error.message));
    }
  }
  
  // Logout Saga
  function* logoutSaga() {
    try {
      // Call logout API
      yield call(API.logout);
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      
      // Dispatch logout success
      yield put({ type: LOGOUT_SUCCESS });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
  
  // Root Saga
  function* rootSaga() {
    yield all([
      takeLatest(LOGIN_REQUEST, loginSaga),
      takeLatest(LOGOUT_REQUEST, logoutSaga)
    ]);
  }