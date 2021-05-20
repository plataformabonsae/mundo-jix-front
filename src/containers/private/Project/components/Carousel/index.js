import React, { useState } from "react";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import YouTube from "react-youtube";

import { Card } from "components/Card";
import { FeedbackCard } from "components/FeedbackCard";
import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { Dot } from "components/Dot";
import Button from "components/Button";

import chrevron from "assets/components/Project/chevron.svg";

import * as colors from "utils/styles/Colors";

import styles from "./styles.module.sass";

SwiperCore.use([Navigation]);

const Carousel = (props) => {
  const [activeTab, setActiveTab] = useState("meu-projeto");
  const { data } = props;

  const opts = {
    height: "460",
    width: "100%'",
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 0,
    // },
  };

  const handleOnReady = () => {
    // console.log("onready yt video");
  };

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className={styles.carousel}>
      <header className={styles.header}>
        <div className={styles.header__links}>
          <TabFlat
            active={activeTab === "meu-projeto"}
            Tag="span"
            onClick={() => handleTabs("meu-projeto")}
          >
            Meu projeto
          </TabFlat>
          <TabFlat
            active={activeTab === "feedbacks"}
            Tag="span"
            onClick={() => handleTabs("feedbacks")}
          >
            Feedback
          </TabFlat>
          <TabFlat
            active={activeTab === "avaliacao"}
            Tag="span"
            onClick={() => handleTabs("avaliacao")}
          >
            Avaliação
          </TabFlat>
        </div>
        {activeTab === "meu-projeto" && (
          <Button Tag="span" type={"tertiary"} onClick={() => props.modal()}>
            Editar projeto
          </Button>
        )}
      </header>
      {activeTab === "meu-projeto" && (
        <Card border noShadow>
          <div className={styles.videos}>
            <style>
              {`
              .swiper-button-next {
                position: absolute;
                text-align: center;
                z-index: 2;
                width: 50px;
                bottom: 0;
                top: 0;
                right: 0;
                background: rgb(228, 229, 231);
                cursor: pointer;
              }

              .swiper-button-next::before {
                content: '';
                display: inline-block;
                position: absolute;
                z-index: 3;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translate(-50%, -50%);
                background-image: url(${chrevron});
                background-repeat: no-repeat;
                object-fit: cover;
              }
              
              .swiper-button-prev {
                position: absolute;
                z-index: 2;
                text-align: center;
                width: 50px;
                bottom: 0;
                top: 0;
                left: 0;
                background: rgb(228, 229, 231);
                cursor: pointer;
              }

              .swiper-button-prev::before {
                content: '';
                display: inline-block;
                position: absolute;
                z-index: 3;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translate(-50%, -50%) rotate(180deg);
                background-image: url(${chrevron});
                background-repeat: no-repeat;
                object-fit: cover;
              }
              `}
            </style>
            <Swiper
              navigation
              observer={activeTab}
              spaceBetween={0}
              slidesPerView={1}
            >
              <SwiperSlide>
                <div style={{ padding: "0 50px" }}>
                  <YouTube
                    videoId={`EEIk7gwjgIM`}
                    opts={opts}
                    onReady={handleOnReady}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div style={{ padding: "0 50px" }}>
                  <YouTube
                    videoId={`EEIk7gwjgIM`}
                    opts={opts}
                    onReady={handleOnReady}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div style={{ padding: "0 50px" }}>
                  <YouTube
                    videoId={`EEIk7gwjgIM`}
                    opts={opts}
                    onReady={handleOnReady}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.content}>
            <section className={styles.desc}>
              <Title className={styles.title} size={18}>
                {data?.name}
              </Title>
              <div className={styles.desc__title}>Descrição</div>
              <Text>{parse(data?.description)}</Text>
            </section>
            <section className={styles.downloads}>
              <Title size={18}>Materiais anexados</Title>
            </section>
          </div>
        </Card>
      )}
      {activeTab === "feedbacks" && (
        <section className={styles.feedbacks}>
          <FeedbackCard buttonText={"Visualizar"} />
          <FeedbackCard buttonText={"Visualizar"} />
          <FeedbackCard buttonText={"Visualizar"} />
          <FeedbackCard buttonText={"Visualizar"} />
        </section>
      )}
    </section>
  );
};

export { Carousel };
