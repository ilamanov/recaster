import { cva } from "class-variance-authority";

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "",
      bright: "text-bright hover:text-bright-hovered hover:cursor-pointer",
      ghost: "text-ghost hover:text-ghost-hovered hover:cursor-pointer",
      active: "text-active hover:text-active-hovered hover:cursor-pointer",
      destructive:
        "text-destructive hover:text-destructive-hovered hover:cursor-pointer",
    },
    size: {
      default: "",
      micro: "h-2 w-2 md:h-3 md:w-3",
      tiny: "h-3 w-3 md:h-4 md:w-4",
      xs: "h-4 w-4 md:h-5 md:w-5",
      sm: "h-5 w-5 md:h-6 md:w-6",
      md: "h-7 w-7 md:h-8 md:w-8 stroke-[1.5]",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export { iconVariants };
