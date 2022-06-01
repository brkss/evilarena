import React from "react";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { Block } from "../component";

const data = [
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
  {
    title: "BLOCK 1",
    image:
      "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
  },
];

export const Channel: React.FC = () => {
  return (
    <Box p={10}>
      <Heading fontWeight={"bold"} mb={"30px"}>
        CHANNEL NAME
      </Heading>
      <Grid gap={4} templateColumns="repeat(6, 1fr)">
        {data.map((block, key) => (
          <GridItem gap={4} key={key} colSpan={{ default: 3, md: 1 }}>
            <Block img={block.image} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
