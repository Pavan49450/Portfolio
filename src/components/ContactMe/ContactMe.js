import style from "./ContactMe.module.css";
import ContactMeForm from "./ContactMeForm";

const ContactMe = () => {
  return (
    // <div className={style.contactMe}>
    // <div className="">
    <div className="max-w-5xl flex mx-auto justify-center mb-4 lg:flex-row flex-col gap-y-4">
      <ContactMeForm />
      <ContactBoxes />
    </div>
    // </div>
  );
};

export default ContactMe;

const ContactBoxes = () => {
  return (
    <div className={`w-full m-0 flex flex-col gap-4`}>
      <div className={`flex gap-4 md:flex-row flex-col w-full px-4`}>
        <div
          className={` w-full h-44 p-4 bg-yellow-400 flex flex-col gap-4 items-center justify-center`}
        >
          <span className="font-bold">Phone No:</span>
          <span className="text-center">+91 6301863490</span>
        </div>
        <div
          className={` w-full h-44 p-4 bg-yellow-300 flex flex-col gap-4 items-center justify-center`}
        >
          <span className="font-bold">Email Id:</span>
          <span className="text-center">pavan49450@gmail.com</span>
        </div>
      </div>
      <div className="px-4">
        <div
          className={`w-full max-h-44 h-44 p-4 bg-yellow-200 flex flex-col gap-4 items-center justify-center `}
        >
          <span className="font-bold">Linkedin handle:</span>
          <span className="text-center">
            https://www.linkedin.com/in/kattula-pavan-kumar-a2434714b
          </span>
        </div>
      </div>
    </div>
  );
};
