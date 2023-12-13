// import axios from 'axios';
// import JoditEditor from 'jodit-react';
// import Swal from 'sweetalert2';
// import HTMLReactParser from 'html-react-parser';
// // import { useRef } from 'react';
// import { useRef, useState } from 'react';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';
// import { useState } from 'react';


// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const addWall = () => {
//     //   const editor = useRef(null);
//     const editor1 = useRef();
//     const [title1, setTitle1] = useState('');
//     const [content1, setContent1] = useState('');
//     const [imageFile1, setImageFile1] = useState(null);
//     const [parsedContent1, setParsedContent1] = useState('');
//     const axiosPublic = useAxiosPublic();
//     // const editor1 = useRef(null);


//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImageFile1(file);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!imageFile1) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Image Required',
//                 text: 'Please select an image for the blog.',
//             });
//             return;
//         }

//         try {
//             // Upload the image
//             const formData = new FormData();
//             formData.append('image', imageFile1);

//             const imageUploadResponse = await axios.post(image_hosting_api, formData, {
//                 headers: {
//                     'content-type': 'multipart/form-data',
//                 },
//             });

//             const imageUrl = imageUploadResponse.data.data.display_url;
//             setParsedContent1(HTMLReactParser(content1));
//             // Add the blog with the image URL
//             await axiosPublic.post('https://bloodpulse.vercel.app/addWall', {
//                 title1,
//                 content1,
//                 imageUrl,
//                 parsedContent1,
//                 status: "Draft"
//             });

//             // Set the parsed content after getting the content from the editor
//             // setParsedContent(content);

//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: 'Blog Added Successfully',
//                 showConfirmButton: false,
//                 timer: 1500,
//             });

//             // Clear form fields
//             setTitle1('');
//             setContent1('');
//             setImageFile1(null);
//             // history.push('/blog');
//         } catch (error) {
//             console.error('Error adding blog:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'An error occurred while adding the blog. Please try again.',
//             });
//         }
//     };

//     return (
//         <div>
//             <h2 className="text-3xl font-bold my-8">Post a Wall</h2>

//             <form onSubmit={handleFormSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Type here"
//                     className="input input-bordered w-full max-w-full"
//                     value={title1}
//                     onChange={(e) => setTitle1(e.target.value)}
//                 />
//                 <br />
//                 <br />
//                 <JoditEditor
//                     ref={editor1}
//                     value={content1}
//                     tabIndex={1}
//                     onChange={(newContent) => setContent1(newContent)}
//                 />

//                 <br />
//                 <div className="form-control w-full my-6">
//                     <input
//                         type="file"
//                         onChange={handleImageChange}
//                         className="file-input w-full max-w-xs"
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>

//             <div className='hidden'>
//                 <h3>Parsed Content:</h3>
//                 {HTMLReactParser(content1)}
//             </div>
//         </div>
//     );
// };

// export default addWall;