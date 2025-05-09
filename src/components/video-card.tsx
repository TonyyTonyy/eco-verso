import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export function VideoCard({
  title,
  description,
  thumbnail,
  duration,
  url,
}: VideoCardProps) {
  return (
    <Card className="overflow-hidden pt-0 pb-6">
      <div className="relative aspect-video">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {duration}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <Button variant="outline" className="w-full">
            Assistir Agora
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
