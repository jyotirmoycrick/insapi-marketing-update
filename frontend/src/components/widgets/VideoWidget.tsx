import React, { CSSProperties } from 'react';

interface VideoWidgetProps {
  content: {
    url: string;
    provider: 'youtube' | 'vimeo' | 'self-hosted';
    autoplay: boolean;
    muted: boolean;
    controls: boolean;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function VideoWidget({ content, styles, settings, isPreview }: VideoWidgetProps) {
  const containerStyles: CSSProperties = {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    ...styles,
  };

  const getEmbedUrl = () => {
    const url = content.url || '';
    
    if (content.provider === 'youtube') {
      // Extract video ID from various YouTube URL formats
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)?.[1];
      if (videoId) {
        const params = [];
        if (content.autoplay) params.push('autoplay=1');
        if (content.muted) params.push('mute=1');
        if (!content.controls) params.push('controls=0');
        return `https://www.youtube.com/embed/${videoId}${params.length ? '?' + params.join('&') : ''}`;
      }
    } else if (content.provider === 'vimeo') {
      // Extract video ID from Vimeo URL
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      if (videoId) {
        const params = [];
        if (content.autoplay) params.push('autoplay=1');
        if (content.muted) params.push('muted=1');
        return `https://player.vimeo.com/video/${videoId}${params.length ? '?' + params.join('&') : ''}`;
      }
    }
    
    return url;
  };

  const embedUrl = getEmbedUrl();

  if (!embedUrl) {
    return (
      <div className="p-8 text-center bg-gray-100 rounded">
        <div className="text-4xl mb-2">🎥</div>
        <p className="text-gray-600">Add video URL</p>
      </div>
    );
  }

  if (content.provider === 'self-hosted') {
    return (
      <div style={containerStyles} className="widget-video">
        <video
          src={embedUrl}
          controls={content.controls}
          autoPlay={content.autoplay}
          muted={content.muted}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div style={containerStyles} className="widget-video">
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
