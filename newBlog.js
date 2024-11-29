import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newBlog.css';

function BlogEditor() {
    const navigate = useNavigate();
    const [blogTitle, setBlogTitle] = useState('');
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [imageURL, setImageURL] = useState(''); // Store the image URL

    // Update the image URL state when user inputs a URL
    const handleImageURLChange = (event) => {
        setImageURL(event.target.value);
    };

    const publishBlog = async () => {
        try {
            const blogBody = new URLSearchParams({
                title: blogTitle,
                content: content,
                topic: topic,
                image_url: imageURL,
            });

            const response = await fetch('http://localhost:8000/Suma/blogServlet', {
                method: 'POST',
                credentials: "include",// This will send the cookie (useremail) along with the request

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Ensure cookies are sent with the request (for session validation)
                },
                body: blogBody.toString(),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message) {
                    alert('Blog published successfully');
                    console.log(data);  // You now have the full data, including blogId, title, etc.
                    navigate('/dashboard');
                } else {
                    alert('Failed to publish blog');
                }
            } else {
                alert('Failed to publish blog');
                console.error('Response error:', response.status);
            }
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('An error occurred while publishing the blog.');
        }
    };

    return (
        <div className="blog-editor">
            <h2>Create New Blog</h2>
            <div className="editor-form">
                <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="input-field"
                    placeholder="Blog Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea-field"
                    placeholder="Write your content here..."
                ></textarea>

                {/* Topics Dropdown */}
                <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="topic-dropdown"
                >
                    <option value="">Select Topic</option>
                    <option value="Tech">Tech</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Health">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                </select>

                {/* Image URL input */}
                <input
                    type="text"
                    value={imageURL}
                    onChange={handleImageURLChange}
                    className="input-field"
                    placeholder="Enter Image URL"
                />

                {/* Display image preview */}
                {imageURL && (
                    <div className="image-preview">
                        <img src={imageURL} alt="Preview" className="preview-image" />
                    </div>
                )}

                <div className="editor-actions">
                    <button onClick={publishBlog} className="btn-publish">Publish</button>
                </div>
            </div>
        </div>
    );
}

export default BlogEditor;
