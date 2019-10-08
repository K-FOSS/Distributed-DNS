// Web/Server/Head.tsx
import React from 'react';
import { Source, SourceType } from './Sources';
import { renderToStaticNodeStream } from 'react-dom/server';

interface HeadProps {
  sources: Source[];
}

const AppCSS = `#app {
  display: flex;
  flex-direction: column;
}
html, body, #app {
  height: 100%;
  width: 100%;
}`;

export function Head({ sources }: HeadProps): React.ReactElement {
  return (
    <>
      <meta charSet='utf-8' />

      <link rel='shortcut icon' href='/favicon.ico' />
      <title>Hello World</title>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      />
      <link rel='manifest' href='/manifest.webmanifest' />
      {sources &&
        sources.map(({ src, type }, index) => (
          <link rel='preload' href={src} as={type} key={index} />
        ))}
      {sources &&
        sources
          .filter(({ type }) => type === SourceType.STYLE)
          .map(({ src }, index) => (
            <link rel='stylesheet' type='text/css' href={src} key={index} />
          ))}

      <style dangerouslySetInnerHTML={{ __html: AppCSS }} />
    </>
  );
}

export function renderHeadStream(props: HeadProps): NodeJS.ReadableStream {
  return renderToStaticNodeStream(<Head {...props} />);
}
