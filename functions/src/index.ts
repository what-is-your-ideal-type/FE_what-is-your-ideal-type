import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import * as cors from "cors";
import {Request, Response} from "express";
import * as dotenv from "dotenv";

dotenv.config();

// Firebase Admin SDK 초기화
admin.initializeApp();

const allowedOrigin =
process.env.NODE_ENV === "production" ?
  "https://what-is-your-ideal-type.vercel.app" :
  "http://localhost:3000";

// CORS 설정
const corsHandler = cors({
  origin: allowedOrigin,
  credentials: true,
});

export const exchangeKakaoToken = functions.https.onRequest(
  {
    region: "asia-northeast1",
    memory: "512MiB",
    timeoutSeconds: 120,
  },
  async (req: Request, res: Response) => {
    corsHandler(req, res, async () => {
      if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Origin", allowedOrigin);
        res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.set("Access-Control-Allow-Credentials", "true");
        return res.status(204).send("");
      }

      const {code} = req.body;
      console.log("Received code:", code);
      if (!code) {
        console.error("Authorization code is missing.");
        return res.status(400).send({
          error: "Authorization code is required",
        });
      }
      const clientId = "cdcdd94b92efab7c32953bd78c273dce";
      const redirectUri = "http://localhost:3000/auth/kakao";
      const bodyData: {[key: string]: string} = {
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: redirectUri,
        code: code,
      };
      const queryStringBody = Object.keys(bodyData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(bodyData[key]),
        )
        .join("&");

      console.log("Request parameters:", bodyData);

      try {
        // Kakao API로부터 access token 받기
        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: queryStringBody,
        });

        console.log("Response status:", response.status);
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          errorData = {error: "Non-JSON response from Kakao API"};
          console.log(errorData);
        }

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Kakao API error:", errorData);
          return res.status(400).send({
            error: errorData.error || "Failed to obtain access token",
            error_description: errorData.error_description || "No description",
          });
        }

        const data = await response.json();
        if (data.access_token) {
          // Kakao API에서 사용자 정보 가져오기
          const kakaoUserInfoResponse = await fetch(
            "https://kapi.kakao.com/v2/user/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            },
          );
          const kakaoUserInfo = await kakaoUserInfoResponse.json();
          if (!kakaoUserInfo.id) {
            return res.status(400).send({
              error: "Failed to retrieve Kakao user information",
            });
          }
          // Firebase Custom Token 생성
          const firebaseToken = await admin
            .auth()
            .createCustomToken(kakaoUserInfo.id.toString());

          // Firebase Custom Token 반환
          return res.status(200).send({firebaseToken});
        } else {
          return res.status(400).send({
            error: "Failed to obtain access token",
          });
        }
      } catch (error) {
        console.error("Error exchanging token:", error);
        return res.status(500).send({error: "Error exchanging token"});
      }
    });
  },
);
