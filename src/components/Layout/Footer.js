import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const links = [
    {
      name: "Git",
      address: "https://github.com/pavan49450",
      imageURL: "https://img.icons8.com/ios-glyphs/90/github.png",
    },
    {
      name: "Linkedin",
      address: "https://www.linkedin.com/in/kattula-pavan-kumar-a2434714b/",
      imageURL: "https://img.icons8.com/color/96/linkedin.png",
    },
    // {
    //   name: "Portfolio",
    //   address: "https://kattula-pavan-kumar.vercel.app/",
    //   imageURL: "https://img.icons8.com/clouds/100/resume.png",
    // },
    {
      name: "Instagram",
      address: "https://Instagram.com/kattula_pavan",
      imageURL: "https://img.icons8.com/color/96/instagram-new.png",
    },
  ];

  return (
    <footer
      className={`${styles.footer} bg-slate-50 border-t-[1px] border-zinc-300`}
    >
      <div className={styles.footerContent}>
        <div className={styles.socialIcons}>
          {links.map((link, index) => (
            <a href={link.address} title={link.name} key={index}>
              <div className={styles.link}>
                <img
                  src={link.imageURL}
                  alt={link.name}
                  style={{ borderRadius: "50%", width: "35px", height: "35px" }}
                />
              </div>
            </a>
          ))}
        </div>
        <p className={styles.copyRights}>
          &copy; 2024 Kattula Pavan Kumar. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
