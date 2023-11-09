import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../utils/getQueryClients";

export async function getListItem() {
  const res = await fetch("/api/home");
  const data = await res.json();
  return data
}

export default async function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["data-item"],
    queryFn: getListItem,
  });
  const dehydratedState = dehydrate(queryClient);
  

  return (
    <HydrationBoundary state={dehydratedState}>
      {children}
    </HydrationBoundary>
  );
}
