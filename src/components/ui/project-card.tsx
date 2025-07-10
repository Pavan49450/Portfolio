import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  codeUrl,
}: ProjectCardProps) {
  return (
    <Card className="glass-effect hover-lift h-full overflow-hidden">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden"
      >
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <a
            href={liveUrl}
            className="p-2 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={codeUrl}
            className="p-2 bg-secondary rounded-full text-white hover:bg-secondary/80 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={liveUrl}
            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Live Demo
          </a>
          <a
            href={codeUrl}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
          >
            <Github className="w-4 h-4 mr-1" />
            Code
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
