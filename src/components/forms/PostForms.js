import { useNavigate } from "react-router-dom";
import FileUploader from "../shared/FileUploader";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "reactstrap";
import { addPost } from "../../store/actions/postAction";
import { useDispatch } from "react-redux";

const PostForms = ({ action }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    caption: "",
    location: "",
    tags: "",
    post: null,
  });

  const handleFileChange = (file) => {
    setFormData({
      ...formData,
      post: file,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "Create") {
        console.log(formData);
        await dispatch(addPost(formData))
        toast.success("Post created successfully!");
      } else if (action === "Update") {
        // await updatePost(data);
        toast.success("Post updated successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  const imageUrl = null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-9 w-full max-w-5xl"
    >
      <div>
        <label htmlFor="caption" className="shad-form_label">
          Caption
        </label>
        <textarea
          name="caption"
          id="caption"
          cols="30"
          rows="10"
          value={formData.caption}
          onChange={handleInputChange}
          className="shad-textarea custom-scrollbar"
        ></textarea>
      </div>

      <div>
        <label htmlFor="file" className="shad-form_label">
          Add Photos
        </label>
        <FileUploader fieldChange={handleFileChange} mediaUrl={imageUrl} />
      </div>

      <div>
        <label htmlFor="location" className="shad-form_label">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          className="shad-post-input"
          required
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="tags" className="shad-form_label">
          Add Tags (Separeted by comma " , "){" "}
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="shad-post-input"
          required
          autoComplete="off"
        />
      </div>

      <div className="flex gap-4 items-center justify-end">
        <Button type="submit" className="shad-button_dark_4">
          Cancel
        </Button>
        <Button
          type="submit"
          className="shad-button_primary whitespace-nowrap"
          //   disabled={isLoadingCreate || isLoadingUpdate}
        >
          {/* {(isLoadingCreate || isLoadingUpdate) && <Loader />} */}
          {/* {action} */}
          Post
        </Button>
      </div>
    </form>
  );
};

export default PostForms;
