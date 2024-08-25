"use client";

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function IndexPage() {
  const { setTheme } = useTheme();
  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg bg-background shadow border border-2 border-black">
        <Button onClick={() => setTheme("light")}>light</Button>
        <Button onClick={() => setTheme("dark")}>dark</Button>
        test
        <h1>lowordfhasdhfh</h1>
        <div>Hellowordfhasdhfhasdhfhdhfhhdhdhdhdhdhdhdhdhhdhdhdhdhhdfagkashiegjn</div>
      </div>
    </div>
  )
}
