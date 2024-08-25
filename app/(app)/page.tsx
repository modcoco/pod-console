"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function IndexPage() {
  const { setTheme } = useTheme();
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch('/docs/example.md')
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg bg-background shadow border border-2 border-black">
        <Button onClick={() => setTheme("light")}>Light</Button>
        <Button onClick={() => setTheme("dark")}>Dark</Button>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}