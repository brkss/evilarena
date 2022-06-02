import React from "react";
import { Box, Heading, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { CreateBlock, Block, Dropping, Loading } from "../component";
import { useDropzone } from "react-dropzone";
import { useChannelQuery } from "../generated/graphql";
import { Navigate, useParams } from "react-router-dom";

export const Channel: React.FC = () => {
  const params = useParams();
  console.log("param : ", params);
  const { data, loading, error } = useChannelQuery({
    variables: {
      cid: params.id || "no",
    },
  });
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();
  if (loading || error) return <Loading />;
  if (data && !data.channel && !loading && !error) return <Navigate to={"/"} />;
  return (
    //<Box p={10} {...getRootProps()}>
    <Box p={10}>
      <input {...getInputProps()} />
      <Heading fontWeight={"bold"} mb={"30px"}>
        {data?.channel?.name}
      </Heading>
      <SimpleGrid spacing={4} columns={{ lg: 6, md: 4, sm: 2 }}>
        <CreateBlock />
        {[
          {
            title: "BLOCK 1",
            image:
              "https://d2w9rnfcy7mm78.cloudfront.net/2976457/original_ab7026bef58626224f42609ea613099e.png?1541194819?bc=1",
          },
        ].map((block, key) => (
          <Block key={key} img={block.image} />
        ))}
      </SimpleGrid>
      {(isDragActive || acceptedFiles.length > 0) && (
        <Dropping files={acceptedFiles} />
      )}
    </Box>
  );
};
