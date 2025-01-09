export const convertToWebP = async (url: string): Promise<Blob | undefined> => {
  try {
    console.log("변환 시작:", url); // 디버깅

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173/proxy"
        : "https://oaidalleapiprodscus.blob.core.windows.net";

    url = url.replace(
      "https://oaidalleapiprodscus.blob.core.windows.net",
      baseUrl,
    );
    console.log("수정된 URL:", url); // 디버깅

    const response = await fetch(url);
    const blob = await response.blob();
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("이미지 생성 중 오류 발생");
        }

        canvas.width = 512;
        canvas.height = 512;
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height,
        );
        const width = img.width * scale;
        const height = img.height * scale;

        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        ctx.drawImage(img, x, y, width, height);

        canvas.toBlob(
          (webpBlob) => {
            if (!webpBlob) {
              reject(new Error("WebP Blob 생성 중 오류 발생"));
              return;
            }
            resolve(webpBlob);
          },
          "image/webp",
          0.5,
        );
      };
    });
  } catch (error) {
    console.error("Error converting to WebP:", error);
    throw error;
  }
};
