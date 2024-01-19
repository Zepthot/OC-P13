// import libraries
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import components
import Header from './components/header';
import Footer from './components/footer';
// import pages
import Home from './pages/home';
import Signin from './pages/signin';
import User from './pages/user';
// import css
import './App.css';

function App() {
    return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/user' element={<User />} />
                </Routes>
                <Footer />
            </BrowserRouter>
    );
}

export default App;
