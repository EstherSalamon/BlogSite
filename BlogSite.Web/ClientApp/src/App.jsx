import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddBlog from './Pages/AddBlog';
import ShowBlog from './Pages/ShowBlog';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/addblog' element={<AddBlog />} />
                <Route path='/showblog/:blogid' element={<ShowBlog />} />
            </Routes>
        </Layout>
    );
}

export default App;