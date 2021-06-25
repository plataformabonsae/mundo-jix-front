import React, { useEffect } from "react";
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

  const setTextByType = (type) => {
    if (type === `App\\Notifications\\UserWantsYouJoiningHisTeam`) {
      return "joinHisTeam";
    }
    if (type === `App\\Notifications\\UserWantsJoinYourTeam`) {
      return "joinYourTeam";
    }
    if (type === `App\\Notifications\\ChallengeEndingInOneDay`) {
      return "endingOneDay";
    }
    if (type === `App\\Notifications\\ChallengeEndingInTwoDays`) {
      return "endingTwoDays";
    }
    if (type === `App\\Notifications\\ChallengeEndingInThreeDay`) {
      return "endingThreeDays";
    }
    if (type === `App\\Notifications\\ChallengePurchaseAvailable`) {
      return "purchaseAvailable";
    }
    if (type === `App\\Notifications\\GuardianAcceptedYourRequest`) {
      return "guardianAcceptedRequest";
    }
    if (type === `App\\Notifications\\GuardianRefusedYourRequest`) {
      return "guardianRefusedRequest";
    }
    if (type === `App\\Notifications\\GuardianSentProject`) {
      return "guardianSentProject";
    }
    if (type === `App\\Notifications\\PremiumPurchaseFail`) {
      return "premiumPurchaseFail";
    }
    if (type === `App\\Notifications\\PremiumPurchaseSuccess`) {
      return "premiumPurchaseSuccess";
    }
    if (type === `App\\Notifications\\SubscriptionOff`) {
      return "subscriptionOff";
    }
    if (type === `App\\Notifications\\SubscriptionSuccess`) {
      return "subscriptionSuccess";
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
                    <Title size={14}>
                      {setTextByType(item.type) === "joinHisTeam" &&
                        "Convite para o time:"}{" "}
                      {item.data.team_name || ""}
                    </Title>
                    <Text style={{ marginTop: 4 }} size={12}>
                      {setTextByType(item.type) === "teamInvite" &&
                        "Convidado por "}
                      {item.data.guardian_name || ""}
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
