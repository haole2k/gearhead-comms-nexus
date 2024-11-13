import React from 'react';
import { UserRound } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PrivateMessageProps {
  message: string;
  sender: string;
  timestamp: Date;
  isOwn?: boolean;
}

const PrivateMessage: React.FC<PrivateMessageProps> = ({
  message,
  sender,
  timestamp,
  isOwn = false
}) => {
  return (
    <div className={cn(
      "flex items-start space-x-2 mb-4",
      isOwn && "flex-row-reverse space-x-reverse"
    )}>
      <div className="w-8 h-8 rounded-full bg-racing-gray bg-opacity-10 flex items-center justify-center flex-shrink-0">
        <UserRound className="w-5 h-5" />
      </div>
      <div className={cn(
        "max-w-[70%] rounded-lg p-3",
        isOwn ? "bg-racing-green bg-opacity-20" : "bg-racing-gray bg-opacity-10"
      )}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">{sender}</span>
          <span className="text-xs opacity-75">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default PrivateMessage;