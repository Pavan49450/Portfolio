import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, Linkedin, Twitter, Github } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { useToast } from "../../hooks/use-toast";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { apiRequest } from "../../lib/utils";
import URL from "../../constants/url";

/* -------------------------------------------------------------------------- */
/*  ✨  Static data                                                            */
/* -------------------------------------------------------------------------- */
const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+91 6301863490",
    gradient: "from-primary to-purple-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "pavan49450@gmail.com",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "View Profile",
    link: "https://www.linkedin.com/in/kattula-pavan-kumar-a2434714b",
    gradient: "from-purple-500 to-pink-600",
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", gradient: "from-primary to-purple-600" },
  { icon: Github, href: "#", gradient: "from-emerald-500 to-teal-600" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/kattula-pavan-kumar-a2434714b",
    gradient: "from-purple-500 to-pink-600",
  },
];

/* -------------------------------------------------------------------------- */
/*  🚀  Component                                                             */
/* -------------------------------------------------------------------------- */
export function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* --------------------------- React‑Query mutation ----------------------- */
  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      apiRequest("POST", `${URL.backendUrl}/contact`, data),
    onSuccess: (response) => {
      toast({
        title: "Message Sent!",
        description: response.data.message,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: (error: unknown) => {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  /* ----------------------------- Handlers --------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* simple empty‑field guard */
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ------------------------------------------------------------------------ */
  /*  🖼️  JSX                                                                 */
  /* ------------------------------------------------------------------------ */
  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let’s discuss how I can help bring
            your ideas to life.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* ---------- Contact details + socials ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-full flex items-center justify-center`}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{info.title}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-10">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gradient-to-r ${social.gradient} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ------------- Contact form -------------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-effect">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Full Name&nbsp;*</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address&nbsp;*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">Mobile Number&nbsp;*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project…"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-transform"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
