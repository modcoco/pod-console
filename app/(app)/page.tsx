"use client";

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function IndexPage() {
  const { setTheme } = useTheme();
  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-background">
        <Button onClick={() => setTheme("light")}>light</Button>
        <Button onClick={() => setTheme("dark")}>dark</Button>
        Helloword
      </div>
    </div>
  )
}
