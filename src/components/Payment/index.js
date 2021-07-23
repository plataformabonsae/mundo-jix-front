import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { CardElement } from "@stripe/react-stripe-js";
// import { StripeProvider, Elements, CardElement } from "react-stripe-elements";
import { toast } from "react-toastify";
import { Text, Title } from "components/Text";
import { Input, InputWithMask, InputGroup } from "components/Inputs";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Cards from "react-credit-cards";
import { loadStripe } from "@stripe/stripe-js";

import { Dialog } from "components/Dialog";
// import { Dialog } from "components/Dialog";
import Button from "components/Button";
import { Loading } from "components/Loading";

import styles from "./styles.module.sass";
import "react-credit-cards/es/styles-compiled.css";

import { BASEURL } from "utils/api";

import defaultImage from "assets/components/MainImage/image.png";

import { intent, success, subscription } from "services/payment";
import { get } from "services/challenges";
import { get as getUser } from "services/auth";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx", {
//   locale: "pt-BR",
// });

const stripePromise = loadStripe(
  "pk_test_51IIxAkEkTYY014cfnr4vsRogzVMhLgJBido5Duigk3srIx3sZdGzPq8y8B0YIrUdwTi2ODwjEe5tSINQZMXJkyZI00sfC1H9tr",
  {
    locale: "pt-BR",
  }
);

// pk_test_TYooMQauvdEDq54NiTphI7jx
// sk_test_51IIxAkEkTYY014cfttoNWdOCujBZS7FabOGhwJjPtmidt4mNRzEpC7w6CPDnBdI1JgPmoEsQog5oa2mqpgbbrQbx00pgozpTlf
// pk_test_51IIxAkEkTYY014cfnr4vsRogzVMhLgJBido5Duigk3srIx3sZdGzPq8y8B0YIrUdwTi2ODwjEe5tSINQZMXJkyZI00sfC1H9tr

const Payment = (props) => {
  const dispatch = useDispatch();
  const { data: usertype } = useSelector((state) => state.usertype);
  const [stripeInfo, setStripeInfo] = useState("");
  // const { data: challenges } = useSelector((state) => state.challenges);
  // const { data: challenge } = useSelector((state) => state.challenge);
  const { data: payment } = useSelector((state) => state.payment);

  // useEffect(() => {
  //   dispatch()
  // }, [dispatch, usertype])

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
    if (props.id && !props.subscription) {
      dispatch(intent(usertype, { challenge_id: props.id }));
      console.log(props.id);
    }
  }, [dispatch, usertype, props.id, props.subscription]);

  useEffect(() => {
    payment &&
      setStripeInfo({
        stripe_id: payment?.stripe_id,
        client_secret: payment?.client_secret,
      });
  }, [payment]);

  return (
    <Elements stripe={stripePromise}>
      <Dialog
        className={styles.dialog}
        header={props.header}
        handleClose={props.handleClose}
      >
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <Title style={{ marginBottom: 12 }}>{props.title}</Title>
            <Text>{props.desc}</Text>
            <div className={styles.price}>
              R${props.price}
              <Text size={12}>{props.typeOfPayment}</Text>
            </div>
            {props.subscription ? (
              <SubscriptionForm
                currentChallenge={props.currentChallenge}
                handleClose={props.handleClose}
              />
            ) : (
              <PaymentForm data={stripeInfo} handleClose={props.handleClose} />
            )}
          </div>
        </div>
        <div className={styles.disclaimer}>
          Todos os pagamentos são processados via © Stripe.
        </div>
      </Dialog>
    </Elements>
  );
};

const PaymentForm = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  // const [disabled, setDisabled] = useState(null)
  const [processing, setProcessing] = useState(null);
  const [succeeded, setSucceeded] = useState(null);
  const [error, setError] = useState(null);

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: challenge } = useSelector((state) => state.challenge);

  // const handleChange = async (event) => {
  //   // Listen for changes in the CardElement
  //   // and display any errors as the customer types their card details
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(payload);
      dispatch(
        success(usertype, {
          payment_id: payload.paymentIntent.id,
          challenge_id: challenge?.challenge?.id,
        })
      )
        .then((res) => {
          toast.success("Pagamento efetuado com sucesso", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .then(() => {
          dispatch(get(usertype, { challenge_id: challenge?.challenge?.id }));
        });
    }
  };

  // useState(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <Text className={styles.payment__desc}>
        Preencha os dados de seu cartão abaixo para realizar a aquisição.
      </Text>
      <Title size={14} style={{ marginLeft: 0, marginBottom: 6 }}>
        Pagamento
        {processing && "Processando pagamento..."}
        {error && (
          <div className={styles.error}>
            Algum erro ocorreu ao efetuar o pagamento. Tente novamente
          </div>
        )}
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
        {processing ? (
          <Loading />
        ) : (
          <Button
            style={{ width: "100%" }}
            Tag={"button"}
            type={"green"}
            submit
          >
            Adiquirir
          </Button>
        )}
      </div>
    </form>
  );
};

