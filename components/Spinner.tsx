import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  width: number;
  height: number;
};

const Spinner = ({ width, height }: Props) => {
  return (
    <div role="status" className="animate-spin">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 47 48`}
        fill="#F6951B"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.9 0.877975L17.9 4.67796C19.4 6.07796 20.2 7.97797 20.2 10.078C20.2 12.078 21 13.978 22.4 15.378L22.9 15.878L27.5 0.977966"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M0.300003 14.178L5.8 13.978C7.8 13.878 9.8 14.678 11.2 16.078C12.6 17.478 14.5 18.178 16.5 18.178H17.2L9.8 4.47797"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M0.300003 33.178L4 29.178C5.4 27.678 7.3 26.778 9.3 26.778C11.3 26.778 13.1 25.878 14.5 24.478L15 23.978L0 19.678"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M13.9 46.378L13.6 40.878C13.5 38.878 14.2 36.878 15.6 35.378C16.9 33.978 17.7 31.978 17.6 30.078V29.378L4 37.078"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M32.9 45.978L28.8 42.378C27.3 41.078 26.4 39.178 26.3 37.078C26.2 35.078 25.3 33.278 23.9 31.878L23.4 31.378L19.4 46.478"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M45.9 32.078L40.4 32.478C38.4 32.678 36.4 31.978 34.9 30.578C33.4 29.278 31.5 28.578 29.5 28.678H28.8L36.8 42.078"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M45 13.178L41.5 17.378C40.2 18.878 38.3 19.878 36.3 19.978C34.3 20.078 32.5 20.978 31.2 22.478L30.8 22.978L46 26.578"
          fill="hsl(var(--muted-foreground))"
        />
        <path
          d="M30.9 0.477966L31.4 5.97797C31.6 7.97797 31 9.97797 29.6 11.578C28.3 13.078 27.7 14.978 27.8 16.978L27.9 17.678L41.1 9.37798"
          fill="hsl(var(--muted-foreground))"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
