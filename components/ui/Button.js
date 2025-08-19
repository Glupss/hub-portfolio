import { cn } from "@/lib/utils";

const variants = {
  gradient:
    "inline-flex items-center gap-3 rounded-full px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:scale-105 transform transition",
  outline:
    "inline-flex items-center gap-3 rounded-full px-5 py-3 ring-1 ring-white/10 hover:ring-white/20 transition",
};

export default function Button({
  children,
  href,
  variant = "gradient",
  className,
  ...props
}) {
  const Comp = href ? "a" : "button";

  return (
    <Comp href={href} className={cn(variants[variant], className)} {...props}>
      {children}
    </Comp>
  );
}
