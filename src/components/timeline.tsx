"use client"

import { motion } from "framer-motion"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-primary/20"></div>

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col sm:flex-row ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            } items-center sm:items-start gap-4 sm:gap-8`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-5 h-5 rounded-full bg-primary"></div>

            {/* Year */}
            <div className={`sm:w-1/2 ${index % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:pl-8"}`}>
              {/* <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {event.year}
              </span> */}
            </div>

            {/* Content */}
            <div className={`sm:w-1/2 pt-2 sm:pt-0 ${index % 2 === 0 ? "sm:pl-8 pl-4" : "sm:pr-8 pl-4 sm:pl-0 sm:text-right"}`}>
              <h3 className="text-lg font-medium mb-1">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
