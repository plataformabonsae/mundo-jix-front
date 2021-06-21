import React from "react";
import { Link } from "react-router-dom";

import { Card } from "components/Card";

import { BASEURL } from "utils/api";
import { Title, Text } from "components/Text";

import link from "assets/icons/link-black.svg";
import anex from "assets/icons/anex-black.svg";
import comments from "assets/icons/comment.svg";

import defaultImage from "assets/logo/JixProfile.png";

import styles from "./styles.module.sass";

const ForumCard = (props) => {
  const { item } = props;

  return (
    <Card className={styles.post} noShadow border>
      <header className={styles.post__header}>
        <img
          src={
            item?.forum?.user?.file || item?.user?.file
              ? BASEURL + (item?.forum?.user?.file || item?.user?.file)
              : defaultImage
          }
          alt={item?.forum?.name}
        />
        <span style={{ fontWeight: "bold" }}>
          {item?.forum?.user?.name || item?.user?.name}
        </span>
        <span className={styles.post__date}>
          Postado {item?.forum?.created_at || item?.created_at}
        </span>
      </header>
      <article className={styles.post__content}>
        <Title size={20}>{item?.forum?.name || item?.name}</Title>
        <Text>{item?.forum?.description || item?.description}</Text>
      </article>
      <article className={styles.post__extras}>
        {item?.forum?.forum_links?.map(
          (forum_link) =>
            forum_link.link && (
              <div key={forum_link.id} className={styles.post__link}>
                <img src={link} alt={forum_link.link} />{" "}
                <a href={forum_link.link} target={"_blank"} rel="noreferrer">
                  {forum_link.link}
                </a>
              </div>
            )
        )}
        {item?.forum_links?.map(
          (forum_link) =>
            forum_link.link && (
              <div key={forum_link.id} className={styles.post__link}>
                <img src={link} alt={forum_link.link} />{" "}
                <a href={forum_link.link} target={"_blank"} rel="noreferrer">
                  {forum_link.link}
                </a>
              </div>
            )
        )}
        {item?.forum?.file && (
          <div className={styles.post__link}>
            <img src={anex} alt={item?.forum?.filename} />
            <a
              href={BASEURL + item?.forum?.file}
              target={"_blank"}
              rel="noreferrer"
            >
              {item?.forum?.filename}
            </a>
          </div>
        )}
        {item?.file && (
          <div className={styles.post__link}>
            <img src={anex} alt={item?.filename} />
            <a
              href={BASEURL + item?.forum?.file}
              target={"_blank"}
              rel="noreferrer"
            >
              {item?.filename}
            </a>
          </div>
        )}
      </article>
      <Link to={props.to} className={styles.post__comment}>
        <img src={comments} alt="Comentários" />{" "}
        {item?.posts?.length > 1 && `${item?.posts?.length} Comentários`}
        {item?.posts?.length === 1 && "1 Comentário"}
        {!item?.posts?.length && "Sem comentários"}
      </Link>
      {props.children && (
        <div className={styles.post__content}>{props.children}</div>
      )}
    </Card>
  );
};

export { ForumCard };
