import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function HtmlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.23,3.21l1.52,17.29l8.25,2.29l8.25-2.29l1.52-17.29H2.23z M18.42,16.89l-6.42,1.78l-6.42-1.79l-0.42-4.78h3.33l0.21,2.37l3.3,0.91l3.3-0.91l0.34-3.87h-7.14l-0.24-2.82h7.62l0.3-3.41H5.4l-0.45-5.02h14.1l-0.73,8.22H18.42z"></path>
    </svg>
  );
}
