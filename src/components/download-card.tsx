import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadCardProps {
  title: string
  description: string
  fileType: string
  fileSize: string
  icon: React.ReactNode
}

export function DownloadCard({ title, description, fileType, fileSize, icon }: DownloadCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-muted p-2 rounded-md">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md">{fileType}</span>
            <span className="text-xs text-muted-foreground">{fileSize}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
