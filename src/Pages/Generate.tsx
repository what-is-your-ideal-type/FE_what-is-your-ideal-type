import { useLocation } from "react-router-dom"
import Loading from "../components/Loading"
import { useEffect } from "react";
import { requestImage } from "../services/requestImage";
import { convertToWebP } from "../services/convertToWebP";

const Generate = () => {
    const location = useLocation()
    
    
    useEffect(() => {
        const { prompts } = location.state;
        const func = async () => {
            try{
                const url = await requestImage(prompts)
                const webP = await convertToWebP(url)
            }catch(error){
                console.error(error)
            }
        }
    }, [])

    useEffect(() => {
        const handleUpload = async () => {
          try {
            if (imageUrl.trim() !== "") {
              const url = await uploadImageToFirebase(imageUrl);
              if (typeof url === "string") {
                setDownloadUrl(url);
              } else {
                throw new Error("Invalid URL format received");
              }
            }
          } catch (error) {
            console.error("Error uploading image: ", error);
          }
        };
        handleUpload();
      }, [imageUrl]);


    return <Loading/>
}

export default Generate