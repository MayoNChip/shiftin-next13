import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type Props = {
  title: string;
  buttonTitle: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function MyDialog({ title, children, buttonTitle, isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button onClick={() => setIsOpen(true)}>{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default MyDialog;
