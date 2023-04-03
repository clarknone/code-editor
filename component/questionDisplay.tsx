import { Box, Stack, Typography } from "@mui/material";
import { ReactComponentElement } from "react";
import { QuestionInterface } from "../interface/api";

export default function QuestionDisplayComponent(props: QuestionInterface) {
  return (
    <Box>
      <Typography>
        <Typography mr={"1em"} fontWeight={600} component={"span"}>
          Instructions:
        </Typography>
        {props.instruction}
      </Typography>
      <Stack mt={"2vw"}>
        {props.steps.map((item, index) => (
          <Typography variant="h6" fontSize={"0.8em"}>
            Step {index + 1}: {item.title}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
