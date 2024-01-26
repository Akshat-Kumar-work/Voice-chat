import axios from "axios"

export const axiosInstance = axios.create({withCredentials: true});

export const apiConnector =  (method , url , bodyData , headers, params)=>{

   
    return axiosInstance( {
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData :null,
        headers: headers ? headers: null,
        params : params? params : null,
    })
    

};

axiosInstance.interceptors.response.use(
    (config)=>{
        return config;
    },
   async (err)=>{
        const originalReq = err.config;
        if(err.response.status === 400 && originalReq && !originalReq._isRetry ){
            originalReq.isRetry = true;
            try{
                  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/refresh`,{ },{withCredentials:true});
    
                return axiosInstance.request({...originalReq,withCredentials:true});
            }catch(err){
                console.log(err.message);
            }
        }
        throw err;
    }
)
