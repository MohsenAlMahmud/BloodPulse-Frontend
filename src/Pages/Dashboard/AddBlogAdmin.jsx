import axios from 'axios';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlogAdmin = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [parsedContent, setParsedContent] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      Swal.fire({
        icon: 'error',
        title: 'Image Required',
        text: 'Please select an image for the blog.',
      });
      return;
    }

    try {
      // Upload the image
      const formData = new FormData();
      formData.append('image', imageFile);

      const imageUploadResponse = await axios.post(image_hosting_api, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      const imageUrl = imageUploadResponse.data.data.display_url;
      setParsedContent(HTMLReactParser(content));
      // Add the blog with the image URL
      await axios.post('https://bloodpulse.vercel.app/add-blog', {
        title,
        content,
        imageUrl,
        parsedContent,
        status:"Draft"
      });

      // Set the parsed content after getting the content from the editor
      // setParsedContent(content);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Blog Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear form fields
      setTitle('');
      setContent('');
      setImageFile(null);
    } catch (error) {
      console.error('Error adding blog:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the blog. Please try again.',
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold my-8">Add a Blog</h2>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onChange={(newContent) => setContent(newContent)}
        />
        
        <br />
        <div className="form-control w-full my-6">
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className='hidden'>
        <h3>Parsed Content:</h3>
        {HTMLReactParser(content)}
      </div>
    </div>
  );
};

export default AddBlogAdmin;