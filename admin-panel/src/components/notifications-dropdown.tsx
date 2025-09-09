import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
// Try to use existing Sheet component (if present in UI kit). If not, we'll render a simple fallback panel.
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  User, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Car,
  CreditCard,
  Star,
  Settings,
  FileText,
  X
} from 'lucide-react';

interface NotificationsDropdownProps {
  onSectionChange?: (section: string) => void;
}

export function NotificationsDropdown({ onSectionChange }: NotificationsDropdownProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New booking request',
      message: 'Marie Dubois requested a booking for tomorrow at 2:30 PM',
      type: 'booking',
      time: '2 minutes ago',
      unread: true,
      icon: Calendar,
      action: () => onSectionChange?.('bookings')
    },
    {
      id: 2,
      title: 'Customer message',
      message: 'James Wilson sent a message about his upcoming trip',
      type: 'message',
      time: '15 minutes ago',
      unread: true,
      icon: MessageSquare,
      action: () => onSectionChange?.('messages')
    },
    {
      id: 3,
      title: 'Driver status update',
      message: 'Philippe Martin marked his shift as completed',
      type: 'driver',
      time: '1 hour ago',
      unread: true,
      icon: User,
      action: () => onSectionChange?.('fleet')
    },
    {
      id: 4,
      title: 'System maintenance',
      message: 'Scheduled maintenance completed successfully',
      type: 'system',
      time: '2 hours ago',
      unread: false,
      icon: CheckCircle,
      action: () => onSectionChange?.('settings')
    },
    {
      id: 5,
      title: 'Payment received',
      message: 'Payment for booking BK001 has been processed',
      type: 'payment',
      time: '3 hours ago',
      unread: false,
      icon: CheckCircle,
      action: () => onSectionChange?.('bookings')
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-accent';
      case 'message': return 'text-blue-600';
      case 'driver': return 'text-primary';
      case 'system': return 'text-orange-600';
      case 'payment': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      {/* Keep popover for quick peek */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-accent/10 relative" onClick={() => setSheetOpen(true)}>
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-primary">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </div>
          </div>
          <ScrollArea className="h-80">
            <div className="p-2">
              {notifications.slice(0,5).map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg mb-1 cursor-pointer transition-colors hover:bg-secondary/50 ${
                      notification.unread ? 'bg-accent/5 border-l-2 border-l-accent' : ''
                    }`}
                    onClick={() => {
                      notification.action();
                      setSheetOpen(true);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-accent rounded-full mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={() => {
                setSheetOpen(true);
                onSectionChange?.('notifications');
              }}
            >
              View All Notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Slide-in Sheet for full notifications list */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          {/* hidden trigger - we open sheet programmatically */}
          <span style={{ display: 'none' }} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <SheetHeader className="p-4 border-b flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-72px)]">
            <div className="p-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg mb-3 cursor-pointer transition-colors hover:bg-secondary/50 flex gap-3 items-start ${
                      notification.unread ? 'bg-accent/5 border-l-2 border-l-accent' : ''
                    }`}
                    onClick={() => {
                      notification.action();
                      // optionally mark read in future
                    }}
                  >
                    <div className={`${getTypeColor(notification.type)} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full" onClick={() => setSheetOpen(false)}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}