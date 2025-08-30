import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="-11.5 -10.23174 23 20.46348">
      <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"></ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
      </g>
    </svg>
  );
}
