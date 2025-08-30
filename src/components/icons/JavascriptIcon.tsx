import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function JavascriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22,4H2v16h20V4z M14.35,16.5h-2.19l-1.03-2.15l-1.3,2.15H7.65l2.44-3.88l-2.31-3.62h2.19l0.91,1.93l1.17-1.93h2.18l-2.3,3.74L14.35,16.5z"></path>
    </svg>
  );
}
