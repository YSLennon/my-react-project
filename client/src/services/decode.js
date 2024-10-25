export const decode = (token) => {
    const base64Url = token.split('.')[1]; // 페이로드 부분
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // URL-safe Base64를 일반 Base64로 변환
    const jsonPayload = decodeURIComponent(escape(window.atob(base64))); // Base64 디코딩 및 URI 디코딩
    return JSON.parse(jsonPayload); // JSON 객체로 변환
}