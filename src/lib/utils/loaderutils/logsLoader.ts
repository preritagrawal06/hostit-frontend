import axios from "axios";
import { ActionFunctionArgs } from "react-router-dom";

const LogsLoader = async ({ params }: ActionFunctionArgs) => {
  const { data: deploymentData } = await axios.get(
    `${import.meta.env.VITE_PROD_BASE_URL}/project/deployment/${
      params.deploymentId
    }`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  const { data: logsData } = await axios.get(
    `${import.meta.env.VITE_PROD_BASE_URL}/logs/${params.deploymentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return {
    deployment: deploymentData.deployment,
    logs: logsData.logs,
  };
};

export default LogsLoader;
