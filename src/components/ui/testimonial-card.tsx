import { Star } from "lucide-react";
import { Card, CardContent } from "./card";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  gradient: string;
}

export function TestimonialCard({
  name,
  role,
  content,
  rating,
  gradient,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="glass-effect hover-lift h-full">
      <CardContent className="p-8">
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mr-4`}
          >
            <span className="text-white font-bold">{initials}</span>
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">{content}</p>
        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
