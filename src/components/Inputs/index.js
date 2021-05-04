import React from "react";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import Select from "react-select";

import { Text } from "components/Text";

import styles from "./styles.module.sass";

import Photo from "assets/components/Input/PhotoUpload.svg";
import search from "assets/components/Input/search.svg";

// TODO
// 1 - Mascaras https://codesandbox.io/s/react-hook-form-gv5su?file=/src/App.js:149-457
// 2 - Mudar a posição dos elementos isMulti do Select
// 3 - search

const Search = () => (
  <button className={styles.search}>
    <img src={search} alt={search} />
  </button>
);

const InputGroup = ({ children, name, ref }) => (
  <fieldset ref={ref} name={name} className={styles.wrapper}>
    {children}
  </fieldset>
);

const AddGroup = ({ children, text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.addGroup}>
      <span>+</span>
      {text ? text : "Adicionar"}
    </button>
  );
};

const RemoveGroup = ({ children, text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.removeGroup}>
      {text ? text : "Remover"}
    </button>
  );
};

const InputFile = React.forwardRef((props, ref) => (
  <div className={styles.upload}>
    <button type="button">Escolher arquivo</button>
    Nenhum arquivo selecionado
  </div>
));

const Input = React.forwardRef(
  (
    {
      defaultValue,
      disabled,
      name,
      value,
      placeholder,
      type,
      onChange,
      children,
      checked,
      errors,
      errorMessage,
      onKeyUp,
    },
    ref,
    ...rest
  ) => (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      }  ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.name}>{children}</span>
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        type={type ? type : "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  )
);

const Textarea = React.forwardRef(
  (
    {
      name,
      rows,
      value,
      placeholder,
      type,
      onChange,
      children,
      checked,
      errors,
      errorMessage,
    },
    ref
  ) => (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      } `}
    >
      <span className={styles.name}>{children}</span>
      <textarea
        rows={rows ? rows : 8}
        name={name}
        type={"textarea"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
      />
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  )
);

const SelectInput = React.forwardRef((props, ref) => {
  const {
    name,
    // value,
    // placeholder,
    // type,
    // onChange,
    children,
    // control,
    errors,
    errorMessage,
    // options,
    // isMulti,
  } = props;
  return (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      } `}
    >
      <span className={styles.name}>{children}</span>
      <Controller
        // isMulti={isMulti}
        // name={name}
        // control={control}
        // options={options}
        // placeholder={placeholder}
        {...props}
        as={
          <Select
            styles={{
              placeholder: (provided, state) => ({
                ...provided,
                fontFamily: "Noto Sans",
                fontSize: 12,
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: 12,
              }),
              singleValue: (provided, state) => ({
                ...provided,
                fontSize: 12,
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              input: (provided, state) => ({
                ...provided,
                fontSize: 12,
              }),
              menu: (provided, state) => ({
                ...provided,
                zIndex: 12,
              }),
              control: (provided, state) => ({
                ...provided,
                border: "1px solid #B3BBBE",
                minHeight: 42,
              }),
              container: (provided, state) => ({
                ...provided,
                width: "100%",
              }),
            }}
            innerRef={ref}
          />
        }
      />
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  );
});

const InputWithMask = React.forwardRef((props, ref) => {
  const {
    name,
    defaultValue,
    mask,
    value,
    placeholder,
    type,
    onChange,
    children,
    errors,
    control,
    errorMessage,
    onKeyPress,
    onKeyUp,
  } = props;
  // console.log(errors)
  return (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      } `}
    >
      <span className={styles.name}>{children}</span>
      <Controller
        as={<InputMask inputRef={ref} />}
        control={control}
        errors={errors}
        // inputRef={ ref }
        name={name}
        type={type ? type : "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        mask={mask}
        defaultValue={defaultValue}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
      />
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  );
});

const Checkbox = React.forwardRef((props, ref) => {
  const {
    defaultChecked,
    disabled,
    onClick,
    name,
    value,
    placeholder,
    onChange,
    children,
    checked,
  } = props;

  return (
    <label
      className={`${styles.inputCheckbox} ${disabled ? styles.disabled : ""}`}
    >
      <input
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        ref={ref}
      />
      <span>{children}</span>
    </label>
  );
});

const PhotoUpload = React.forwardRef((props, ref) => {
  const {
    file,
    name,
    // value,
    // placeholder,
    onChange,
    // onClick,
    // children,
    // checked,
    image,
  } = props;

  //   const blob = new Blob(image);

  //   const reader = new FileReader();
  //   const redable = reader.readAsDataURL(blob);
  //   // const handleClick = (e) => {
  //   //     e.preventDefault()
  //   console.log(redable);

  // }

  return (
    <div className={styles.PhotoUpload}>
      <img src={image} alt="" />
      <label>
        <img src={file ? file : Photo} alt="Upload de foto" />
        <Text tag="span" size="10" weight="bold">
          Inserir foto
        </Text>
        <input
          accept="image/*"
          name={name}
          ref={ref}
          type="file"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </label>
    </div>
  );
});

export {
  Search,
  InputGroup,
  AddGroup,
  RemoveGroup,
  Input,
  Textarea,
  SelectInput,
  Checkbox,
  InputWithMask,
  PhotoUpload,
  InputFile,
};