const SubscriptionForm = (props) => {
  const dispatch = useDispatch();
  const [cardInfo, setCardInfo] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const { handleSubmit, errors, control, register } = useForm();
  const {
    // data: payment,
    loading,
    error,
  } = useSelector((state) => state.payment);
  const { data: user } = useSelector((state) => state.user);
  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: challenge } = useSelector((state) => state.challenge);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCardInfo((prev) => (prev.focus = e.target.name));
  };

  const handleDate = (val) => {
    let value = val;
    let array = value.split("/").map((x) => +x);
    const date = new Date(array[1], array[0] - 1, 1);

    return date.getTime() && date > new Date();
  };

  const onSubmit = (data) => {
    const { number, expiry, cvc } = data;
    let card_number = number.replace(/\s+/g, "");
    let card_exp_month = expiry.split("/")[0];
    let card_exp_year = expiry.split("/")[1];
    let card_cvc = cvc.replace(/_/g, "");
    dispatch(
      subscription(usertype, {
        client_id: user.user.id,
        card_number,
        card_exp_month,
        card_exp_year,
        card_cvc,
      })
    )
      .then((res) => {
        toast.success("Assinatura efetuada com sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .then(() => {
        dispatch(getUser(usertype));
      })
      .then(() => props.handleClose())
      .catch((error) => {
        // toast.error("Algum erro ocorreu ao enviar o comentário", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        // });
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.credit__wrapper}>
        <Cards
          cvc={cardInfo.cvc}
          expiry={cardInfo.expiry}
          focused={cardInfo.focus}
          name={"  "}
          number={cardInfo.number}
        />
        <div className={styles.credit__form}>
          <InputGroup>
            <InputWithMask
              // value={cardInfo.card_number}
              ref={register()}
              rules={{
                required: {
                  value: true,
                  message: "Insira o número do cartão",
                },
              }}
              disabled={loading}
              errors={errors}
              control={control}
              errorMessage={errors["number"]?.message}
              name="number"
              onKeyUp={handleInputChange}
              placeholder="Número do cartão de crédito"
              mask={"9999 9999 9999 9999"}
              onFocus={handleInputFocus}
            >
              Número do cartão
            </InputWithMask>
          </InputGroup>
          <InputGroup>
            <InputWithMask
              ref={register()}
              disabled={loading}
              errors={errors}
              control={control}
              rules={{
                validate: {
                  isValid: (val) => handleDate(val) || "Insira uma data válida",
                },
                // valueAsDate: true,
              }}
              errorMessage={errors["expiry"]?.message}
              name="expiry"
              onKeyUp={handleInputChange}
              placeholder="12/2022"
              mask={"99/9999"}
              onFocus={handleInputFocus}
            >
              Data de expiração
            </InputWithMask>
          </InputGroup>
          <InputGroup>
            <InputWithMask
              disabled={loading}
              ref={register()}
              rules={{
                required: {
                  value: true,
                  message: "Insira o CVC/CVV do cartão",
                },
              }}
              errors={errors}
              control={control}
              name="cvc"
              onKeyUp={handleInputChange}
              placeholder="123"
              onFocus={handleInputFocus}
              mask={"9999"}
            >
              CVC/CVV
            </InputWithMask>
          </InputGroup>
        </div>
      </div>
      {error && (
        <div className={styles.error}>
          Algum erro ocorreu ao fazer a assinatura. Tente novamente
        </div>
      )}
      <Text size={14} style={{ marginTop: 12 }}>
        Caso tenha alguma dúvida, mande um e-mail para contato@mundojix.com
      </Text>
      <Button
        style={{ width: "100%", marginTop: 12 }}
        disabled={
          !(cardInfo.cvc && cardInfo.expiry && cardInfo.number) || loading
        }
        type={"green"}
        Tag={"button"}
        submit
      >
        Assinar
      </Button>
    </form>
  );
};

export { Payment };
