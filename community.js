import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './community.css';

const Community = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState('');
    const [comments, setComments] = useState({});
    const [username, setUsername] = useState('');

    const fetchBlogs = async (selectedCategory) => {
        setCategory(selectedCategory);

        try {
            const response = await fetch('http://localhost:8000/Suma/communityServlet', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ category: selectedCategory }),
            });

            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            } else {
                alert('Failed to fetch blogs');
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            alert('An error occurred while fetching blogs.');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && username.trim() !== '') {
            try {
                const response = await fetch('http://localhost:8000/Suma/communityServlet', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ username }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                } else {
                    alert('Failed to fetch user blogs');
                }
            } catch (error) {
                console.error('Error fetching user blogs:', error);
                alert('An error occurred while fetching user blogs.');
            }
        }
    };

    const handleNewBlog = () => {
        navigate('/new-blog');
    };

    const handleLike = async (blogId) => {
        try {
            const response = await fetch('http://localhost:8000/Suma/likeServlet', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ blog_id: blogId }),
            });

            if (response.ok) {
                alert('Blog liked!');
                fetchBlogs(category);
            } else {
                alert('Failed to like the blog');
            }
        } catch (error) {
            console.error('Error liking blog:', error);
            alert('An error occurred while liking the blog.');
        }
    };

    const handleComment = async (blogId) => {
        if (!comments[blogId]) return;

        try {
            const response = await fetch('http://localhost:8000/Suma/commentServlet', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ blog_id: blogId, comment: comments[blogId] }),
            });

            if (response.ok) {
                alert('Comment added!');
                setComments({ ...comments, [blogId]: '' });
                fetchBlogs(category);
            } else {
                alert('Failed to add the comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('An error occurred while adding the comment.');
        }
    };

    return (
        <div className="homepage">
            <div className="navbar">
                <div className="navbar-left">
                    <a href="/dashboard" className="navbar-link">Dashboard</a>
                    <a href="/community" className="navbar-link">Community</a>
                </div>
                <div className="navbar-right">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                        onKeyDown={handleKeyDown}
                        className="navbar-input"
                    />
                    <button className="create-blog-button" onClick={handleNewBlog}>
                        Create New Blog
                    </button>
                </div>
            </div>

            <div className="divider"></div>

            <div className="category-section">
                {['Tech', 'Lifestyle', 'Health', 'Travel', 'Education'].map((cat) => (
                    <button
                        key={cat}
                        className={`category-button ${category === cat ? 'active' : ''}`}
                        onClick={() => fetchBlogs(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="blog-list">
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div key={index} className="blog-item">
                            <h2>{blog.blog_name}</h2>
                            <p>{blog.content}</p>
                            {blog.image_url && (
                                <div className="blog-image">
                                    <img src={blog.image_url} alt="Blog" />
                                </div>
                            )}
                            <div className="blog-meta">
                                <p><strong>Category:</strong> {blog.category}</p>
                                <p><strong>Published:</strong> {new Date(blog.created_at).toLocaleString()}</p>
                            </div>
                            <button className="like-button" onClick={() => handleLike(blog.blog_id)}>
                                Like
                            </button>
                            <div className="comment-section">
                                <textarea
                                    placeholder="Write a comment..."
                                    value={comments[blog.blog_id] || ''}
                                    onChange={(e) =>
                                        setComments({ ...comments, [blog.blog_id]: e.target.value })
                                    }
                                />
                                <button
                                    className="comment-button"
                                    onClick={() => handleComment(blog.blog_id)}
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-blogs">Select any category or enter a username to display blogs.</p>
                )}
            </div>
        </div>
    );
};

export default Community;
