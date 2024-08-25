"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import 'github-markdown-css/github-markdown.css';

function IndexPage() {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch('/docs/example.md')
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  return (
    <div className="container relative">
      <div className="overflow-hidden rounded-lg bg-background markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default IndexPage;