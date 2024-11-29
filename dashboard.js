import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:8000/Suma/dashboardServlet', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data);
                    setMessage("Blogs fetched successfully!");
                } else {
                    const errorData = await response.json();
                    setMessage(errorData.message || "Failed to fetch blogs.");
                }
            } catch (error) {
                console.error("Error:", error);
                setMessage("An error occurred while fetching blogs.");
            }
        };
        fetchBlogs();
    }, []);

    const handleNewBlog = (e) => {
        e.preventDefault();
        window.location.href = '/newblog';
    };

    return (
        <div className="homepage">
            {/* Navigation Bar */}
            <div className="navbar">
                <div className="navbar-left">
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                    <Link to="/community" className="navbar-link">Community</Link>
                </div>
                <div className="navbar-right">
                    <button className="create-blog-button" onClick={handleNewBlog}>
                        Create New Blog
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Message Display */}
            {message && (
                <div className="message-container">
                    <p className="message">{message}</p>
                </div>
            )}

            {/* Blog List */}
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
                                <h2><strong>Likes:</strong> {blog.like_count}</h2>
                            </div>
                            <div className="blog-comments">
                                <h4>Comments:</h4>
                                {blog.comments && blog.comments.length > 0 ? (
                                    blog.comments.map((comment, idx) => (
                                        <div key={idx} className="comment-item">
                                            <p><strong>{comment.username}:</strong> {comment.comment}</p>
                                            <p className="comment-meta">
                                                <small>Commented on {new Date(comment.liked_at).toLocaleString()}</small>
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-blogs">No blogs yet. Start by creating one!</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;