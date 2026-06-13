import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Settings, FileText, Upload, Bell } from 'lucide-react';

// Define the icon type.
type IconType = React.ElementType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

// --- 📦 API (Props) Definition ---
export interface ActivityItem {
  /** A unique ID for the activity item. */
  id: string;
  /** The icon representing the type of activity. */
  icon: IconType;
  /** The main message describing the activity. */
  message: React.ReactNode;
  /** The timestamp or relative time of the activity (e.g., "2 hours ago", "Just now"). */
  timestamp: string;
  /** Optional color class for the icon (e.g., "text-green-500", "text-red-500"). */
  iconColorClass?: string;
}

export interface RecentActivityFeedProps {
  /** Array of activity items to display. */
  activities: ActivityItem[];
  /** Optional title for the activity feed card. */
  cardTitle?: string;
  /** Optional class name for the main card container. */
  className?: string;
}

/**
 * A professional, animated component for displaying a feed of recent activities in an admin dashboard.
 */
export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  activities,
  cardTitle = "Recent Activity",
  className,
}) => {
  // Framer Motion variants for individual list items
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } as any },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } as any },
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No recent activity to display.
          </div>
        ) : (
          <motion.div layout className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout 
                  className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors duration-200"
                >
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 p-1 rounded-full",
                    activity.iconColorClass || "text-muted-foreground bg-muted" 
                  )}>
                    <activity.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  
                  {/* Message and Timestamp */}
                  <div className="flex-grow flex flex-col">
                    <p className="text-sm font-medium text-foreground leading-tight">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
