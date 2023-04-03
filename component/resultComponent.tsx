import { Box, Stack, Typography } from "@mui/material";
import { QuestionInterface } from "../interface/api";
import { memo } from "react";

interface IResultProps {
  question: QuestionInterface;
  output: string;
}

interface IResultResponse {
  result: {
    total: number;
    passed: number;
    failed: number;
  };
  test: { output: any; passed: boolean; input: number[]; expected: any }[];
}

function TestCase({ test, result }: IResultResponse) {
  return test && result ?  (
    <Stack gap={"1em"}>
      <Typography color={result.passed == result.total ? "green" : "red"}>
        Total: {result.total} Failed: {result.failed} Passed: {result.passed}
      </Typography>
      <Box>
        <Typography>Test Cases</Typography>
        <Stack mt={"0.5em"}>
          {test.map((item) => (
            <Typography key={item.output + "test cases"} color={item.passed ? "green" : "red"}>
              Test Input: {item.input.join(",")} Output: {item.output} Expected: {item.expected}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Stack>
  ): null;
}

function ResultComponents({ question, output }: IResultProps) {
  const isCorrect = output.toLowerCase() == question.expectedOutput;
  let result = {};

  if (question.testCase && output) {
    result = JSON.parse(output);
  }

  const hasSyntaxError = output.includes("Traceback") && output.includes("Error");

  return output ? (
    <>
      {hasSyntaxError ? (
        <Box>
          <Typography color="red"> Syntax Error: Check your code structure </Typography>
          <Typography style={{ opacity: "0.8", whiteSpace: "pre-line" }}> {output} </Typography>
        </Box>
      ) : (
        <Box>
          {question.testCase ? (
            <TestCase {...(result as IResultResponse)} />
          ) : (
            <Stack color={isCorrect ? "green" : "red"}>
              <Typography> {output.toLowerCase()} </Typography>
              <Typography> Expected </Typography>
              <Typography> {question.expectedOutput} </Typography>
            </Stack>
          )}
        </Box>
      )}
    </>
  ) : (
    <></>
  );
}

export default memo(ResultComponents);
