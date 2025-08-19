import { cn } from "@/lib/utils";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "rounded-xl bg-white/5 px-4 py-2 ring-1 ring-white/6 placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all",
        className
      )}
      {...props}
    />
  );
}
