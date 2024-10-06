import React from "react";
import { useDocumentInfo } from "payload/components/utilities";
import { useField } from "payload/components/forms";

export const PreviewButton: React.FC = () => {
  const { id, collection, global } = useDocumentInfo();
  const { value: slug } = useField<string>({ path: "slug" });

  const siteURL =
    process.env.PAYLOAD_PUBLIC_SITE_URL || "http://localhost:3000";
  const previewSecret = process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET;

  let previewURL: string | null = null;

  if (global && global.slug === "landing-page") {
    previewURL = `${siteURL}/api/preview?secret=${previewSecret}&global=landing-page`;
  } else if (collection && collection.slug === "pages" && slug) {
    previewURL = `${siteURL}/api/preview?secret=${previewSecret}&slug=${slug}`;
  }

  if (!previewURL) {
    return null; // No preview available
  }

  return (
    <a href={previewURL} target="_blank" rel="noopener noreferrer">
      Open Live Preview
    </a>
  );
};
