import React, { useState, useCallback, useEffect } from "react";

import { Card } from "components/Card";

import styles from "./styles.module.sass";

const PasswordChecker = (props) => {
  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters
  const [passwordMatch, setPasswordMatch] = useState(false); // passwords match /d x/d

  const { password, confirmPassword, isValid, setValid } = props;

  // labels and state boolean corresponding to each validation
  const mustContainData = [
    ["Uma letra maiúscula (A-Z)", containsUL],
    ["Uma letra miníscula (a-z)", containsLL],
    ["Um número (0-9)", containsN],
    ["Caractere especial (!@#$)", containsSC],
    ["Pelo menos 8 caracteres", contains8C],
    ["Senhas iguais", passwordMatch],
  ];

  useEffect(() => {
    console.log(password);
    const validatePassword = () => {
      console.log("validate");
      // has uppercase letter
      if (password.toLowerCase() !== password) setContainsUL(true);
      else setContainsUL(false);

      // has lowercase letter
      if (password.toUpperCase() !== password) setContainsLL(true);
      else setContainsLL(false);

      // has number
      if (/\d/.test(password)) setContainsN(true);
      else setContainsN(false);

      // has special character
      if (/[^A-Za-z 0-9]/g.test(password)) setContainsSC(true);
      else setContainsSC(false);

      // has 8 characters
      if (password.length >= 8) setContains8C(true);
      else setContains8C(false);

      // passwords match
      if (password !== "" && password === confirmPassword)
        setPasswordMatch(true);
      else setPasswordMatch(false);

      // all validations passed
      if (
        containsUL &&
        containsLL &&
        containsN &&
        containsSC &&
        contains8C &&
        passwordMatch
      )
        setValid(true);
      else setValid(false);
    };
    (password || confirmPassword) && validatePassword();
  }, [
    password,
    confirmPassword,
    containsUL,
    containsLL,
    containsN,
    containsSC,
    contains8C,
    setValid,
    passwordMatch,
  ]);

  if (!isValid) {
    return (
      <Card className={styles.passwordTooltip} style={props.style}>
        {mustContainData.map((data) => (
          <li
            className={`${styles.passwordTooltip__item} ${
              data[1] && styles.passwordTooltip__item__done
            }`}
          >
            {data[0]}
          </li>
        ))}
      </Card>
    );
  } else return null;
};

export { PasswordChecker };
