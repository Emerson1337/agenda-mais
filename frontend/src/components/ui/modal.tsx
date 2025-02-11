import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

export interface Props {
  open: boolean;
  children: React.ReactNode;
  dismiss?: () => void;
  title: string;
  description: string;
  confirm?: () => void;
  cancelButton?: React.ReactNode;
  confirmButton?: React.ReactNode;
  cancelStyle?: string;
  confirmStyle?: string;
  isLoading?: boolean;
}

export function Modal({
  children,
  title,
  description,
  open,
  dismiss,
  confirm,
  cancelStyle,
  confirmStyle,
  isLoading = false,
  cancelButton = <>Cancelar</>,
  confirmButton = <>Confirmar</>,
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="p-4 px-4 py-14 sm:p-6 max-h-[100vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="px-4 AlertDialogDescription">
          {description}
        </AlertDialogDescription>
        <div className="overflow-y-auto">{children}</div>
        <AlertDialogFooter>
          {dismiss && (
            <AlertDialogCancel className={cancelStyle} onClick={dismiss}>
              {cancelButton}
            </AlertDialogCancel>
          )}
          {confirm && (
            <AlertDialogAction className={confirmStyle} onClick={confirm}>
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}{" "}
              {confirmButton}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
