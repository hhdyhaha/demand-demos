import axios, {type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse} from 'axios'

// 通过create方法,创建axios实例
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    withCredentials: false
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 对请求配置做些什么
      return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response
    },
    (error: any) => {
        // 处理响应错误
        return Promise.reject(error)
    }
)

export default axiosInstance