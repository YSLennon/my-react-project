import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3100',
})

// axiosInstance.interceptors.response.use(
//     response => response,
//     async error=>{
//         const originalRequest = error.config;

//         if(error.response.status === 401 && !originalRequest._retry){
//             originalRequest._retry = true;
//             try{
//                 const res = await axiosInstance.post('/refresh', {
                    
//                 }, { withCredentials: true })
//             }
//         }

//     }
// )




export default axiosInstance;



// import axios from 'axios';

// // Axios 인스턴스 생성
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3100',
//     withCredentials: true,
// });

// // 인터셉터 추가
// axiosInstance.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;

//         // 401 에러인지 확인
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // 중복 요청 방지

//             // 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
//             try {
//                 const res = await axiosInstance.post('/refresh-token', {
//                     // 필요한 데이터 추가
//                 });

//                 if (res.status === 200) {
//                     // 새로운 액세스 토큰 저장
//                     const newAccessToken = res.data.accessToken;
//                     // axiosInstance의 Authorization 헤더 업데이트
//                     axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;

//                     // 원래의 요청 다시 시도
//                     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return axiosInstance(originalRequest);
//                 }
//             } catch (refreshError) {
//                 // 리프레시 토큰 요청 실패 시, 로그인 페이지로 리다이렉트 또는 에러 처리
//                 console.error('Refresh token failed:', refreshError);
//                 // 예: window.location.href = '/login';
//             }
//         }

//         // 401 이외의 에러 또는 리프레시 토큰 요청 실패 시 에러 반환
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
