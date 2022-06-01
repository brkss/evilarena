import React from "react";
import { Box, Center, Heading, Input, Button } from "@chakra-ui/react";
import { useLoginMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import { setToken, getToken } from "../../utils/token/token";
import { Error } from "../../component";

export const Login: React.FC = () => {
  const [form, setForm] = React.useState<any>({});
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleLogin = () => {
    if (!form || !form.username || !form.password) {
      setError("INVALID DATA !");
      return;
    }

    setLoading(true);
    login({
      variables: {
        username: form.username,
        password: form.password,
      },
    }).then((res) => {
      setLoading(false);
      if (res.data?.login.status && res.data.login.token) {
        setToken(res.data.login.token);
        navigate("/");
      }
      if (!res.data?.login.status) {
        setError(res.data?.login.message || "Something went wrong !");
      }
    });
  };
  return (
    <Center h={"100vh"}>
      <Box w={"400px"}>
        <Heading mb={"10px"}>Login</Heading>
        {error ? <Error txt={error} /> : null}
        {getToken()}
        <Input
          id={"username"}
          onChange={(e) => handleForm(e)}
          size={"md"}
          type={"text"}
          mb={"10px"}
          placeholder={"username"}
          variant={"filled"}
          disabled={loading}
        />
        <Input
          id={"password"}
          onChange={(e) => handleForm(e)}
          size={"md"}
          mb={"10px"}
          type={"password"}
          placeholder={"password"}
          variant={"filled"}
          disabled={loading}
        />
        <Button
          loadingText={"Loging.."}
          isLoading={loading}
          size={"md"}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Box>
    </Center>
  );
};
