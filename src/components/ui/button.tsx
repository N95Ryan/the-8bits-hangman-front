import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium border-2 shadow-[3px_3px_0px_rgba(0,0,0,0.8)] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.8)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-1",
  {
    variants: {
      variant: {
        default: "bg-cyan-400 text-black border-black hover:bg-cyan-500",
        primary: "bg-green-400 text-black border-black hover:bg-green-500",
        destructive: "bg-pink-500 text-white border-black hover:bg-pink-600",
        outline: "border-black bg-transparent hover:bg-gray-800",
        secondary: "bg-yellow-400 text-black border-black hover:bg-yellow-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10 p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
