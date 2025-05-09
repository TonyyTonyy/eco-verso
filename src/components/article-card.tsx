import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  url: string;
}

export function ArticleCard({
  title,
  excerpt,
  image,
  date,
  author,
  readTime,
  tags,
  url,
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full py-0 pb-6">
      <div className="relative aspect-[16/9]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex-none">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={url} className="hover:underline">
          <h3 className="font-bold text-lg leading-tight">{title}</h3>
        </Link>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {readTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex-none pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-muted-foreground">por {author}</span>
          <Link target="_blank" rel="noopener noreferrer" href={url}>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              Ler Mais <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
