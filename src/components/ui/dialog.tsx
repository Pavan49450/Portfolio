"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { IoMdClose } from "react-icons/io";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/* ─────────────────────────────────────────
   Overlay
───────────────────────────────────────── */
type DialogOverlayRef = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;

const DialogOverlay = React.forwardRef<DialogOverlayRef, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-[999]",
        "bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "transition-all duration-300",
        className,
      )}
      {...props}
    />
  ),
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* ─────────────────────────────────────────
   Content
───────────────────────────────────────── */
type DialogContentRef = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  header?: React.ReactNode;
  hideClose?: boolean;
};

const DialogContent = React.forwardRef<DialogContentRef, DialogContentProps>(
  ({ className, children, header, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg max-h-[90vh]",
          "flex flex-col",
          "bg-background border border-border/60",
          "rounded-2xl shadow-2xl shadow-black/20",
          "overflow-hidden",
          "duration-300",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className,
        )}
        {...props}
      >
        {header && (
          <div className="shrink-0 border-b border-border/50 bg-muted/30 px-6 py-4">
            {header}
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-5">
          {children}
        </div>

        {/* {!hideClose && (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 z-10",
              "rounded-lg p-1.5",
              "text-muted-foreground",
              "bg-muted/60 hover:bg-muted",
              "border border-border/40 hover:border-border",
              "transition-all duration-200",
              "hover:text-foreground hover:scale-105 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:pointer-events-none"
            )}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )} */}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

/* ─────────────────────────────────────────
   Header
───────────────────────────────────────── */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "shrink-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3",
      "border-t border-border/50 bg-muted/20 px-6 py-4",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/* ─────────────────────────────────────────
   Title
───────────────────────────────────────── */
type DialogTitleRef = React.ElementRef<typeof DialogPrimitive.Title>;
type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

const DialogTitle = React.forwardRef<DialogTitleRef, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <DialogPrimitive.Title
        ref={ref}
        className={cn(
          "text-xl font-semibold leading-tight tracking-tight text-foreground",
          className,
        )}
        {...props}
      />
      <DialogPrimitive.Close style={{
        position:"absolute",
        top:"0px",
        right:"0px",
      }}>
        <Button
          variant="ghost"
          className="text-sm underline text-muted-foreground rounded-full"
          style={{
            width: "40px",
            height: "40px",
          }}
        >
          <IoMdClose />
        </Button>
      </DialogPrimitive.Close>
    </div>
  ),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/* ─────────────────────────────────────────
   Description
───────────────────────────────────────── */
type DialogDescriptionRef = React.ElementRef<
  typeof DialogPrimitive.Description
>;
type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

const DialogDescription = React.forwardRef<
  DialogDescriptionRef,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
