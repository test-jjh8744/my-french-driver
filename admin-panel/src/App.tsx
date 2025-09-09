import React, { useState } from 'react';
import { AdminSidebar } from './components/admin-sidebar';
import { DashboardOverview } from './components/dashboard-overview';
import { BookingsManagement } from './components/bookings-management';
import { CustomersDatabase } from './components/customers-database';
import { FleetManagement } from './components/fleet-management';
import { MessagesManagement } from './components/messages-management';
import { NotificationsManagement } from './components/notifications-management';
import { ReportsAnalytics } from './components/reports-analytics';
import { ProfileManagement } from './components/profile-management';
import { SystemSettings } from './components/system-settings';
import { NotificationsDropdown } from './components/notifications-dropdown';
import { SearchModal } from './components/search-modal';
import { Button } from './components/ui/button';
import { User } from 'lucide-react';
import { PaymentsInvoices } from './components/payments-invoices';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard Overview',
      bookings: 'Booking Management',
      customers: 'Customer Database',
      fleet: 'Fleet & Driver Management',
      messages: 'Customer Messages',
      notifications: 'Notification Center',
      reports: 'Analytics & Reports',
      profile: 'Profile Management',
      settings: 'System Settings',
      payments: 'Payments & Invoices'
    };
    return titles[section] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingsManagement />;
      case 'customers':
        return <CustomersDatabase />;
      case 'fleet':
        return <FleetManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'notifications':
        return <NotificationsManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'profile':
        return <ProfileManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'payments':
        return <PaymentsInvoices />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-primary">{getSectionTitle(activeSection)}</h1>
              <p className="text-muted-foreground">Manage your French driver service with ease</p>
            </div>
            
            <div className="flex items-center gap-4">
              <SearchModal />
              
              <NotificationsDropdown onSectionChange={setActiveSection} />
              
              <div 
                className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer hover:bg-secondary/50 rounded-lg p-2 transition-colors"
                onClick={() => setActiveSection('profile')}
              >
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-primary">Jean-Pierre</p>
                  <p className="text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}