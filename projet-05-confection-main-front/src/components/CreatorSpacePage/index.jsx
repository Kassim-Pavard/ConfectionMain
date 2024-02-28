import React from "react";
import PersonalInformation from "../Infos/PersonalInfomation/index";
import CompagnyInformation from "../Infos/CompagnyInformation/index";
import CreatorItems from "../CreatorItems/index";


function CreatorSpacePage() {
  return (
    <div >
      <div>
        <h2>Mes Infos</h2>
        <PersonalInformation />
      </div>
      <div >
        <h2>Mon Atelier</h2>
        <CompagnyInformation />
      </div>
      <div >
        <h2>Mes Articles</h2>
        <CreatorItems />
      </div>
    </div>
  );
}

export default CreatorSpacePage;
