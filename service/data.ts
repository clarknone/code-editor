import { QuestionInterface } from "../interface/api";

export const QuestionList: QuestionInterface[] = [
  {
    instruction: "This is to test your basic python skill",
    name: "Basic",
    steps: [{ title: "Write a python program to display hello world" }],
    expectedOutput: "hello world\n",
  },
  {
    instruction: "This is to test your basic variable skills ",
    name: "Variables",
    steps: [
      { title: "Declear a variable x and asign it a value 10" },
      { title: "Declear a variable y and asign it a value 5" },
      { title: "Display the result of x + y" },
    ],  
    expectedOutput: "15\n",
  },
  {
    instruction: "This is to test your basic function skill",
    name: "Functions",
    steps: [
      { title: "Write a function that accepts two numbers as an argument and return the sum of the two numbers" },
    ],
    expectedOutput: "hello world\n",
    testCase: `\n\n\n\ndef testSum(func):\n    testCases = [\n        {\"input\":[3,2], \"expected\": 3+2,\"passed\":False,\"output\":\"\"},\n        {\"input\":[5,10], \"expected\": 5+10,\"passed\":False,\"output\":\"\"},\n        {\"input\":[-5,10], \"expected\": 5+10,\"passed\":False,\"output\":\"\"},\n    ]\n    result = {\n        \"total\":len(testCases),\"failed\":0,\"passed\":0\n    }\n    for case in testCases:\n        output = func(*case[\"input\"])\n        case[\"output\"] = output\n        if output==case[\"expected\"]:\n            case['passed'] = True\n            result[\"passed\"]+=1\n        else:result[\"failed\"]+=1\n    return {\"result\":result, \"test\":testCases}\n\nimport json\nprint(json.dumps(testSum(add)))\n# print(testSum(add))\n\n`,
    defaultCode: `\ndef add():\n    #write your code here\n    return\n\n`,
  },
];
