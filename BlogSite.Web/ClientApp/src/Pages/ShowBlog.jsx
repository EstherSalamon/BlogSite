import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom'; //this is the real way of doing it !!!!!!!!!!!!!

const ShowBlog = () => {

    const [blog, setBlog] = useState({
        id: '',
        title: '',
        content: '',
        datePosted: '',
        comments: []
    });
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    //const { blogId } = useParams(); the real way, but i like my own better
    if (!blog) {
        navigate('/');
    }

    const query = location.pathname;
    const theMostCovetedId = query.substring(10);

    const getBlog = async () => {
        const { data } = await axios.get(`/api/blogs/showblog?blogid=${theMostCovetedId}`);
        setBlog(data.blog);
        if (data.commenterName !== null) {
            setAuthor(data.commenterName);
        }
    };

    useEffect(() => {
        getBlog();
    }, [])

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    const onSubmitClick = async () => {

        await axios.post('/api/blogs/addcomment', {
            comment: {
                author,
                text,
                blogId: blog.id
            }
        });

        setAuthor('');
        setText('');
        getBlog();
    }

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='row'>
                <div className='col-lg-8 offset-2'>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <h2 className='card-title'>{blog.title}</h2>
                            <h6>Posted On  {formatDate(blog.datePosted)}</h6>
                        </div>
                        <div className='card-body'>
                            <p className='card-text'>{blog.content}</p>
                        </div>
                        <div className='card-footer text-muted'>
                            Any thoughts sparked by my words of wisdom? I would love to hear, if you would care to share!
                        </div>
                        <br />
                        <br />
                        <br />
                        <input type='text' className='form-control' placeholder='Name' name='author' value={author} onChange={e => setAuthor(e.target.value)} />
                        <textarea className='form-control mt-2' rows='3' value={text} onChange={e => setText(e.target.value)} placeholder='What are your thoughts?'></textarea>
                        <button className='btn btn-outline-info' onClick={onSubmitClick}>Submit</button>
                        <br />
                        {blog.comments && <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Author</th>
                                    <th>Text</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blog.comments.map(c => 
                                    <tr key={c.id}>
                                        <td>{c.author}</td>
                                        <td>{c.text}</td>
                                        <td>{formatDate(c.date)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ShowBlog;