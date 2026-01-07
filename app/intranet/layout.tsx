import { IntranetHeader } from '@/components/layout/IntranetHeader';
import { IntranetFooter } from '@/components/layout/IntranetFooter';
import { AuthGuard } from '@/components/intranet/AuthGuard';
import React from "react";

export default function IntranetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <IntranetHeader />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthGuard>
          {children}
        </AuthGuard>
      </main>
      <IntranetFooter />
    </div>
  );
}

