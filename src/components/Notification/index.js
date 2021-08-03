import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Title, Text } from "components/Text";
import { Card } from "components/Card";
import { Loading } from "components/Loading";
import styles from "./styles.module.sass";

import { unread, readAll, readOne } from "services/notifications";

import bell from "assets/components/Notification/bell.svg";
import arrow from "assets/components/Notification/arrow.svg";

// notifications

const Notification = ({ list, open, isOpen }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.notifications);
  const { data: usertype } = useSelector((state) => state.usertype);

  useEffect(() => {
    dispatch(unread(usertype));
    let timer = setInterval(() => dispatch(unread(usertype)), 15 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, usertype]);

  const handleReadAll = async () => {
    dispatch(readAll(usertype));
  };

  const handleRead = (id) => {
    dispatch(readOne(usertype, { id })).then(() => {
      dispatch(unread(usertype));
    });
  };

  const setTextByType = (item) => {
    if (item.type === `App\\Notifications\\UserWantsYouJoiningHisTeam`) {
      return {
        title: "Convite para participar de time",
        desc: `${item.data.guardian_name} te convidou para o seu time ${item.data.team_name}`,
      };
    }
    if (item.type === `App\\Notifications\\UserWantsJoinYourTeam`) {
      return {
        title: "Convite para entrar no seu time",
        desc: `${item.data?.user_name} quer entrar para o seu time ${item.data?.team_name}`,
      };
    }
    if (item.type === `App\\Notifications\\ChallengeEndingInOneDay`) {
      return {
        title: "Falta 1 dia",
        desc: `O desafio ${item.data?.challenge_name} irá acabar em 1 dia.`,
      };
    }
    if (item.type === `App\\Notifications\\ChallengeEndingInTwoDays`) {
      return {
        title: "Falta 2 dias",
        desc: `O desafio ${item.data?.challenge_name} irá acabar em 2 dias.`,
      };
    }
    if (item.type === `App\\Notifications\\ChallengeEndingInThreeDay`) {
      return {
        title: "Falta 3 dias",
        desc: `O desafio ${item.data?.challenge_name} irá acabar em 3 dias.`,
      };
    }
    if (item.type === `App\\Notifications\\GuardianAcceptedYourRequest`) {
      return {
        title: "Aceitou o seu pedido",
        desc: `O guardião do time ${item.data?.team_name} aceitou o seu pedido.`,
      };
    }
    if (item.type === `App\\Notifications\\GuardianRefusedYourRequest`) {
      return {
        title: "Recusou o seu pedido",
        desc: `O guardião do time ${item.data?.team_name} recusou o seu pedido.`,
      };
    }
    if (item.type === `App\\Notifications\\GuardianSentProject`) {
      return {
        title: "Projeto enviado",
        desc: `O guardião ${item.data?.guardian_name} enviou o projeto do desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\PremiumPurchaseSuccess`) {
      return {
        title: "Compra efetuado com sucesso",
        desc: `A compra da trilha do desafio ${item.data?.challenge_name} foi confirmada.`,
      };
    }
    if (item.type === `App\\Notifications\\SubscriptionOff`) {
      return {
        title: "Assinatura cancelada",
        desc: `A sua assinatura foi cancelada.`,
      };
    }
    if (item.type === `App\\Notifications\\SubscriptionSuccess`) {
      return {
        title: "Assinatura confirmada",
        desc: `A sua assinatura foi confirmada.`,
      };
    }
    if (item.type === `App\\Notifications\\GuardianKickedYouOffTheTeam`) {
      return {
        title: "Você foi removido do time",
        desc: `Agora você está cadastrado como individual no desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\YouAreTheNewGuardianOfTheTeam`) {
      return {
        title: "Você é o novo guardiao",
        desc: `Agora você é o guardião do time ${item.data?.team_name} no desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\MentorSendFeedback`) {
      return {
        title: "Um mentor deu um feedback",
        desc: `Um mentor deu um feedback no desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\UserSendComment`) {
      return {
        title: "Um usuário comentou o feedback",
        desc: `Um usuário comentou o feedback no desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\JudgeSendAvaliation`) {
      return {
        title: "Um juiz fez uma avaliação",
        desc: `Um juiz fez uma avaliação no desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\NewPostOnForum`) {
      return {
        title: "Uma nova postagem foi feita no forum",
        desc: `Uma nova postagem foi feita no forum ${item.data?.forum_name} no desafio ${item.data?.challenge_name}.`,
      };
    }
    if (item.type === `App\\Notifications\\MentorSentFeedback`) {
      return {
        title: "Novo feedback do mentor",
        desc: `O mentor ${item.data?.mentor_name} enviou um feedback para o projeto ${item.data?.project_name} do desafio ${item.data?.challenge_name}.`,
      };
    }
  };

  return (
    <span className={styles.wrapper}>
      <button
        onClick={() =>
          isOpen === "notification" ? open("") : open("notification")
        }
        className={styles.invites}
      >
        <img src={bell} alt="Notificações" />
        {data?.length > 0 && (
          <span className={styles.invites__count}>{data.length}</span>
        )}
        {isOpen === "notification" && (
          <img className={styles.card__arrow} src={arrow} alt="Arrow" />
        )}
      </button>
      {isOpen === "notification" && (
        <Card className={styles.card}>
          <header className={styles.card__header}>
            <Title size={18}>Notificações</Title>
            <span
              onClick={() => handleReadAll()}
              className={styles.card__header__mark}
            >
              Marcar todas como lidas
            </span>
          </header>
          <div className={styles.card__wrapper}>
            {data?.length > 0 &&
              !loading &&
              data?.map((item) => (
                <div
                  className={styles.invites__card}
                  onClick={() => handleRead(item.id)}
                >
                  <div className={styles.invites__content}>
                    <Title size={14}>{setTextByType(item)?.title}</Title>
                    <Text style={{ marginTop: 4 }} size={12}>
                      {setTextByType(item)?.desc}
                    </Text>
                  </div>
                </div>
              ))}
          </div>
          {data?.length === 0 && !loading && (
            <div className={styles.card__empty}>
              <Text size={14}>Não há novas notificações</Text>
            </div>
          )}
          {loading && (
            <div className={styles.card__empty}>
              <Loading />
            </div>
          )}
        </Card>
      )}
    </span>
  );
};

export { Notification };
