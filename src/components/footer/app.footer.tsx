"use client";
import { useTrackContext } from "@/lib/track.warpper";
import { useHasMounted } from "@/utils/customHook";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Link from "next/link";
import { useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const playerRef = useRef(null);
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  useEffect(() => {
    if (currentTrack?.isPlaying === false) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.pause();
    }
    if (currentTrack?.isPlaying === true) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.play();
    }
  }, [currentTrack]);

  if (!hasMounted) return <></>; //fragment

  return (
    <>
      {currentTrack._id && (
        <div style={{ marginTop: 50 }}>
          <AppBar
            position="fixed"
            sx={{
              top: "auto",
              bottom: 0,
              background: "#f2f2f2",
            }}
          >
            <Container
              sx={{
                display: "flex",
                gap: 10,
                ".rhap_main": {
                  gap: "30px",
                },
              }}
            >
              <AudioPlayer
                showJumpControls={false}
                ref={playerRef}
                layout="horizontal-reverse"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                volume={0.5}
                style={{
                  boxShadow: "unset",
                  background: "#f2f2f2",
                }}
                onPlay={() => {
                  setCurrentTrack({ ...currentTrack, isPlaying: true });
                }}
                onPause={() => {
                  setCurrentTrack({ ...currentTrack, isPlaying: false });
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  minWidth: 100,
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "unset" }}
                  href={`/track/${currentTrack._id}/?audio=${currentTrack.trackUrl}&id=${currentTrack._id}`}
                >
                  <div style={{ color: "#ccc" }}>
                    {currentTrack.description}
                  </div>
                  <div style={{ color: "black" }}>{currentTrack.title}</div>
                </Link>
              </div>
            </Container>
          </AppBar>
        </div>
      )}
    </>
  );
};

export default AppFooter;
