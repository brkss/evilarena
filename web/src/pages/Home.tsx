import React from "react";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { ChannelThumbnail, CreateChannel } from "../component";

const channels = [
  {
    name: "Ch 00",
  },
  {
    name: "Ch 00",
  },
  {
    name: "Ch 00",
  },
  {
    name: "Ch 00",
  },
  {
    name: "Ch 00",
  },
  {
    name: "Ch 00",
  },
];

export const Home: React.FC = () => {
  const [doCreate, setDoCreate] = React.useState(false);

  return (
    <Box p={"20px"}>
      <Box>
        <Heading display={"inline-block"} mb={"30px"}>
          CHANNELS
        </Heading>
        <Button
          onClick={() => setDoCreate((curr) => !curr)}
          _hover={{background: '#434343'}}
          _focus={{ outline: 0 }}
          bg={"black"}
          color={"white"}
          rounded={0}
          mt={"-15px"}
          ml={"20px"}
          display={"inline-block"}
        >
          {doCreate ? "CANCEL" : "CREATE"}
        </Button>
      </Box>
      {doCreate && (
        <Box>
          <CreateChannel />
        </Box>
      )}
      <SimpleGrid spacing={4} columns={{ lg: 6, md: 4, sm: 2 }}>
        {channels.map((channel, key) => (
          <ChannelThumbnail key={key} name={channel.name} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
