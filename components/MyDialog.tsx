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
};

function MyDialog({ title, children, buttonTitle }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{/* <Button>{buttonTitle}</Button> */}</DialogTrigger>
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
