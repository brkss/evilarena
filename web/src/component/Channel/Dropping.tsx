import React from "react";
import { Center, Text } from "@chakra-ui/react";

export const Dropping: React.FC = () => {
  return (
    <Center
      pos={"fixed"}
      h={"100vh"}
      bg={"#00000047"}
      top={0}
      left={0}
      w={"100%"}
    >
      <Text color={"black"} fontSize={"23px"} fontWeight={"bold"}>
        DROP THE FILES !
      </Text>
    </Center>
  );
};
