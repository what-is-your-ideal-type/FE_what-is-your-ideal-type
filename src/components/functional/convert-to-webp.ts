export const convertToWebP = async (url: string): Promise<Blob | undefined> => {
  try {
    console.log('변환 시작:', url);

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173/proxy'
        : 'https://what-is-your-ideal-type.vercel.app/proxy';

    // URL 파싱 및 경로 추출
    const originalUrl = new URL(url);
    const pathOnly = originalUrl.pathname + originalUrl.search;

    // private 경로 제거
    const cleanPath = pathOnly.replace('/private/', '/');

    // 최종 URL 생성
    const finalUrl = `${baseUrl}${cleanPath}`;

    console.log('수정된 URL:', finalUrl);

    const response = await fetch(finalUrl, {
      headers: {
        Accept: 'image/png,image/*',
      },
    });

    if (!response.ok) {
      console.error('응답 상태:', response.status);
      console.error('응답 헤더:', Object.fromEntries(response.headers));
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('이미지 생성 중 오류 발생');
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
    });
  } catch (error) {
    console.error('상세 에러:', error);
    throw error;
  }
};
