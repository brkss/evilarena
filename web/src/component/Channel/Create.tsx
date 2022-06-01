import React from "react";
import { Box, Text, Button, Input } from "@chakra-ui/react";

export const CreateChannel: React.FC = () => {
  return (
    <Box mb={"20px"}>
      <Input
        _hover={{ borderColor: "black" }}
        _focus={{ outline: "none", borderColor: "black" }}
        border={"3px solid black"}
        borderColor={"black"}
        fontWeight={"bold"}
        placeholder={"NAME"}
        rounded={"0"}
        w={{ lg: "30%", md: "50%", sm: "70%" }}
      />
      <Button
        _focus={{ outline: 0 }}
        _hover={{background: '#434343'}}
        bg={"black"}
        color={"white"}
        rounded={0}
        mt={"-3px"}
        ml={"20px"}
      >
        CREATE
      </Button>
    </Box>
  );
};
