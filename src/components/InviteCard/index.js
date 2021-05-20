import React from "react";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";
// import { ProfileCard } from "components/ProfileCard";

import profile from "assets/logo/JixProfile.png";

import { BASEURL } from "utils/api";

import styles from "./styles.module.sass";

const InviteCard = (props) => {
  const { data } = props;
  // console.log(data);
  return (
    <Card noShadow className={styles.invitecard}>
      <header className={styles.header}>
        <img src={data.file ? BASEURL + data.file : profile} alt={data.name} />
        <Title size={24}>{data.name || "..."}</Title>
      </header>
      <div className={styles.section}>
        {!!data.skills.length && (
          <>
            <Text size={12} className={styles.title}>
              Skills
            </Text>
            <Text>{data.skills.map((item) => ` •  ${item.title}`)}</Text>
          </>
        )}
      </div>
      <div className={styles.section}>
        <Text size={12} className={styles.title}>
          Biografia
        </Text>
        <Text style={{ textAlign: "justify" }}>
          {data.bio ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at vulputate tempus proin. Ultricies nibh feugiat sed duis. Adipiscing turpis donec dictum commodo."}
        </Text>
      </div>
      <div className={styles.content}>{props.children}</div>
    </Card>
  );
};

export { InviteCard };
