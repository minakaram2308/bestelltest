'use client'

import { Portal, Root, Trigger } from '@radix-ui/react-dialog'

import { DialogContent } from './DialogContent'
import { DialogOverlay } from './DialogOverlay'

const Dialog = Root
const DialogTrigger = Trigger
const DialogPortal = Portal

// const DialogTitle = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Title
//     ref={ref}
//     className={cn('text-lg font-semibold leading-none tracking-tight', className)}
//     {...props}
//   />
// ))
// DialogTitle.displayName = DialogPrimitive.Title.displayName

// const DialogDescription = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Description
//     ref={ref}
//     className={cn('text-sm text-muted-foreground', className)}
//     {...props}
//   />
// ))
// DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  //   DialogHeader,
  //   DialogFooter,
  //   DialogTitle,
  //   DialogDescription,
}
