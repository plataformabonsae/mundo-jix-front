import React from "react";
import YouTube from "react-youtube";

import { Card } from "components/Card";
import { Title, Text } from "components/Text";

import styles from "./styles.module.sass";

const Presentation = (props) => {
  const { data } = props;

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleOnReady = () => {
    // console.log("onready yt video");
  };
  return (
    <section className={styles.wrapper}>
      <Card className={styles.card} border noShadow>
        <div className={styles.title__wrapper}>
          <Title size={18} className={styles.title}>
            {data?.name || "..."}
          </Title>
          <Text size={14} className={styles.tag}>
            {data?.challenge_type.replace("_", " ") || "..."}
          </Text>
        </div>
        <div>
          Por <a href="https://">Nome da Marca</a>
        </div>
        <Text className={styles.content}>{data?.description}</Text>
      </Card>
      <YouTube videoId="IXxZRZxafEQ" opts={opts} onReady={handleOnReady} />
    </section>
  );
};

export { Presentation };
