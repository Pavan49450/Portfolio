// src/components/Services.js
import React, { useState } from "react";
import BackgroundIcons from "../components/Background/BackgroundIcons";
import Title from "../UI/Title/Title";
import Container from "../UI/Container/Container";
import servicesData from "../data/services.json";
import style from "./Projects.module.css";

const Services = () => {
  const [showAllSkillsIndex, setShowAllSkillsIndex] = useState(null);
  const [showDownBtn, setShowDownBtn] = useState(null);

  const handleShowAllSkills = (index) => {
    if (index === showAllSkillsIndex) {
      setShowAllSkillsIndex(null);
    } else {
      setShowAllSkillsIndex(index);
    }
  };

  return (
    <>
      <Container className={style.container}>
        <Title title={"What I Offer"} />
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className="text-center"></div>

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow sm:p-6 p-2 flex flex-col gap-4 justify-start"
                >
                  <div
                    className={`flex items-center justify-evenly w-full ${service.bgColor} rounded-lg`}
                  >
                    <span className={`font-bold text-2xl ${service.textColor}`}>
                      {service.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {service.title}
                  </h3>
                  <p className=" text-gray-600">{service.description}</p>
                  <div className="relative">
                    <div
                      className={`flex gap-2 items-center justify-between  transition-all ${
                        showAllSkillsIndex === index ? "flex-col" : null
                      }`}
                    >
                      <div
                        className={`flex items-start justify-start overflow-hidden gap-2 w-full  transition-all ${
                          showAllSkillsIndex === index ? "flex-wrap" : "null"
                        }`}
                      >
                        {service.skills.map((skill, index) => (
                          <h2
                            key={index}
                            className={`px-2 py-1 rounded-md ${service.bgColor} ${service.textColor} whitespace-nowrap`}
                          >
                            {skill}
                          </h2>
                        ))}
                      </div>
                    </div>
                    {
                      <span
                        className={`absolute top-1 right-0 min-w-fit z-10 shadow-lg bg-white p-1 rounded-lg cursor-pointer transition-all hover:bg-zinc-100 ${
                          showDownBtn === index ? "visible" : "visible"
                        }`}
                        onClick={() => {
                          handleShowAllSkills(index);
                        }}
                      >
                        {showAllSkillsIndex === index ? (
                          <img
                            src={require("../assets/icons/arrowDown.png")}
                            className="max-w-4 rotate-180"
                            alt="arrow down"
                          />
                        ) : (
                          <img
                            src={require("../assets/icons/arrowDown.png")}
                            className="max-w-4"
                            alt="arrow down"
                          />
                        )}
                      </span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <BackgroundIcons />
    </>
  );
};

export default Services;
