import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import Routers from './routers/Routers';
import { createBrowserHistory } from '@remix-run/router';
import Loading from './components/loading/Loading';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routers>
          <Route />
        </Routers>
      </BrowserRouter>
    </div>
  );
}

export default App;
