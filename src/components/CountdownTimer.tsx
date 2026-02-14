import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string | Date;
  onComplete?: () => void;
  compact?: boolean;
}

export function CountdownTimer({ targetDate, onComplete, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        if (onComplete) {
          onComplete();
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (timeLeft.expired) {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Lock-in period expired</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-nexus-cyan">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-nexus-gray">
        <Clock className="w-5 h-5" />
        <span className="text-sm font-medium">Time until you can fire this employee:</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center p-3 bg-nexus-card rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-nexus-cyan">{timeLeft.days}</div>
          <div className="text-xs text-nexus-gray">Days</div>
        </div>
        <div className="flex flex-col items-center p-3 bg-nexus-card rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-nexus-cyan">{timeLeft.hours}</div>
          <div className="text-xs text-nexus-gray">Hours</div>
        </div>
        <div className="flex flex-col items-center p-3 bg-nexus-card rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-nexus-cyan">{timeLeft.minutes}</div>
          <div className="text-xs text-nexus-gray">Minutes</div>
        </div>
        <div className="flex flex-col items-center p-3 bg-nexus-card rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-nexus-cyan">{timeLeft.seconds}</div>
          <div className="text-xs text-nexus-gray">Seconds</div>
        </div>
      </div>
    </div>
  );
}
