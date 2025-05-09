"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TeamCardProps {
  name: string
  image: string
}

export function TeamCard({ name, image }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        className="overflow-hidden pt-0 pb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium">{name}</h3>
        </CardContent>
      </Card>
    </motion.div>
  )
}
