import { Link } from "react-router-dom";


const ContentManagementAdmin = () => {
    return (
        <div>
            <div className="w-full text-right">
                <Link to="add-blog"><button className="btn btn-accent">Add Blog</button></Link>
            </div>
        </div>
    );
};

export default ContentManagementAdmin;