import React from "react";
import { useDocumentInfo } from "payload/components/utilities";
import { useField } from "payload/components/forms";

export const PreviewButton: React.FC = () => {
  const { id } = useDocumentInfo();
  const { value: slug } = useField<string>({ path: "slug" });

  if (!id || !slug) {
    return null;
  }

  const siteURL =
    process.env.PAYLOAD_PUBLIC_SITE_URL || "http://localhost:3000";
  const previewSecret = process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET;

  const previewURL = `${siteURL}/api/preview?secret=${previewSecret}&slug=${slug}`;

  return (
    <a href={previewURL} target="_blank" rel="noopener noreferrer">
      Open Live Preview
    </a>
  );
};
