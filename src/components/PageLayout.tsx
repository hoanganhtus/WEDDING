import { type ReactNode } from "react";
import AutoScrollContainer from "./AutoScrollContainer";
import Audio from "./Audio";
import jsonData from "../data/mau-2-initial.json";

interface PageLayoutProps {
  children: ReactNode;
  showAudio?: boolean;
  scrollDuration?: number;
}

export default function PageLayout({ 
  children, 
  showAudio = true,
  scrollDuration = 100000 
}: PageLayoutProps) {
  return (
    <div
      className="min-h-screen w-screen flex justify-center"
      style={{
        backgroundColor: "rgb(240, 242, 245)",
        height: "100vh",
      }}
    >
      <div
        className="relative w-full max-w-full md:max-w-md overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Nút phát nhạc nổi */}
        {showAudio && (
          <Audio
            src={jsonData.amThanh || "/mp3/bai-nay-khong-de-di-dien.mp3"}
            className="!absolute right-2 top-2 z-50 scale-70 !bottom-auto !right-2"
          />
        )}

        <AutoScrollContainer
          duration={scrollDuration}
          delay={500}
          className="[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400/60 [&::-webkit-scrollbar-thumb]:rounded-full w-full"
          style={{
            height: "100vh",
            margin: "auto",
            position: "relative",
            border: "1px solid rgb(224, 224, 224)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
            borderRadius: "3px",
            backgroundColor: "rgb(255, 255, 255)",
            overflow: "hidden auto",
            touchAction: "auto",
          }}
        >
          <div
            className="bg-primary font-sans"
            style={{
              overflowX: "hidden",
              position: "relative",
              userSelect: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              boxSizing: "border-box",
              width: "100%",
              minWidth: "50px",
              minHeight: "50px",
            }}
          >
            {children}
          </div>
        </AutoScrollContainer>
      </div>
    </div>
  );
}
