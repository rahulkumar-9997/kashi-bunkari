import React from "react";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type DecoratorStyle =
  | "underline-pink"
  | "underline-gold"
  | "underline-dark"
  | "line-left"
  | "line-left-pink"
  | "dots"
  | "dash-center"
  | "none";

interface HeadingProps {
  level?: HeadingLevel;
  children?: React.ReactNode;
  className?: string;
  text?: string;
  styles?: React.CSSProperties;
  allowHTML?: boolean;
  decorator?: DecoratorStyle;
  decoratorClassName?: string;
  [key: string]: any;
}

const headingClasses: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl font-bold",
  2: "text-3xl md:text-4xl font-bold",
  3: "text-2xl md:text-3xl font-semibold",
  4: "text-2xl md:text-2xl font-semibold",
  5: "lg:text-[21px] text-[18px] font-medium",
  6: "text-base md:text-[16px] font-medium",
};

function Decorator({
  type,
  className = "",
}: {
  type: DecoratorStyle;
  className?: string;
}) {
  if (!type || type === "none") return null;

  switch (type) {
    case "underline-pink":
      return (
        <span
          className={`block mt-2 h-0.75 w-12 rounded-full ${className}`}
          style={{ background: "linear-gradient(90deg, #ec4899, #f9a8d4)" }}
        />
      );
    case "underline-gold":
      return (
        <span
          className={`block mt-2 h-0.75 w-12 rounded-full ${className}`}
          style={{ background: "linear-gradient(90deg, #d97706, #fcd34d)" }}
        />
      );
    case "underline-dark":
      return (
        <span
          className={`block mt-2 h-0.75 w-12 rounded-full bg-gray-800 ${className}`}
        />
      );
    case "line-left":
      return (
        <span
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gray-800 ${className}`}
        />
      );
    case "line-left-pink":
      return (
        <span
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${className}`}
          style={{ background: "linear-gradient(180deg, #ec4899, #f9a8d4)" }}
        />
      );
    case "dots":
      return (
        <span className={`flex items-center gap-1 mt-2.5 ${className}`}>
          <span
            className="rounded-full"
            style={{
              width: 18,
              height: 4,
              background: "linear-gradient(90deg,#ec4899,#f9a8d4)",
            }}
          />
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="w-1 h-1 rounded-full bg-gray-200" />
        </span>
      );
    case "dash-center":
      return (
        <span className={`flex justify-center mt-2.5 ${className}`}>
          <span
            className="h-0.75 w-10 rounded-full"
            style={{ background: "linear-gradient(90deg,#ec4899,#f9a8d4)" }}
          />
        </span>
      );
    default:
      return null;
  }
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className = "",
  text = "",
  styles = {},
  allowHTML = false,
  decorator = "none",
  decoratorClassName = "",
  ...props
}) => {
  const HeadingTag = `h${level}` as React.ElementType;
  const needsRelative =
decorator === "line-left" || decorator === "line-left-pink";
const hasCustomTextSize =
    /\btext-\[.+?\]|\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/.test(
      className,
    );
  const defaultClasses = headingClasses[level] || headingClasses[2];
  const baseClasses = hasCustomTextSize
    ? defaultClasses.replace(/\btext-\S+/g, "").trim()
    : defaultClasses;

  const combinedClassName = [
    baseClasses,
    needsRelative ? "relative pl-4" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const parseSimpleHTML = (htmlString: string): React.ReactNode => {
    if (!htmlString || typeof htmlString !== "string") return null;
    const normalized = htmlString.trim();
    const parts: React.ReactNode[] = [];
    let remaining = normalized;
    while (remaining.length > 0) {
      const brMatch = remaining.match(/^<br\s*\/?>/i);
      if (brMatch) {
        parts.push(<br key={parts.length} />);
        remaining = remaining.slice(brMatch[0].length);
        continue;
      }
      const tagMatch = remaining.match(
        /^<([a-zA-Z][a-zA-Z0-9]*)((?:[^>]|"[^"]*"|'[^']*')*?)>([\s\S]*?)<\/\1>/,
      );
      if (tagMatch) {
        const tagName = tagMatch[1];
        const rawAttrs = tagMatch[2] || "";
        const innerText = tagMatch[3] || "";
        const attrProps: Record<string, any> = {};
        const styleMatch = rawAttrs.match(/style\s*=\s*["']([\s\S]*?)["']/);
        if (styleMatch) {
          const styleStr = styleMatch[1].replace(/\n\s*/g, " ").trim();
          const styleObj: Record<string, string> = {};
          styleStr.split(";").forEach((rule) => {
            const colonIdx = rule.indexOf(":");
            if (colonIdx === -1) return;
            const prop = rule.slice(0, colonIdx).trim();
            const val = rule.slice(colonIdx + 1).trim();
            if (!prop || !val) return;
            const camelProp = prop.replace(/-([a-zA-Z])/g, (_, c) =>
              c.toUpperCase(),
            );
            styleObj[camelProp] = val;
          });
          attrProps.style = styleObj;
        }
        const classMatch = rawAttrs.match(/class\s*=\s*["']([^"']*)["']/);
        if (classMatch) attrProps.className = classMatch[1];
        const stripped = rawAttrs
          .replace(/style\s*=\s*["'][\s\S]*?["']/, "")
          .replace(/class\s*=\s*["'][^"']*["']/, "");
        const simpleAttrRx = /([a-zA-Z-]+)\s*=\s*["']([^"']*)["']/g;
        let am: RegExpExecArray | null;
        while ((am = simpleAttrRx.exec(stripped)) !== null) {
          attrProps[am[1]] = am[2];
        }
        const innerNode = parseSimpleHTML(innerText);
        parts.push(
          React.createElement(
            tagName,
            { key: parts.length, ...attrProps },
            innerNode,
          ),
        );
        remaining = remaining.slice(tagMatch[0].length);
        continue;
      }
      const nextTag = remaining.indexOf("<");
      if (nextTag === -1) {
        const t = remaining;
        if (t.trim())
          parts.push(<React.Fragment key={parts.length}>{t}</React.Fragment>);
        remaining = "";
      } else {
        const t = remaining.slice(0, nextTag);
        if (t.trim())
          parts.push(<React.Fragment key={parts.length}>{t}</React.Fragment>);
        remaining = remaining.slice(nextTag);
      }
    }

    return parts.length > 0 ? parts : normalized;
  };

  const renderTextWithBreaks = (content: string): React.ReactNode => {
    return content.split(/(<br\s*\/?>)/gi).map((part, index) =>
      part.match(/<br\s*\/?>/i) ? (
        <React.Fragment key={index}>
          <br />
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      ),
    );
  };

  const renderContent = (): React.ReactNode => {
    if (text && allowHTML) return parseSimpleHTML(text);
    if (text && !allowHTML) return renderTextWithBreaks(text);
    return children;
  };

  const { dangerouslySetInnerHTML, ...restProps } = props;

  return (
    <>
      <HeadingTag className={combinedClassName} style={styles} {...restProps}>
        {renderContent()}
      </HeadingTag>
      <Decorator type={decorator} className={decoratorClassName} />
    </>
  );
};

export default Heading;
