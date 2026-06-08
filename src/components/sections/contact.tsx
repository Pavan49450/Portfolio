import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, Linkedin,  Github } from "lucide-react";
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
    value: "+91 6301863490",
    gradient: "from-primary to-purple-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "pavank.kattula@gmail.com",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "View Profile",
    link: "https://www.linkedin.com/in/kattula-pavan-kumar-a2434714b",
    gradient: "from-purple-500 to-pink-600",
  },
];

const socialLinks = [
  // { icon: Twitter, href: "#", gradient: "from-primary to-purple-600" },
  {
    icon: Github,
    href: "https://github.com/pavan49450",
    gradient: "from-emerald-500 to-teal-600",
  },
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
          initial={{ y: 60 }}
          animate={isVisible ? { y: 0 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
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
            initial={{ x: -50 }}
            animate={isVisible ? { x: 0 } : {}}
            transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.15 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  initial={{ x: -30, scale: 0.94 }}
                  animate={isVisible ? { x: 0, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 + i * 0.12 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-full flex items-center justify-center`}
                    initial={{ rotate: -90, scale: 0 }}
                    animate={isVisible ? { rotate: 0, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.35 + i * 0.12 }}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </motion.div>
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
                </motion.div>
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
            initial={{ x: 50 }}
            animate={isVisible ? { x: 0 } : {}}
            transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.25 }}
          >
            <Card className="glass-effect middle-layer">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: "name", label: "Full Name *", type: "text", name: "name", placeholder: "Enter your full name", required: true, component: "input" },
                    { id: "email", label: "Email Address *", type: "email", name: "email", placeholder: "Enter your email", required: true, component: "input" },
                    { id: "phone", label: "Mobile Number *", type: "tel", name: "phone", placeholder: "Enter your mobile number", required: true, component: "input" },
                    { id: "message", label: "Message", type: "text", name: "message", placeholder: "Tell me about your project…", required: false, component: "textarea" },
                  ].map((field, i) => (
                    <motion.div
                      key={field.id}
                      initial={{ y: 20, x: 10 }}
                      animate={isVisible ? { y: 0, x: 0 } : {}}
                      transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.5 + i * 0.1 }}
                    >
                      <Label htmlFor={field.id}>{field.label}</Label>
                      {field.component === "textarea" ? (
                        <Textarea
                          id={field.id}
                          name={field.name}
                          rows={4}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <Input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ y: 16 }}
                    animate={isVisible ? { y: 0 } : {}}
                    transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-transform"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending…" : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
