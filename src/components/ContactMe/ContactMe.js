import style from "./ContactMe.module.css";
import ContactMeForm from "./ContactMeForm";

const ContactMe = () => {
  return (
    <div className={style.contactMe}>
      <ContactMeForm />
    </div>
  );
};

export default ContactMe;
