"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

type Url = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};
const UrlList = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<string>("");
  const shortenUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;
  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
    } catch (err) {
      console.error("error fetching urls", err);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = shortenUrl(code);
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(code);
      setTimeout(() => {
        setCopied("");
      }, 3000);
    });
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>

      <ul className="space-y-2">
        {urls?.map((url: Url) => (
          <li key={url.id} className="flex justify-between item-center gap-2">
            <Link
              href={`/${url.shortCode}`}
              target="_blank"
              className="text-blue-500"
            >
              {shortenUrl(url.shortCode)}
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted"
                onClick={() => handleCopyUrl(url.shortCode)}
              >
                {copied == url.shortCode ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}

                <span className="sr-only">Copy URL</span>
              </Button>
              <span className="flex items-center gap-2">
                <EyeIcon className="h-4 w-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
