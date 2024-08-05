import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    //const [pageNumber, setPageNumber] = useState(1);
    //const [totalBlogs, setTotalBlogs] = useState('');

    const loadBlogs = async () => {
        const { data } = await axios.get('api/blogs/getblogs');
        setBlogs(data);
       /* setTotalBlogs(data.totalBlogs);*/
    };

    useEffect(() => {
        loadBlogs();
    }, [])

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    const onRightClick = () => {
        setPageNumber(pageNumber - 1);
        loadBlogs();
    };

    const onLeftClick = () => {
        setPageNumber(pageNumber + 1);
        loadBlogs();
    };

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='row'>
                <div className='col-md-8 offset-2'>
                    <h1>The most amazing blogs! Just check them out!</h1>
                    {blogs.map(blog => (
                        <a href={`/showblog/${blog.id}`} key={blog.id} style={{ textDecorationLine: 'none' } }>
                            <div className='card mb-4'>
                                <div className='card-body'>
                                    <h2 className='card-title'>{blog.title}</h2>
                                    <p className='card-text'>{blog.content.length < 200 ? blog.content : blog.content.substring(0, 200) + "....."}</p>
                                </div>
                                <div className='card-footer text-muted'>
                                    Posted On {formatDate(blog.datePosted)}
                                </div>
                                <button className='btn btn-outline-success w-100'>Read More</button>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )

};

export default Home;

//<div className='row'>
//    <div className='col-md-2 offset-4'>
//        <button className='btn btn-outline-primary w-100' disabled={(pageNumber * 3) >= totalBlogs} onClick={onLeftClick}><ArrowLeft size={26} className="ml-4" /> Older</button>
//    </div>
//    <div className='col-md-2 offset-6'>
//        <button className='btn btn-outline-primary w-100' disabled={pageNumber === 1} onClick={onRightClick}>Newer <ArrowRight size={26} className="ml-4" /></button>
//    </div>
//</div>
