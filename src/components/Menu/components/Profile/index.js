import React from "react";

import * as T from "components/Text";

import styles from "./styles.module.sass";

import profile from "assets/logo/JixProfile.png";

const Profile = ({ location, image, name }) => {
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.image}>
          <img src={image ? image : profile} alt={name} />
          <T.Text weight="bold" size={12} className={styles.location}>
            {location}º
          </T.Text>
        </div>
      </div>
      <T.Title size={18} className={styles.name} color={"white"}>
        {name}
      </T.Title>
    </>
  );
};

export { Profile };
