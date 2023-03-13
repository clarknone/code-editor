import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Editor from "@monaco-editor/react";
import React, { useState } from "react";

import { FaPlay, FaTimes } from "react-icons/fa";
import { runCode } from "../service/api";
import {
  ApiResponse,
  LanguageOption,
  QuestionInterface,
} from "../interface/api";
import QuestionDisplayComponent from "../component/questionDisplay";

const languages: LanguageOption[] = [
  { title: "Python3", value: "python", compileValue: "python3" },
  { title: "Javascript", value: "javascript", compileValue: "nodejs" },
  { title: "C", value: "c" },
  { title: "C++", value: "cpp" },
  { title: "Java", value: "java" },
];
const theme = [
  { title: "Dark", value: "vs-dark" },
  { title: "Light", value: "light" },
];

let selectedLanguage: LanguageOption = languages[0];

const questions: QuestionInterface[] = [
  {
    instruction: "This is to test your basic python skill",
    name: "Basic",
    steps: [
      { title: "Add a comment to your code" },
      { title: "Name your variable" },
      { title: "Assign value to your variable" },
      { title: "Print your variable to the screen" },
      { title: "Click run an compile" },
    ],
    output:"/nhello world/n"
  },
  {
    instruction: "This is to test your basic python list skill",
    name: "List",
    steps: [
      { title: "Add a comment to your code" },
      { title: "Create an empty list variable" },
      { title: "Add two numbers to your list variable" },
      { title: "Print your list variable to the screen" },
      { title: "Click run an compile" },
    ],
  },
  {
    instruction: "This is to test your basic python dictionary skill",
    name: "Dictionaries",
    steps: [
      { title: "Add a comment to your code" },
      { title: "Create an empty dictionary variable" },
      { title: "Add two numbers to your dictionary variable" },
      { title: "Print your dictionary variable to the screen" },
      { title: "Click run an compile" },
    ],
  },
];

export default function Home() {
  const [config, setConfig] = useState({ language: selectedLanguage.value });
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    statusCode: 2,
  });

  const [activeQuestion, setActiveQuestion] = useState<number>(0);
const defaultTestCode= 'def func():\n    print(\"hello world\")\n    return \"hello world\"\n    \ndef test(output):\n    assert output == \"hello world\", \"not passed\"\ntest(func())'
  // };

  // const handleLanguage = (e: SelectChangeEvent) => {
  //   const { name, value } = e.target;
  //   if (name) {
  //     const obj = languages[Number(value)];
  //     setConfig((val) => ({ ...val, [name]: obj.value }));
  //     selectedLanguage = obj;
  //   }
  // };

  const submit = () => {
    setLoading(true);
    const language = selectedLanguage.compileValue || selectedLanguage.value;
    runCode({
      script: code,
      language: language,
      stdin: userInput,
    })
      .then((resp) => {
        setApiResponse({ ...resp });
      })
      .catch((e) => {
        const response: ApiResponse = {
          statusCode: 400,
          error: "Failed to compile code",
          ...e?.response?.data,
        };
        setApiResponse({ ...response });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <Head>
        <title>React Editor </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack gap={"0.5em"} height={"100vh"} p={"1em"} minHeight="500px">
        <Stack direction={{ sm: "row" }} maxWidth="50vw" alignItems={{ sm: "center" }}>
          <Typography>Assignment Progress</Typography>
          <Box flexGrow={1}>
            <Stepper activeStep={activeQuestion} alternativeLabel>
              {new Array(questions.length + 1).fill(0).map((item, index) =>
                index < questions.length ? (
                  <Step key={`${item}-${index}`}>
                    <StepLabel>{questions[index].name}</StepLabel>
                  </Step>
                ) : (
                  <Step key={`${item}-${index}`}>
                    <StepLabel>Complete</StepLabel>
                  </Step>
                )
              )}
            </Stepper>
          </Box>
        </Stack>
        <Box flexGrow={1}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={"center"}
            gap={"2vw"}
            position="relative"
            // minHeight={"800px"}
            height="100%"
          >
            <Stack
              justifyContent={"center"}
              alignItems="center"
              width="100%"
              height="100%"
              bgcolor="#eee"
              p={1}
            >
              <Stack justifyContent={"center"} width={"100%"} flexGrow={1}>
                {activeQuestion < questions.length ? (
                  <Box>
                    <QuestionDisplayComponent {...questions[activeQuestion]} />
                  </Box>
                ) : (
                  <Box>
                    <Typography textAlign={"center"}> Completed </Typography>
                  </Box>
                )}
              </Stack>
              <Stack
                width={"100%"}
                direction={"row"}
                justifyContent="space-between"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  disableElevation
                  onClick={() => setActiveQuestion((val) => val - 1)}
                  disabled={activeQuestion < 1}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  size="small"
                  onClick={() => setActiveQuestion((val) => val + 1)}
                  color="primary"
                  disabled={activeQuestion >= questions.length}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
            <Stack width="100%" height="100%">
              <Box flexGrow={1}>
                <Editor
                  height="100%"
                  defaultValue={defaultTestCode}
                  {...config}
                  onChange={(value) => setCode(`${value}`)}
                />
              </Box>
              <Stack direction="row" alignItems={"center"} gap="1vw">
                <Box flexGrow={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your program input ...."
                    multiline
                    name="userinput"
                    value={userInput}
                    minRows={1}
                    InputProps={{
                      endAdornment: (
                        <>
                          {userInput.length ? (
                            <IconButton
                              color="primary"
                              onClick={() => setUserInput("")}
                            >
                              <FaTimes fontSize={"0.8em"} />
                            </IconButton>
                          ) : null}
                        </>
                      ),
                    }}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    disabled={loading}
                    size="small"
                    onClick={submit}
                  >
                    {loading ? (
                      <CircularProgress size={"2em"} variant="indeterminate" />
                    ) : (
                      <Typography> Run </Typography>
                    )}
                  </Button>
                </Box>
                <Box>
                  <Button variant="outlined" size="small">
                    Debug
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Stack
            border="0.01em solid black"
            p={"0.2em"}
            // height={"10vh"}
            minHeight="50px"
            mb={2}
            rowGap={"0.2em"}
          >
            <Typography fontWeight="600" fontSize={"0.8em"}>
              Output
            </Typography>
            <Box flexGrow={1}>
              {loading ? (
                <LinearProgress
                  sx={{
                    height: "0.1em",
                  }}
                  variant="indeterminate"
                />
              ) : (
                <Box>
                  <Typography
                    style={{
                      whiteSpace: "pre-line",
                      // color: apiResponse.error ? "red" : "inherit",
                    }}
                  >
                    {
                      
                    }
                    {apiResponse?.output || apiResponse?.error}
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
