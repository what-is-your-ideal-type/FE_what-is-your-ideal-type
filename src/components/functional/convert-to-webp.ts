export const convertToWebP = async (url: string): Promise<Blob | undefined> => {
  try {

    // 1. 직접 프록시 URL 구성
    const proxyUrl = url.replace(
      'https://oaidalleapiprodscus.blob.core.windows.net',
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173/proxy'
        : 'https://what-is-your-ideal-type.vercel.app/proxy',
    );


    // 2. 이미지 가져오기
    const response = await fetch(proxyUrl, {
      headers: {
        Accept: 'image/*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Blob으로 변환
    const blob = await response.blob();
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('이미지 생성 중 오류 발생'));
          return;
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
              reject(new Error('WebP Blob 생성 중 오류 발생'));
              return;
            }
            resolve(webpBlob);
          },
          'image/webp',
          0.5,
        );
      };

      img.onerror = (error) => {
        reject(new Error(`이미지 로드 실패: ${error}`));
      };

      img.src = URL.createObjectURL(blob);
    });
  } catch (error) {
    console.error('이미지 변환 에러:', error);
    throw error;
  }
};
