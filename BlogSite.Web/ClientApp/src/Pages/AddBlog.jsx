import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const onSubmitClick = async () => {
        const { data } = await axios.post('/api/blogs/addblog', {
            Blog: {
                title: title,
                content: content
            }
        });
        navigate(`/showblog/${data}`);
    }

    return (
        <div className='container' style={{marginTop: 80}}>
            <div className='row'>
                <div className='col-md-6 offset-3'>
                    <input type='text' name='title' className='form-control' value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    <br/>
                    <textarea name='content' placeholder='Write your inspiration here' value={content} className='form-control' onChange={e => setContent(e.target.value)} rows='20'></textarea>
                    <br />
                    <button className='btn btn-outline-danger w-100' onClick={onSubmitClick}>Submit Post</button>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;