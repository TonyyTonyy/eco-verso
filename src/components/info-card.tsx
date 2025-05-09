"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface InfoCardProps {
  title: string;
  description: string;
  image: string;
}

export function InfoCard({ title, description, image }: InfoCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden pt-0 pb-6">
        <div className="relative aspect-[4/3]">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <CardHeader className="text-white">
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
          </div>
        </div>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <ZoomIn className="h-4 w-4 mr-2" />
                Abrir Imagem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none sm:max-w-none w-[90%] bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-800">
              <DialogHeader>
                <DialogTitle>Infográfico</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="relative w-full h-full min-w-[70vw] min-h-[80vh]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
