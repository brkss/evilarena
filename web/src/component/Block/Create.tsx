import React from "react";
import { Box, Text, Center, Textarea } from "@chakra-ui/react";

export const CreateBlock: React.FC = () => {
  const [show, setShow] = React.useState(true);

  return (
    <Center onClick={() => setShow(false)} border={"1px solid #434343"}>
      {show ? (
        <Text textAlign={"center"} fontWeight={"bold"}>
          WRITE / DRAG AND DROP
        </Text>
      ) : (
        <Textarea
          autoFocus={true}
          fontWeight={"bold"}
          p={"5px"}
          _focus={{ outline: "none" }}
          resize={"none"}
          rounded={"0"}
          border={"none"}
          h={"100%"}
          w={"100%"}
          onBlur={() => setShow(true)}  
        />
      )}
    </Center>
  );
};
