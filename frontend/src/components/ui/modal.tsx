import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

export interface Props {
  open: boolean;
  children: React.ReactNode;
  dismiss?: () => void;
  title: string;
  confirm?: () => void;
  cancelButton?: React.ReactNode;
  confirmButton?: React.ReactNode;
  cancelStyle?: string;
}

export function Modal({
  children,
  title,
  open,
  dismiss,
  confirm,
  cancelStyle,
  cancelButton = <>Cancelar</>,
  confirmButton = <>Confirmar</>,
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <>{children}</>
        <AlertDialogFooter>
          {dismiss && (
            <AlertDialogCancel className={cancelStyle} onClick={dismiss}>
              {cancelButton}
            </AlertDialogCancel>
          )}
          {confirm && (
            <AlertDialogAction className="text-foreground" onClick={confirm}>
              {confirmButton}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
