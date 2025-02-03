import { Provider } from 'react-redux';
import store from './store';
import AuthenticationForm from './AuthenticationForm';

function App() {
  return (
    <Provider store={store}>
      <AuthenticationForm />
    </Provider>
  );
}

export default App;