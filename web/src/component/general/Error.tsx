import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface Props {
  txt: string;
}

export const Error: React.FC<Props> = ({ txt }) => {
  return (
    <Alert mb={"10px"} rounded={"5px"} status="error">
      <AlertIcon />
      <AlertTitle>{txt}</AlertTitle>
    </Alert>
  );
};
