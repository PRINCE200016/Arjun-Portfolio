import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function CssIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.4,3.28l1.75,17.23l7.85,2.28l7.85-2.28l1.75-17.23H2.4z M17.43,16.89l-5.43,1.52l-5.43-1.52l-0.37-4.13h2.64l0.19,2.11l2.97,0.82l2.97-0.82l0.29-3.53H7.74l-0.23-2.6h8.21l0.28-3.18H5.66l-0.25-2.79h13.18l-0.78,8.74H17.43z"></path>
    </svg>
  );
}
