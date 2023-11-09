"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/legacy/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export async function getDetailItem(id: number) {
  const res = await fetch(`/api/home/${id}`);
  const data = await res.json();
  return data;
}

const ImageItemPage = () => {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-item", id],
    queryFn: () => getDetailItem(Number(id)),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm">
      <Card className="cursor-pointer hover:bg-red-200 mt-20" >
        <CardMedia
          sx={{ height: 140 }}
          image={data.dataItem.img}
          title={data.dataItem.title}
        />
        <CardContent className="text-center">
          <Typography variant="caption">{data.dataItem.title}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ImageItemPage;
