import React from "react";

import { Card } from "components/Card";
// import { Loading } from "components/Loading"
import { Title } from "components/Text";
import { InputGroup, Input } from "components/Inputs";
import Button from "components/Button";
import { ButtonGroup } from "components/ButtonGroup";

import "react-toastify/dist/ReactToastify.css";

const Job = ({ noShadow = true, data, handleClose }) => {
  return (
    <>
      <div style={{ maxWidth: 768, margin: "16px auto" }}>
        <Card noShadow={noShadow}>
          <Title style={{ margin: "32px 0" }}>Sobre a vaga</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Remuneração
          </Title>
          <InputGroup>
            <span style={{ position: "relative", top: 20 }}>R$</span>
            <Input readOnly value={data?.remuneration}></Input>
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Experiência</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Nível de experiência
          </Title>
          <InputGroup>
            <Input readOnly value={data?.experience_type}></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Anos de experiência
          </Title>
          <InputGroup>
            <Input readOnly value={data?.experience_years}></Input>
          </InputGroup>
        </Card>

        <Card noShadow={noShadow}>
          <Title style={{ marginBottom: 32 }}>Local de trabalho</Title>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            CEP
          </Title>
          <InputGroup>
            <Input readOnly value={data?.cep}></Input>
          </InputGroup>
          <InputGroup>
            <div style={{ width: "50%" }}>
              <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                Estado
              </Title>
              <InputGroup>
                <Input readOnly value={data?.state}></Input>
              </InputGroup>
            </div>
            <div style={{ width: "50%" }}>
              <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
                Cidade
              </Title>

              <InputGroup>
                <Input readOnly value={data?.city}></Input>
              </InputGroup>
            </div>
          </InputGroup>

          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Rua
          </Title>
          <InputGroup>
            <Input readOnly value={data?.address}></Input>
          </InputGroup>

          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Bairro
          </Title>
          <InputGroup>
            <Input readOnly value={data?.neighborhood}></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Número
          </Title>
          <InputGroup>
            <Input readOnly value={data?.number}></Input>
          </InputGroup>
          <Title size={14} style={{ marginLeft: 6, marginTop: 12 }}>
            Complemento
          </Title>
          <InputGroup>
            <Input readOnly value={data?.complement}></Input>
          </InputGroup>
        </Card>

        <ButtonGroup>
          <Button
            style={{ marginRight: 30 }}
            Tag={"span"}
            onClick={handleClose}
            type="secondary"
          >
            Fechar
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export { Job };
