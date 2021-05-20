import React, { useEffect, useState } from "react";
// import {useParams} from 'react-redux'
import { useDispatch, useSelector } from "react-redux";

import { InviteCard } from "components/InviteCard";
import Button from "components/Button";
import { Input } from "components/Inputs";

import { searchPerson } from "services/team";

import styles from "./styles.module.sass";

const Invites = (props) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const [invites, setInvites] = useState([]);
  const [addedText, setAddedText] = useState("Adicionado");
  const { data, loading } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(
      searchPerson(props.usertype, { challenge_id: props.id, name: "" })
    );
  }, [dispatch, props.usertype, props.id]);

  useEffect(() => {
    setUsers(data?.data?.data);
  }, [data]);

  useEffect(() => {
    console.log(invites);
  }, [invites]);

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
    if (!invites.includes(invite) && invites.length < 5) {
      setInvites((prev) => [...prev, invite]);
    } else {
      setInvites((prev) => [...prev].filter((i) => i !== invite));
    }
  };

  return (
    <>
      <section className={styles.search}>
        <Input
          fontSize={20}
          style={{ fontSize: 34 }}
          disabled={loading}
          onChange={handleSearch}
          placeholder={"Digite para procurar usuários"}
        >
          Pesquisar
        </Input>
      </section>
      <section className={styles.invites}>
        {users &&
          users.map((item, index) => (
            <InviteCard key={item.id} data={item}>
              <Button
                disabled={invites.includes(item.id)}
                Tag="span"
                type={"tertiary"}
                onClick={() => handleInvites(item.id)}
                onPointerOver={() =>
                  invites.includes(item.id) && setAddedText("Remover?")
                }
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
      {!!invites.length && (
        <section className={styles.banner}>
          {invites.length < 5 ? (
            <>
              Você selecionou {invites.length} pessoas. Ainda restam{" "}
              {5 - invites.length} vagas
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
            Finalizar Inscrição
          </Button>
        </section>
      )}
    </>
  );
};

export { Invites };
