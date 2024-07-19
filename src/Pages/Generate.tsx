import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { imageGenerate } from "../services/imageGenerator";
import { convertToWebP } from "../services/convertToWebP";
import { uploadImageToFirebase } from "../services/uploadImageToFirebase";

const Generate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { prompts } = location.state;
    const processAndNavigate = async () => {
      try {
        const data = await imageGenerate(prompts);
        const responseUrl = data?.url;

        if (!responseUrl) {
          throw new Error("Failed to get response URL");
        }
        const webP = await convertToWebP(responseUrl);

        if (!webP) {
          throw new Error("Failed to convert to WebP");
        }
        const [firebaseUrl, firebaseFileName] =
          await uploadImageToFirebase(webP);

        if (!firebaseUrl) {
          throw new Error("Failed to upload and download Image to Firebase");
        }

        const newPrompts = prompts.join(" ");
        navigate(
          `/result/${encodeURIComponent(newPrompts)}/${encodeURIComponent(firebaseUrl)}`,
          {
            state: { fileName: firebaseFileName },
          },
        );
      } catch (error) {
        console.error(error);
      }
    };
    processAndNavigate();
  }, []);

  return <Loading />;
};

export default Generate;
