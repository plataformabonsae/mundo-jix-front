import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// import { Title, Text } from "components/Text";
import { TabFlat } from "components/Tabs";
import { Banner } from "components/Banner";
import { Title, Text } from "components/Text";
import Button from "components/Button";
import { Loading } from "components/Loading";
import { Dialog } from "components/Dialog";

import { Header } from "./components/Header";
import { TrilhaItem } from "components/TrilhaItem";

import styles from "./styles.module.sass";

import { normal, premium } from "services/trail";

const Trilha = (props) => {
  const dispatch = useDispatch();
  const { data: trail, loading } = useSelector((state) => state.trail);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data } = useSelector((state) => state.challenge);
  const { type, id, trail_type } = useParams();
  const [premiumDialog, setPremiumDialog] = useState(false);
  // const { type, id, trail_type, trail_id } = useParams();
  // const [activeTab, setActiveTab] = useState("normal");

  useEffect(() => {
    trail_type === "normal" && dispatch(normal(usertype, { challenge_id: id }));
    trail_type === "premium" &&
      dispatch(premium(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id, trail_type]);

  const handlePremumDialog = () => setPremiumDialog((prev) => !prev);

  return (
    <section className={styles.trilha}>
      <Header data={data.challenge} />
      <header className={styles.header}>
        <div className={styles.header__links}>
          <TabFlat to={`/meus-desafios/${type}/${id}/trilha/normal`}>
            Normal
          </TabFlat>
          <TabFlat to={`/meus-desafios/${type}/${id}/trilha/premium`}>
            Premium
          </TabFlat>
        </div>
        <section className={styles.trilha__list}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {trail_type === "premium" && (
                <Banner
                  full
                  Tag={"span"}
                  title={"Maecenas dolor suspendisse mi bibendum."}
                  button={"Comprar"}
                  onClick={handlePremumDialog}
                />
              )}
              {trail?.map((item, index) => (
                <TrilhaItem
                  to={`/meus-desafios/${type}/${id}/trilha/${trail_type}/${item.id}`}
                  // locked={data.?user}
                  item={item}
                  trailType={item.type}
                  key={item.id}
                  video={item.video}
                  file={item.material}
                  question={item.question}
                />
              ))}
            </>
          )}
        </section>
        {premiumDialog && (
          <Dialog handleClose={handlePremumDialog}>
            <Title>Redirecionamento</Title>
            <Text style={{ margin: "12px 0" }}>
              Você será redirecionado para uma página de confirmação de
              pagamento. Dependendo da forma de pagamento que escolher (cartão
              de crédito, boleto, etc), pode-se levar até 2 dias úteis para a
              liberação do conteúdo Premium.
            </Text>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                style={{ minWidth: 100 }}
                Tag={"span"}
                type={"secondary"}
                onClick={() => handlePremumDialog()}
              >
                Cancelar
              </Button>
              <Button
                style={{ minWidth: 100 }}
                Tag={"a"}
                type={"green"}
                href={"https://stripe.com/en-br"}
                target={"_blank"}
                rel={"noreferrer"}
              >
                Ok
              </Button>
            </div>
          </Dialog>
        )}
      </header>
    </section>
  );
};

export { Trilha };
