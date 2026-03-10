"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

// 1. Create a Context to track state for Framer Motion's AnimatePresence
interface SheetContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SheetContext = React.createContext<SheetContextType>({
  open: false,
  setOpen: () => {},
});

const Sheet = ({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Root>) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) setInternalOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  };

  return (
    <SheetContext.Provider value={{ open, setOpen: handleOpenChange }}>
      <Dialog.Root open={open} onOpenChange={handleOpenChange} {...props}>
        {children}
      </Dialog.Root>
    </SheetContext.Provider>
  );
};

const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;

// 2. Framer Motion Animation Variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetSlideVariants = {
  top: { hidden: { y: "-100%" }, visible: { y: 0 } },
  bottom: { hidden: { y: "100%" }, visible: { y: 0 } },
  left: { hidden: { x: "-100%" }, visible: { x: 0 } },
  right: { hidden: { x: "100%" }, visible: { x: 0 } },
};

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay asChild forceMount ref={ref}>
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      transition={{ duration: 0.2 }}
      className={cn("fixed inset-0 z-[100] bg-black/80", className)}
      {...props}
    />
  </Dialog.Overlay>
));
SheetOverlay.displayName = Dialog.Overlay.displayName;

// 3. Cleaned up CVA (Removed Tailwind animation classes)
const sheetVariants = cva(
  "fixed z-[101] gap-4 bg-background p-6 shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof sheetVariants> {
  header?: React.ReactNode;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(({ side = "right", className, children, header, ...props }, ref) => {
  const { open } = React.useContext(SheetContext);

  return (
    <SheetPortal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <SheetOverlay />
            <Dialog.Content asChild forceMount ref={ref} {...props}>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sheetSlideVariants[side || "right"]}
                // 4. The Spring Physics! Tweaking damping/stiffness changes the bounce.
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(sheetVariants({ side }), className)}
              >
                {header && <div>{header}</div>}
                {children}
              </motion.div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </SheetPortal>
  );
});
SheetContent.displayName = Dialog.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = Dialog.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = Dialog.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};