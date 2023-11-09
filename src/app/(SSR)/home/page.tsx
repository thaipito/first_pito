"use client";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/legacy/image";
import { getListItem } from "./layout";
import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material";

export default function HomePage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["data-item"],
    queryFn: getListItem,
  });

  if (isLoading) return <p>Loading...</p>;

  // const cachedData = queryClient.getQueryData(['data-item']);

  // const callApiSimulated = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const res = { data };
  //       resolve(res);
  //     }, 3000);
  //   });
  // };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" className="text-center pb-3">
        Danh sách hình ảnh
      </Typography>
      <ImageList cols={3} rowHeight={164}>
        {data.map((item: any) => (
          <Card key={item.img} className="cursor-pointer hover:bg-red-200">
            <CardMedia>
              <ImageListItem>
                <Image src={item.img} alt={item.title} layout="fill" priority />
              </ImageListItem>
            </CardMedia>
            <CardContent className="text-center">
              <Typography variant="caption">{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
}
