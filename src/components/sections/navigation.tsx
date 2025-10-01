import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../ui/theme-provider";
import { Button } from "../ui/button";
import { SheetContent, SheetTrigger, Sheet } from "../ui/sheet";
import {
  Menu,
  Sun,
  Moon,
  Home,
  User,
  Star,
  Folder,
  Layers,
  Mail,
  Award,
  BriefcaseBusiness,
} from "lucide-react";
import { IoMdClose } from "react-icons/io";
// import URL from "../../constants/url";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Star },
  { name: "Projects", href: "#projects", icon: Folder },
  { name: "Services", href: "#services", icon: Layers },
  { name: "Experience", href: "#experience", icon: BriefcaseBusiness },
  { name: "Achievements", href: "#achievements", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect" : ""
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 max-[600px]:px-2 py-1">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-full bg-secondary w-[65px] h-[65px] max-[600px]:w-[50px] max-[600px]:h-[50px] flex justify-center items-center border-primary border-2"
          >
            {/* <span className="text-foreground">K</span>
            <span className="gradient-text">PK</span> */}
            <img
              src={`/images/Logo.png`}
              alt={"logo"}
              className={`w-[60px] mb-2 mr-1 max-[600px]:mb-1`}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="hover:text-primary transition-colors cursor-pointer flex items-center space-x-2"
              >
                {/* <item.icon className="w-4 h-4" /> */}
                <span>{item.name}</span>
              </motion.a>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-9 h-9 relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px]"
              header={
                <div
                  className={`text-foreground ${
                    theme === "light"
                      ? "hover:bg-zinc-200"
                      : "hover:bg-zinc-500"
                  }  p-2 rounded-full`}
                  onClick={() => setIsOpen(false)}
                >
                  <IoMdClose
                    className={`h-4 w-4`}
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  />
                  <span className="sr-only">Close</span>
                </div>
              }
            >
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-lg text-foreground hover:text-primary transition-colors cursor-pointer flex items-center space-x-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ))}

                {/* Mobile Theme Toggle */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="w-9 h-9 border "
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {theme === "light" ? (
                        <motion.div
                          key="moon"
                          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                          animate={{ rotate: 0, opacity: 1, scale: 1 }}
                          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                        >
                          <Moon className="h-5 w-5 text-yellow-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sun"
                          initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                          animate={{ rotate: 0, opacity: 1, scale: 1 }}
                          exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                        >
                          <Sun className="h-5 w-5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
