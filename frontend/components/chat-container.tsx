import React from 'react';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

interface ChatContainerProps {
  children: React.ReactNode;
  activeModule?: string;
}

export function ChatContainer({ children, activeModule }: ChatContainerProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar activeModule={activeModule} />
        <main className="flex-1 ml-[70px] pt-16">
          <div className="container px-4 py-6 max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}