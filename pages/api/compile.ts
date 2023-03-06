import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "../../interface/api";

const COMPILER_URL = "https://api.jdoodle.com/v1/execute/";

const compilerAxios = new axios.Axios({
  baseURL: COMPILER_URL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  let response: ApiResponse = { statusCode: 400, error: "bad request" };
  if (req.method != "POST") {
    response.statusCode = 200;
    response.error = "only post is allowed";
    return res.json(response);
  }
  const data = req.body;
  const clientId = "299049fb115ef58c4c90d89b9d50ef30";
  const clientSecret =
    "31f3c7480433613e574123cb07cd0d253262ab3a8f240b3e35e79a1ae2e922a";
  data.clientId = clientId;
  data.clientSecret = clientSecret;

  return compilerAxios
    .post("", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .then((resp) => {
      response.statusCode = 200;
      const responseData = JSON.parse(resp.data);
      response = { ...response, ...responseData };
      return res.json(response);
    })
    .catch((e) => {
      console.log({ e });
      response.error = e.response?.data?.error || response.error;
      return res.status(400).json(response);
    });
}
