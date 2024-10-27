import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3100',
})
const token = sessionStorage.getItem('token');
axiosInstance.defaults.headers['token'] = token;

axiosInstance.interceptors.response.use(
    response => response,
    async error=>{
        const originalRequest = error.config;
        if (!originalRequest._retry) {
            originalRequest._retry = false;
        }
        if(error.response.status === 401 && !originalRequest._retry){
            if (originalRequest._retry === true) {
                // 이미 재시도한 경우, 에러 반환
                return Promise.reject(error);
            } 
            originalRequest._retry = true;
        
            try{
                const res = await axiosInstance.get('/refresh',{
                    headers : {token},
                    withCredentials: true,
                    _retry: true, // 새 요청에 대한 재시도 플래그 초기화
                });

                if(res.status === 200){
                    const newAccessToken = res.data.token
                    sessionStorage.setItem('token', newAccessToken);
                    axiosInstance.defaults.headers['token'] = newAccessToken;
                    originalRequest.headers['token'] = newAccessToken
                
                    return axiosInstance(originalRequest);
                }

            } catch (err){
                return Promise.reject(err);
            }
        }
        
        return Promise.reject(error);

    }
)




export default axiosInstance;




