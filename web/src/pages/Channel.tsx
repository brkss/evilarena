import React from "react";
import { Box, Heading, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Block, Dropping } from "../component";
import { useDropzone } from "react-dropzone";

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
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();
  const files = acceptedFiles.map((file, key) => (
    <li key={key}>
      {file.name} - {file.size} bytes
    </li>
  ));
  return (
    <Box p={10} {...getRootProps()}>
      <input {...getInputProps()} />
      <Heading fontWeight={"bold"} mb={"30px"}>
        CHANNEL NAME
      </Heading>
      <ul>{files}</ul>
      <SimpleGrid spacing={4} columns={{ lg: 6, md: 4, sm: 2 }}>
        {data.map((block, key) => (
          <Block key={key} img={block.image} />
        ))}
      </SimpleGrid>
      {isDragActive && <Dropping />}
    </Box>
  );
};
