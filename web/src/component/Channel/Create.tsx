import React from "react";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import { useCreateChannelMutation } from "../../generated/graphql";

export const CreateChannel: React.FC = () => {
  const [name, setName] = React.useState<string>("");
  const [create] = useCreateChannelMutation();

  const handleCreatingChannel = () => {
    if (name === "") return;
    create({
      variables: {
        name: name,
      },
    }).then((res) => {
      console.log("CREATE CHANNEL RES : ", res);
    });
  };

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
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Button
        _focus={{ outline: 0 }}
        _hover={{ background: "#434343" }}
        bg={"black"}
        color={"white"}
        rounded={0}
        mt={"-3px"}
        ml={"20px"}
        onClick={() => handleCreatingChannel()}
      >
        CREATE
      </Button>
    </Box>
  );
};
