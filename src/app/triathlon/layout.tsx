import React from 'react';

export default function TriathlonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <header className="">
        <h1 className="">Triathlon Information</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
