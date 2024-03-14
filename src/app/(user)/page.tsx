import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import * as React from "react";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log("session:", session);

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: { category: "CHILL", limit: 10 },
  });
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: { category: "WORKOUT", limit: 10 },
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: { category: "PARTY", limit: 10 },
  });

  return (
    <Container>
      <MainSlider data={chills?.data ?? []} title="Top Chills"></MainSlider>
      <MainSlider data={workouts?.data ?? []} title="Top Workouts"></MainSlider>
      <MainSlider data={party?.data ?? []} title="Top Party"></MainSlider>
    </Container>
  );
}
