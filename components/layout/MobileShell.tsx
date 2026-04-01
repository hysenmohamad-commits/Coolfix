"use client";

import React from 'react';
import { MobileHeader } from './MobileHeader';
import { BottomNav } from './BottomNav';

export function MobileShell() {
  return (
    <>
      <MobileHeader />
      <BottomNav />
    </>
  );
}
