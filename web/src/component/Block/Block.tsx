import React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  img: string;
}

export const Block: React.FC<Props> = ({ img }) => {
  return <Box bg={"red"} h={"230px"} w={"230px"} bgImg={img} />;
};
