import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type AgentTerminalProps = {
  agentName: string;
  missionContext: string;
  workType: string;
  liveOutput?: string;
  isStreaming?: boolean;
  streamContent?: string;
  onStreamComplete?: () => void;
  className?: string;
};

const defaultLiveOutput = `Subject: Re: Institutional Growth Strategy

Dear Partner,

Our automated workforce at Nexus AI has completed the analysis of your
current operational bottlenecks. Based on the mission directives...`;

export const AgentTerminal = ({
  agentName,
  missionContext,
  workType,
  liveOutput = defaultLiveOutput,
  isStreaming = false,
  streamContent = "",
  onStreamComplete,
  className,
}: AgentTerminalProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Handle streaming animation
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(liveOutput);
      setShowCursor(false);
      return;
    }

    setShowCursor(true);
    setDisplayedText(streamContent);

    // Auto-scroll to bottom
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [streamContent, isStreaming, liveOutput]);

  // Handle cursor blinking when streaming is complete
  useEffect(() => {
    if (!isStreaming && showCursor) {
      const timer = setTimeout(() => {
        setShowCursor(false);
        onStreamComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, showCursor, onStreamComplete]);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border-2 border-[#00d4ff] bg-black p-8 font-mono text-[#00d4ff] shadow-[0_0_20px_#00d4ff]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <div className="mb-4 flex items-center justify-between border-b border-[#00d4ff] pb-2">
        <span className="animate-pulse">● STATUS: ACTIVE</span>
        <span>DEPLOYED AGENT: {agentName}</span>
        <span>PRIORITY: ALPHA</span>
      </div>

      <div className="space-y-4">
        <p className="text-gray-400">{">"} INITIALIZING CORE DIRECTIVES FROM COMMAND CENTER...</p>
        <p className="text-gray-400">{">"} LOADING MISSION: "{missionContext}"</p>
        <p className="text-[#00ff41]">
          {">"} {isStreaming ? "EXECUTING" : "STARTING"} {workType}...
          {isStreaming && <span className="ml-2 animate-pulse">●</span>}
        </p>

        <div 
          ref={outputRef}
          className="mt-6 min-h-[200px] max-h-[500px] overflow-y-auto whitespace-pre-wrap border border-[#00d4ff]/30 bg-[#00d4ff]/5 p-4 relative"
        >
          {displayedText}
          {showCursor && (
            <span className="inline-block w-2 h-4 bg-[#00d4ff] animate-pulse ml-1" />
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between text-xs opacity-50">
        <span>ENCRYPTION: AES-256</span>
        <span>SYSTEM: NEXUS-OS_V1.0</span>
      </div>
    </div>
  );
};

export default AgentTerminal;