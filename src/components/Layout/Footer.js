import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const links = [
    {
      name: "Git",
      address: "https://github.com/pavan49450",
      imageURL: "https://img.icons8.com/ios-filled/100/git.png",
    },
    {
      name: "Linkedin",
      address: "https://www.linkedin.com/in/kattula-pavan-kumar-a2434714b/",
      imageURL: "https://img.icons8.com/color/96/linkedin.png",
    },
    {
      name: "Portfolio",
      address: "https://kattula-pavan-kumar.vercel.app/",
      imageURL: "https://img.icons8.com/clouds/100/resume.png",
    },
    {
      name: "Instagram",
      address: "https://Instagram.com/kattula_pavan",
      imageURL: "https://img.icons8.com/color/96/instagram-new.png",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialIcons}>
          {links.map((link) => (
            <a href={link.address} title={link.name}>
              <div className={styles.link}>
                <img
                  src={link.imageURL}
                  alt={link.name}
                  style={{ borderRadius: "50%", width: "35px", height: "35px" }}
                />
                {/* <p>{link.name}</p> */}
              </div>
            </a>
          ))}
        </div>
        <p>&copy; 2024 Kattula Pavan Kumar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
