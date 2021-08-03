import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { InviteCard } from "components/InviteCard";
import { Loading } from "components/Loading";
import Button from "components/Button";
import { Input } from "components/Inputs";

import { searchPerson } from "services/team";
import { get } from "services/project";

import styles from "./styles.module.sass";

const Invites = (props) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const [invites, setInvites] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [addedText, setAddedText] = useState("Adicionado");
  const { data, loading } = useSelector((state) => state.team);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: project } = useSelector((state) => state.project);

  const { id } = useParams();

  useEffect(() => {
    dispatch(get(usertype, { challenge_id: id }));
  }, [dispatch, usertype, id]);

  useEffect(() => {
    dispatch(
      searchPerson(props.usertype, {
        challenge_id: window.localStorage.getItem("current_team"),
        name: "",
      })
    );
  }, [dispatch, props.usertype, props.id]);

  useEffect(() => {
    setUsers(data?.data?.data);
  }, [data]);

  useEffect(() => {
    project?.teammates.length &&
      setExcludes(
        [...project?.teammates].filter((item) => item.id).map((user) => user.id)
      );
  }, [project?.teammates]);

  const handleSearch = (event) => {
    setUsers((state) =>
      [...data?.data?.data].filter(
        (user) =>
          user.name.toLowerCase().includes(event.target.value.toLowerCase())
        // ||
        // user.description
        //   .toLowerCase()
        //   .includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleInvites = (invite) => {
    if (!invites.includes(invite) && excludes.length + invites.length < 4) {
      setInvites((prev) => [...prev, invite]);
    } else {
      setInvites((prev) => [...prev].filter((i) => i !== invite));
    }
  };

  return (
    <>
      <section className={styles.search}>
        <Input
          style={{ fontSize: 20 }}
          disabled={loading}
          onChange={handleSearch}
          placeholder={"Digite para procurar usuários"}
        >
          Pesquisar
        </Input>
      </section>
      <section className={styles.invites}>
        {loading && <Loading />}
        {users &&
          users.map((item, index) => (
            <InviteCard key={item.id} data={item}>
              <Button
                Tag="span"
                type={invites.includes(item.id) ? `gray` : `tertiary`}
                onClick={() => handleInvites(item.id)}
                // onPointerOver={() =>
                //   invites.includes(item.id) && setAddedText("Remover?")
                // }
                onPointerOut={() =>
                  invites.includes(item.id) && setAddedText("Adicionado")
                }
              >
                {!invites.includes(item.id) ? "Convidar" : addedText}
              </Button>
            </InviteCard>
          ))}
        {users?.length === 0 && <>Não encontramos esta pessoa</>}
      </section>
      {(!!invites.length || !!excludes.length) && (
        <section className={styles.banner}>
          {invites.length + excludes.length < 4 ? (
            <>
              Você selecionou {invites.length}{" "}
              {!!excludes.length
                ? `e já convidou ${excludes.length} pessoa${
                    excludes.length !== 1 ? `s` : ``
                  }`
                : `pessoas`}
              . Ainda restam {4 - (invites.length + excludes.length)} vagas
            </>
          ) : (
            <>Seu time está completo!</>
          )}
          <Button
            Tag={"span"}
            onClick={() => props.handleAppendInvite(invites)}
            type={"green"}
            style={{ marginLeft: 12 }}
          >
            Enviar convites
          </Button>
        </section>
      )}
    </>
  );
};

export { Invites };
