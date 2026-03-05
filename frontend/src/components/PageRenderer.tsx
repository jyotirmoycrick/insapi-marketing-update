import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface ComponentItem {
  id: string;
  type: string;
  props: any;
  styles?: React.CSSProperties;
  order?: number;
}

interface PageData {
  page_id: string;
  page_name: string;
  route: string;
  components: ComponentItem[];
  meta?: {
    title?: string;
    description?: string;
  };
  is_published: boolean;
}

interface PageRendererProps {
  pageId?: string;
  isPreview?: boolean;
}

export function PageRenderer({ pageId, isPreview = false }: PageRendererProps) {

  const { slug } = useParams();

  const finalPageId = pageId || slug;

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!finalPageId) return;
    loadPage();
  }, [finalPageId]);

  const loadPage = async () => {
    try {

      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/pages/${finalPageId}`);

      if (!res.ok) throw new Error("Page not found");

      const data = await res.json();

      if (!isPreview && !data.is_published) {
        throw new Error("Page not found");
      }

      setPageData(data);

      if (data.meta?.title) {
        document.title = data.meta.title;
      }

    } catch (err: any) {

      console.error(err);
      setError(err.message || "Failed to load page");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading page...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!pageData || !pageData.components || pageData.components.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>This page has no content.</p>
      </div>
    );
  }

  const sortedComponents = [...pageData.components].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div className="page-renderer">

      {sortedComponents.map((component) => {

        /* Heading */

        if (component.type === "heading") {
          const Tag: any = component.props.tag || "h2";

          return (
            <Tag key={component.id} style={component.styles}>
              {component.props.content}
            </Tag>
          );
        }

        /* Text */

        if (component.type === "text") {
          return (
            <p key={component.id} style={component.styles}>
              {component.props.content}
            </p>
          );
        }

        /* Button */

        if (component.type === "button") {
          return (
            <a key={component.id} href={component.props.link}>
              <button style={component.styles}>
                {component.props.text}
              </button>
            </a>
          );
        }

        /* Image */

        if (component.type === "image") {
          return (
            <img
              key={component.id}
              src={component.props.src}
              alt={component.props.alt}
              style={component.styles}
            />
          );
        }

        return null;
      })}
    </div>
  );
}