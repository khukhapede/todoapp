export const API = () => {
  const baseUrl =
    "https://v1.nocodeapi.com/khusnanhadi/supabase/beFTCVUKEMyDciPx?tableName=todoLists";

  const executeAPI = async (config) => {
    const response = await fetch(baseUrl, config);
    const data = await response.json();
    return data;
  };

  return {
    get: executeAPI,
    post: executeAPI,
    patch: executeAPI,
    put: executeAPI,
    delete: executeAPI,
  };
};
