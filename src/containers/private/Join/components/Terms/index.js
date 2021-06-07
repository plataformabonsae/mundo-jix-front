import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import parse from "html-react-parser";

import { useDispatch, useSelector } from "react-redux";

import { Card } from "components/Card";
import { Loading } from "components/Loading";
import { Checkbox } from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import styles from "./styles.module.sass";

import { edit } from "services/auth";
import { getTerms } from "services/terms";

const Terms = ({ children, type, id = 1 }) => {
  const [accept, setAccept] = useState(false);
  const { register, handleSubmit } = useForm();

  const props = useSpring({ opacity: !accept ? 1 : 0 });

  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.user);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: terms, loading: termsLoading } = useSelector(
    (state) => state.terms
  );

  useEffect(() => {
    dispatch(getTerms(usertype));
  }, [dispatch, usertype]);

  useEffect(() => {
    setAccept(Number(user?.user?.accepted_terms) === 1 ? true : false);
    console.log(user?.user?.accepted_terms);
  }, [user]);

  const onSubmit = async (data) => {
    let { accepted_terms: accepted } = data;
    console.log(accepted ? (accepted = 1) : (accepted = 0));
    accepted ? (accepted = 1) : (accepted = 0);
    await dispatch(
      edit(type, {
        name: user.user.name,
        email: user.user.email,
        accepted_terms: accepted,
      })
    )
      .then(() => setAccept(data.accepted_terms))
      .then(() => window.localStorage.setItem("accepted_terms", accepted))
      .catch((error) => {
        console.log(error.response.data);
        toast.error(
          "Um erro ocorreu ao tentar enviar os dados. Tente novamente",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      });
  };

  return (
    <section>
      <Card>
        {termsLoading ? <Loading /> : parse(terms?.data?.data?.terms || "")}
      </Card>

      <Card>
        <Checkbox
          disabled={loading}
          checked={accept}
          ref={register()}
          name="accepted_terms"
          onChange={handleSubmit(onSubmit)}
        >
          Concordo e desejo continuar
        </Checkbox>
      </Card>

      {console.log(terms)}

      {accept ? (
        usertype === "empresa" || usertype === "talento" ? (
          <ButtonGroup>
            <div className={styles.mustConfirm}>
              Você prefere terminar o cadastro agora ou depois?
            </div>
            <Button
              // Tag={`button`}
              to={`/dashboard`}
              type="outlineWhite"
            >
              Completar depois
            </Button>
            <Button to={`/join/${type}/pessoal`} type="secondary">
              Completar agora
            </Button>
          </ButtonGroup>
        ) : (
          <Button to={`/${usertype}/desafio/${id}`} type="secondary">
            Continuar
          </Button>
        )
      ) : (
        <>
          <span className={styles.mustConfirm}>
            Você precisa confirmar que leu os termos e condições para continuar
            o cadastro.
          </span>
        </>
      )}

      <animated.div style={props}></animated.div>
    </section>
  );
};

export default Terms;
