import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface Props {
  img: string;
}

export const Block: React.FC<Props> = ({ img }) => {
  return (
    <Box bg={"blue"}>
      <Image src={img} h={"100%"} w={"100%"} />
    </Box>
  );
};
