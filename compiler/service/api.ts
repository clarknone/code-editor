import axios from "axios";

let COMPILER_URL = "";
try {
  COMPILER_URL =
    window != undefined
      ? window.location.origin
      : "https://api.jdoodle.com/v1/execute/";
} catch (e) {
  console.log("ssr");
}

try {
} catch (error) {}

const compilerAxios = new axios.Axios({
  baseURL: COMPILER_URL,
});

interface CodeInput {
  clientId?: String;
  clientSecret?: String;
  script: String;
  stdin?: String;
  language: String;
  versionIndex?: String;
}

const runCode = async (data: CodeInput) => {
  return compilerAxios
    .post("/api/compile", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
    .then((resp) => {
      return JSON.parse(resp.data);
    })
    .catch((e) => {
      console.log({ e });
      throw new Error(e.message);
    });
};
export { COMPILER_URL, runCode };
