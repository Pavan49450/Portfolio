import { useEffect, useState } from "react";
import useInput from "../../hooks/use-Input";
import {
  descriptionValidation,
  emailValidation,
  fullNameValidation,
  mobileNumberValidation,
} from "../InputValidations/InputValidations";
import useHttpsAxios from "../../hooks/use-httpsAxios";
import URL from "../../constants/url";
import InputWithInvalidText from "../../UI/Input/InputWithInvalidText";
import Button from "../../UI/Button/Button";

const ContactMeForm = () => {
  //   const [errorMessage, setErrorMessage] = useState("");

  //   const closeErrMessageHandler = () => {
  //     setErrorMessage("");
  //   };

  const nameInput = useInput({
    initialValue: "",
    validateValue: fullNameValidation,
  });
  const emailInput = useInput({
    initialValue: "",
    validateValue: emailValidation,
  });
  const mobileInput = useInput({
    initialValue: "",
    validateValue: mobileNumberValidation,
  });
  const descriptionInput = useInput({
    initialValue: "",
    validateValue: descriptionValidation,
  });

  const [formIsValid, setFormIsValid] = useState("false");

  useEffect(() => {
    setFormIsValid(
      nameInput.isValid &&
        emailInput.isValid &&
        mobileInput.isValid &&
        descriptionInput.isValid
    );
  }, [
    nameInput.isValid,
    emailInput.isValid,
    mobileInput.isValid,
    descriptionInput.isValid,
  ]);

  const { sendRequest, error, statusCode, responseData, isLoading } =
    useHttpsAxios();

  useEffect(() => {
    const Validation = () => {
      if (responseData) {
        console.log(responseData);
      }
    };

    Validation();
  }, [error, responseData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      // console.log("Form submitted successfully");
      // console.log(
      //   "Info->",
      //   nameInput.value,
      //   mobileInput.value,
      //   descriptionInput.value
      // );
      nameInput.reset();
      mobileInput.reset();
      descriptionInput.reset();

      const formData = {
        fullName: nameInput.value,
        email: emailInput.value,
        mobileNumber: mobileInput.value,
        message: descriptionInput.value,
      };

      sendRequest({
        url: `${URL.backendUrl}/contact`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
    } else {
    }
  };

  return (
    <div className={`w-full h-full max-w-xl mx-auto`}>
      <form
        onSubmit={handleSubmit}
        className={` p-4 mx-4 rounded-md bg-orange-400`}
      >
        <h2 className="p-4 pb-6 text-white text-2xl font-bold text-center">
          Contact Me
        </h2>
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-4`}>
          <InputWithInvalidText
            ErrorMessage={"Invalid Name"}
            className={``}
            inputFields={{
              placeholder: "Enter your full name",
              value: nameInput.value,
              isInvalid: nameInput.hasError,
              onBlurHandler: nameInput.validateValueHandler,
              onFocusHandler: nameInput.focusHandler,
              onChange: nameInput.valueChangeHandler,
              type: "text",
              isTouched: nameInput.isFocused,
            }}
            mandatory="true"
          />
          <InputWithInvalidText
            ErrorMessage={"Invalid Email"}
            inputFields={{
              placeholder: "Enter email address",
              value: emailInput.value,
              isInvalid: emailInput.hasError,
              onBlurHandler: emailInput.validateValueHandler,
              onFocusHandler: emailInput.focusHandler,
              onChange: emailInput.valueChangeHandler,
              type: "email",
              isTouched: emailInput.isFocused,
            }}
            mandatory="true"
          />
        </div>
        <InputWithInvalidText
          ErrorMessage={"Invalid Mobile number"}
          inputFields={{
            placeholder: "Enter your Mobile Number",
            value: mobileInput.value,
            isInvalid: mobileInput.hasError,
            onBlurHandler: mobileInput.validateValueHandler,
            onFocusHandler: mobileInput.focusHandler,
            onChange: mobileInput.valueChangeHandler,
            type: "text",
            isTouched: mobileInput.isFocused,
          }}
          mandatory="true"
        />

        <textarea
          id="description"
          placeholder="Description"
          value={descriptionInput.value}
          onChange={descriptionInput.valueChangeHandler}
          onBlur={descriptionInput.validateValueHandler}
          onFocus={descriptionInput.focusHandler}
          className={` w-full mb-4 min-h-28 border p-2 focus:shadow-none focus:outline-none rounded-md ${
            descriptionInput.hasError ? ` border-red-600` : " border-orange-400"
          }`}
        />
        <div className="flex justify-end w-full">
          <Button type="submit" disabled={!formIsValid} doNotScrollToTop>
            {isLoading ? "Loading..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactMeForm;
