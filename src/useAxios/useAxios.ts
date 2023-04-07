import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type AxiosOptionsTypes = {
  authUrl?: {
    url: string;
    token: string;
  };
  formDataUrl?: string;
};

export const useAxios = (baseURL: string, options?: AxiosOptionsTypes) => {
  const CustomAxios = axios.create({
    baseURL,
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  const requestHandler = (config: InternalAxiosRequestConfig) => {
    if (options?.formDataUrl) {
      if (config.url?.startsWith(options.formDataUrl))
        config.headers["Content-Type"] = "multipart/form-data";
    }

    if (options?.authUrl) {
      const token = options.authUrl.token;

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  const responseHandler = (response: AxiosResponse) => {
    return response;
  };

  const errorHandler = (error: AxiosError) => {
    throw {
      code: error.code,
      message: error.message,
    };
  };

  const requestInterceptor =
    CustomAxios.interceptors.request.use(requestHandler);
  const responseInterceptor = CustomAxios.interceptors.response.use(
    responseHandler,
    errorHandler
  );

  CustomAxios.interceptors.request.eject(requestInterceptor);
  CustomAxios.interceptors.response.eject(responseInterceptor);

  return CustomAxios;
};

export default useAxios;
