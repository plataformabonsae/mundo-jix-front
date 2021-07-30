import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/Button";
import { Text, Title } from "components/Text";

import { Material } from "./components/Material";
import { Video } from "./components/Video";
import { Question } from "./components/Question";

import styles from "./styles.module.sass";

const Trail = (props) => {
  const { handleTrails, setTrails, trails, savedTrails } = props;

  const handleData = (index, data) => {
    const array = [...trails];
    array[index].data = data;
    setTrails(array);
  };

  const handleDelete = (index) => {
    const array = [...trails];
    array.splice(index, 1);
    setTrails(array);
  };

  const handleCopy = (index) => {
    setTrails((prev) => [...prev, savedTrails[index]]);
  };

  return (
    <section className={styles.wrapper}>
      <section className={styles.trails}>
        {savedTrails?.map((item, index) => {
          if (item.type === "material")
            return (
              <Material
                key={`${item.type}_${new Date().getTime()}_${item.id}`}
                trails={trails}
                index={index}
                data={item}
                handleData={handleData}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            );
          if (item.type === "question")
            return (
              <Question
                key={`${item.type}_${new Date().getTime()}_${item.id}`}
                trails={trails}
                index={index}
                handleData={handleData}
                data={item}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            );
          if (item.type === "video")
            return (
              <Video
                key={`${item.type}_${new Date().getTime()}_${item.id}`}
                trails={trails}
                index={index}
                data={item}
                handleData={handleData}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            );
          return null;
        })}
        {trails?.map((item, index) => {
          if (item.type === "material")
            return (
              <Material
                key={`${item.type}_${new Date().getTime()}_${index}`}
                trails={trails}
                // index={index}
                defaultData={item}
                handleData={handleData}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            );
          if (item.type === "question")
            return (
              <Question
                key={`${item.type}_${new Date().getTime()}_${index}`}
                trails={trails}
                // index={index}
                defaultData={item}
                handleData={handleData}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            );
          if (item.type === "video")
            return (
              <Video
                key={`${item.type}_${new Date().getTime()}_${index}`}
                trails={trails}
                // index={index}
                defaultData={item}
                handleData={handleData}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            );
          return null;
        })}
      </section>
      <div className={styles.buttons}>
        <Text>Deseja adicionar novo conteúdo para trilha?</Text>
        <div className={styles.buttons__wrapper}>
          <Button
            Tag={"span"}
            type={"primary"}
            onClick={() => handleTrails("video")}
          >
            Videoaula
          </Button>
          <Button
            Tag={"span"}
            type={"primary"}
            onClick={() => handleTrails("material")}
          >
            Material
          </Button>
          <Button
            Tag={"span"}
            type={"primary"}
            onClick={() => handleTrails("question")}
          >
            Questão
          </Button>
        </div>
      </div>
      <div className={styles.buttons}>
        <Text>Deseja finalizar a trilha?</Text>
        <div className={styles.buttons__wrapper}>
          <Button
            disabled={!trails?.length}
            Tag={"span"}
            type={"green"}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Trail };
