export const config = {
  apiUrl: import.meta.env.VITE_API,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

export function getApiUrl() {
  if (config.isDev) {
    return "API=http://0.0.0.0:8080/api/";
  }
  return "API=https://medicant-778013791151.asia-southeast1.run.app/api/";
}
