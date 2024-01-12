import axios from "axios"
import { hideLoader, showLoader } from "../reducers/loader";


const axiosInstance = axios.create({
  baseURL: "https://controller.callcentreproject.com/bdo-api",
  headers: {
    accept: `application/json`,
    "Content-Type": "application/json",
    "Authorization" : "bearer "+ localStorage.getItem("staff_auth_token")

  },
});


const setupInterceptors = (getState, dispatch) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      dispatch(showLoader());
      return config;
    },
    (error) => {
      dispatch(showLoader());
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      dispatch(showLoader()); 
      return res;
    },
    async (err) => {
      dispatch(hideLoader()); 
      if (err.response && err.response.status === 401) {
        handleUnauthorizedError();
      }
      return Promise.reject(err);
    }
  );
}

const handleUnauthorizedError = () => {
  // Remove the token from local storage
  localStorage.removeItem("staff_auth_token");

  // Redirect to the login page or any other desired action
  // Example: Uncomment the following line to redirect to the login page
  window.location.href = "/signin";

}

const axiosBaseQuery = (excludedEndpoints = []) =>
  async ({ url, method, body, params, ...requestOpts }, { getState, dispatch }) => {
    if (!excludedEndpoints.includes(url)) {
      setupInterceptors(getState, dispatch);
    }
     try {
       const axiosOptions = {
         url: url,
         method,
         data: body,
         params,
         headers: requestOpts.headers,
       };

       if (/^(auth\/)/.test(url)) {
         axiosOptions["withCredentials"] = true;
       }
       const result = await axiosInstance(axiosOptions);
       return { data: result.data };
     } catch (axiosError) {
       let err = axiosError;
       return {
         error: {
           status: err.response?.status,
           data: err.response?.data || err.message,
         },
       };
     }
  }

  export default axiosBaseQuery();


