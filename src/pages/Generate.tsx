import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { imageGenerate } from "../services/imageGenerator";
import { convertToWebP } from "../services/convertToWebP";
import { uploadImageToFirebase } from "../services/uploadImageToFirebase";
import { useAuth } from "../contexts/AuthContext";
import { getCountAndTimeLeft, incrementCount } from "../services/countService";
import { saveResultUrlToFirebase } from "../services/saveResultUrlToFirebase";

const Generate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const { prompts, hashTags } = location.state;
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
        const [firebaseUrl, firebaseFileName, imageDocId] =
          await uploadImageToFirebase(webP, hashTags);

        if (!firebaseUrl) {
          throw new Error("Failed to upload and download Image to Firebase");
        }

        const addHashTags = hashTags.map((v: string) => "#" + v);
        const newPrompts = addHashTags.join(" ");
        const resultUrl = `/result/${encodeURIComponent(newPrompts)}/${encodeURIComponent(firebaseUrl)}`;

        // Firebase에 결과 페이지 url 저장
        if (currentUser) {
          await saveResultUrlToFirebase({
            user: currentUser,
            imageDocId: imageDocId,
            resultUrl: resultUrl,
          });
        }

        navigate(resultUrl, {
          state: { fileName: firebaseFileName },
        });

        const { count, limit } = await getCountAndTimeLeft(currentUser);
        await incrementCount(currentUser, count, limit);
      } catch (error) {
        console.error(error);
      }
    };
    processAndNavigate();
  }, []);

  return <Loading />;
};

export default Generate;
