import React from "react";
import { Box, Center, Heading, Input, Button } from "@chakra-ui/react";
import { useLoginMutation } from "../../generated/graphql";

export const Login: React.FC = () => {
  const [form, setForm] = React.useState<any>({});
  const [login] = useLoginMutation();

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleLogin = () => {
    if (!form || !form.username || !form.password) return;

    login({
      variables: {
        username: form.username,
        password: form.password,
      },
    }).then((res) => {
      if (res.data?.login.status) {
        window.history.pushState({}, "", "/");
      }
    });
  };
  return (
    <Center h={"100vh"}>
      <Box w={"400px"}>
        <Heading mb={"10px"}>Login</Heading>
        <Input
          id={"username"}
          onChange={(e) => handleForm(e)}
          size={"md"}
          type={"text"}
          mb={"10px"}
          placeholder={"username"}
          variant={"filled"}
        />
        <Input
          id={"password"}
          onChange={(e) => handleForm(e)}
          size={"md"}
          mb={"10px"}
          type={"password"}
          placeholder={"password"}
          variant={"filled"}
        />
        <Button size={"md"} onClick={() => handleLogin()}>
          Login
        </Button>
      </Box>
    </Center>
  );
};
