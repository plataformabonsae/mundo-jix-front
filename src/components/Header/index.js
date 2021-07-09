import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Text } from "components/Text";
import { Loading } from "components/Loading";
import { Invites } from "components/Invites";
import { Notification } from "components/Notification";

import styles from "./styles.module.sass";
import { BASEURL } from "utils/api";

import profile from "assets/logo/JixProfile.png";
import { dashboardFetch } from "services/dashboard";

const Header = ({ name, invites, user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState("");
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: dashboard } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardFetch(usertype));
  }, [dispatch, usertype]);

  const handleOpen = (wich) => setOpen(wich);

  return (
    <header className={styles.header}>
      <div className={styles.welcome}>
        <img
          src={user?.file ? BASEURL + user.file : profile}
          alt={user?.name}
        />
        <div>
          <Text size={18} className={styles.text}>
            {(user?.name || user?.last_name) && "Boas vindas,"}
          </Text>
          <Text size={18} weight={"bold"} className={styles.name}>
            {user?.name ? user.name : <Loading inline size={16} />}{" "}
            {user?.last_name ? user.last_name : ""}
          </Text>
        </div>
      </div>
      <div className={styles.points}>
        <Text size={16} weight={"bold"} className={styles.text}>
          {dashboard?.finished_challenges?.points}
        </Text>
        <Text size={10} weight={"bold"} className={styles.text}>
          pontos
        </Text>
      </div>
      <div className={styles.alerts}>
        {usertype === "talento" && <Invites isOpen={open} open={handleOpen} />}
        <Notification isOpen={open} open={handleOpen} />
      </div>
    </header>
  );
};

const SubHeader = ({ children, style }) => {
  return (
    <header style={style} className={styles.subheader}>
      {children}
    </header>
  );
};

export { Header, SubHeader };
