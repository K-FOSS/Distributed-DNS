// Web/Server/Sources.tsx
import React from 'react';
import { renderToStaticNodeStream } from 'react-dom/server';

export enum SourceType {
  SCRIPT = 'script',
  STYLE = 'style',
}

export interface Source {
  type: SourceType;
  src: string;
  preloadOnly?: boolean;
}

interface ScriptTagsProps {
  sources: Source[];
}

export function ScriptTags({ sources }: ScriptTagsProps): React.ReactElement {
  return (
    <>
      {sources
        .filter(
          ({ type, preloadOnly }) => type === SourceType.SCRIPT && !preloadOnly,
        )
        .reverse()
        .map(({ src }, index) => (
          <script
            async
            type='text/javascript'
            charSet='utf-8'
            key={index}
            src={src}
          />
        ))}
      <script type='text/javascript' charSet='utf-8' src={'/Client.js'} />
    </>
  );
}

export function renderScriptTags(
  props: ScriptTagsProps,
): NodeJS.ReadableStream {
  return renderToStaticNodeStream(<ScriptTags {...props} />);
}
