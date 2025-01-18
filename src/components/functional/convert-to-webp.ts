export const convertToWebP = async (url: string): Promise<Blob | undefined> => {
  try {
    console.log('변환 시작:', url);

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173/proxy'
        : 'https://what-is-your-ideal-type.vercel.app/proxy';

    // URL 파싱
    const originalUrl = new URL(url);
    console.log('1. 파싱된 URL:', {
      pathname: originalUrl.pathname,
      search: originalUrl.search,
    });

    // 전체 경로와 쿼리 파라미터를 인코딩
    const encodedPath = encodeURIComponent(
      originalUrl.pathname.replace('/private/', '/'),
    );
    console.log('2. 인코딩된 경로:', encodedPath);
    const encodedSearch = encodeURIComponent(originalUrl.search);
    console.log('3. 인코딩된 쿼리:', encodedSearch);

    // 최종 URL 구성
    const finalUrl = `${baseUrl}${encodedPath}${encodedSearch}`;
    console.log('4. 최종 URL:', finalUrl);

    const response = await fetch(finalUrl, {
      headers: {
        Accept: 'image/png,image/*',
        'Cache-Control': 'no-cache',
      },
    });

    // 상세한 응답 정보 로깅
    console.log('5. 응답 정보:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers),
      url: response.url,
    });

    if (!response.ok) {
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
