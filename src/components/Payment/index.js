import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { CardElement } from "@stripe/react-stripe-js";
// import { StripeProvider, Elements, CardElement } from "react-stripe-elements";
import { Text, Title } from "components/Text";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Dialog } from "components/Dialog";
import Button from "components/Button";
// import { Loading } from "components/Loading";

import styles from "./styles.module.sass";

import { BASEURL } from "utils/api";

import defaultImage from "assets/components/MainImage/image.png";

import { intent, sucess } from "services/payment";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx", {
  locale: "pt-BR",
});

const Payment = (props) => {
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: challenges } = useSelector((state) => state.challenges);

  useEffect(() => {
    const modal = document.getElementById("ModalPage");
    if (props.isOpen && modal?.style) {
      modal.style.overflow = `hidden`;
      modal.scrollTop = -500;
    }
    return () => {
      if (modal?.style) modal.style.overflow = "auto";
    };
  }, [props.isOpen]);

  useEffect(() => {
    dispatch(intent(usertype));
  }, [dispatch, usertype]);

  return (
    <Elements stripe={stripePromise}>
      <Dialog
        className={styles.dialog}
        header={props.header}
        handleClose={props.handleClose}
      >
        <div className={styles.wrapper}>
          {/* <div className={styles.infos}>
            <div className={styles.infos__content}>
              <div className={styles.others}>
                Você terá acesso a este e mais outros desafios, como:
                <div className={styles.others__challenges}>
                  {!!challenges &&
                    challenges
                      ?.filter((item) => item.challenge_type === "autodesafio")
                      .map((item, index) => (
                        <Card style={{ padding: 12 }} key={index}>

                          <Title size={14}>{item.name}</Title>
                        </Card>
                      ))}
                </div>
              </div>
            </div>
          </div> */}
          <div className={styles.form}>
            <Title style={{ marginBottom: 12 }}>{props.title}</Title>
            <Text>{props.desc}</Text>
            <div className={styles.price}>
              R${props.price}
              <Text size={12}>{props.typeOfPayment}</Text>
            </div>
            <PaymentForm />
          </div>
        </div>
      </Dialog>
    </Elements>
  );
};

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState(null);

  // const handleChange = async (event) => {
  //   // Listen for changes in the CardElement
  //   // and display any errors as the customer types their card details
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // };
  // const handleSubmit = async ev => {
  //   ev.preventDefault();
  //   setProcessing(true);
  //   const payload = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement)
  //     }
  //   });
  //   if (payload.error) {
  //     setError(`Payment failed ${payload.error.message}`);
  //     setProcessing(false);
  //   } else {
  //     setError(null);
  //     setProcessing(false);
  //     setSucceeded(true);
  //   }
  // };

  return (
    <form>
      <Text className={styles.payment__desc}>
        Preencha os dados de seu cartão abaixo para realizar a aquisição.
      </Text>
      <Title size={14} style={{ marginLeft: 0, marginBottom: 6 }}>
        Pagamento
      </Title>
      <div className={styles.card__row}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <Text size={14} style={{ marginTop: 12 }}>
        Caso tenha alguma dúvida, mande um e-mail para contato@mundojix.com
      </Text>
      <div className={styles.button}>
        <Button Tag={"button"} type={"green"} submit>
          Assinar
        </Button>
      </div>
    </form>
  );
};

export { Payment };
