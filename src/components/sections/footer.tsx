import { motion } from "framer-motion";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 md:mb-0"
          >
            <div className="text-2xl font-bold mb-2">
              <span className="text-foreground">Kattula</span>
              <span className="gradient-text"> Pavan Kumar</span>
            </div>
            <p className="text-muted-foreground">
              Coding Tomorrow's Possibilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex space-x-6"
          >
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-border mt-8 pt-8 text-center text-muted-foreground"
        >
          <p>&copy; 2024 Kattula Pavan Kumar. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
