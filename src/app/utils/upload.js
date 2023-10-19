import axios from "axios";


const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "testUpload");

    try {
      const res = await axios.post(
        "https://api-eu.cloudinary.com/v1_1/dmi3bxu9s/image/upload",
        data
      );

      const { url } = res.data;
      return url;
    } catch (err) {
      console.log(err);
    }
  };


  export default upload