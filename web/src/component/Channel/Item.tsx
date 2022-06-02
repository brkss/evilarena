import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  view: () => void;
}

export const ChannelThumbnail: React.FC<Props> = ({ name, view }) => {

  return (
    <Center cursor={'pointer'} onClick={() => view()} bg={"gray.100"} border={"1px solid #c2c2c2"} h={"200px"} w={"100%"}>
      <Box textAlign={"center"}>
        <Text fontWeight={"bold"}>{name}</Text>
        <Text fontSize={"15px"}>203 Blocks</Text>
      </Box>
    </Center>
  );
};
