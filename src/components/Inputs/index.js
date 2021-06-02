import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import Select from "react-select";

import { Text } from "components/Text";
import Button from "components/Button";
// import { ButtonGroup } from "components/ButtonGroup";
import { Dialog } from "components/Dialog";
import { BASEURL } from "utils/api";

import styles from "./styles.module.sass";

import { cropImage } from "utils/etc";

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

const InputGroup = ({ style, children, name, ref }) => (
  <fieldset style={style} ref={ref} name={name} className={styles.wrapper}>
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

const InputFile = React.forwardRef(
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
      accept,
      validate,
      fontSize,
      validation,
      ...rest
    },
    ref
  ) => (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      }  ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.name}>{children}</span>
      <div className={styles.upload}>
        <input
          accept={accept}
          name={name}
          ref={ref}
          type="file"
          style={{ fontSize: fontSize }}
          // style={{ display: "none" }}
          onChange={onChange}
          {...rest}
        />
        {/* <button type="button">Escolher arquivo</button> */}
        {/* Nenhum arquivo selecionado */}
      </div>
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  )
);

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
      validate,
      fontSize,
      ...rest
    },
    ref
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
        style={{ fontSize: fontSize }}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyUp}
        ref={ref}
        {...rest}
      />
      <div className={styles.error}>
        {(errors?.[name] && errorMessage) || (validate ? validate : null)}
      </div>
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
      ...props
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
        {...props}
      />
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  )
);

const SelectInput = React.forwardRef((props, ref) => {
  const {
    name,
    // value,
    placeholder,
    // type,
    // onChange,
    children,
    // control,
    errors,
    errorMessage,
    defaultValue,
    // options,
    control,
    isMulti,
    options,
    onChange,
    value,
  } = props;
  return (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      } `}
    >
      <span className={styles.name}>{children}</span>
      <Controller
        name={name}
        control={control}
        options={options}
        {...props}
        defaultValue={defaultValue}
        // value={options.value}
        isMulti={isMulti}
        // as={
        render={({ onChange, value, name, ref }) => (
          <Select
            inputRef={ref}
            isMulti={isMulti}
            placeholder={placeholder}
            options={options}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val.value)}
            styles={{
              placeholder: (provided, state) => ({
                ...provided,
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
        )}
      />
      <div className={styles.error}>{errors?.[name] && errorMessage}</div>
    </label>
  );
});

const SelectInputMulti = React.forwardRef((props, ref) => {
  const {
    name,
    // value,
    placeholder,
    // type,
    // onChange,
    children,
    // control,
    errors,
    errorMessage,
    defaultValue,
    // options,
    control,
    isMulti,
    options,
    onChange,
    value,
  } = props;
  return (
    <label
      className={` ${styles.input} ${
        errors?.[name]?.type === "required" ? styles.required : ""
      } `}
    >
      <span className={styles.name}>{children}</span>
      {/* <Controller
        name={name}
        control={control}
        {...props}
        // value={options.value}
        // isMulti={isMulti}
        // as={
        render={({ name, ref }) => ( */}
      <Select
        options={options}
        defaultValue={defaultValue}
        inputRef={ref}
        isMulti
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        styles={{
          placeholder: (provided, state) => ({
            ...provided,
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
      {/* )}
      /> */}
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
    required,
    rules,
    validate,
    ...rest
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
        as={<InputMask />}
        // inputRef={ref}
        control={control}
        errors={errors}
        rules={rules}
        name={name}
        type={type ? type : "text"}
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        mask={mask}
        defaultValue={defaultValue || ""}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        {...rest}
      />
      <div className={styles.error}>
        {(errors?.[name] && errorMessage) || (validate ? validate : null)}
      </div>
    </label>
  );
});

const Checkbox = React.forwardRef((props, ref) => {
  const {
    defaultValue,
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
        defaultValue={defaultValue}
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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [photoSelected, setPhotoSelected] = useState();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);
  const { file, name, upload, image, dialog } = props;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else {
      const url = URL.createObjectURL(file);
      setPhotoSelected(url);
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onloadend = function () {
      //   setPhotoSelected(reader.result);
      // };
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await cropImage(photoSelected, croppedAreaPixels);
      // const file = new File([croppedImage], "profile.png", {
      //   type: "image/jpg",
      //   lastModified: new Date().getTime(),
      // });
      // console.log("donee", file);
      // console.log("donee", blobToFile(blob, "asds.svg"));
      // setCroppedImage(file);
      upload(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, photoSelected, upload]);

  return (
    <>
      <div className={styles.PhotoUpload} onClick={() => props.onClick()}>
        <div className={styles.PhotoUpload__label}>
          <img
            className={styles.PhotoUpload__image}
            src={image ? BASEURL + image : null}
            alt=""
          />
          <div className={styles.PhotoUpload__content}>
            <img src={file ? file : Photo} alt="Upload de foto" />
            <Text tag="span" size="10" weight="bold">
              {image ? "Mudar foto" : "Inserir foto"}
            </Text>
          </div>
        </div>
      </div>
      {dialog && (
        <Dialog
          header={"Selecione sua foto"}
          handleClose={props.onClick}
          className={styles.PhotoUpload__dialog}
        >
          <Text style={{ marginBottom: 12 }}>
            Clique abaixo para selecionar
          </Text>
          <input
            accept="image/*"
            type="file"
            // style={{ display: "none" }}
            onChange={handleImage}
          />
          <input
            accept="image/*"
            name={name}
            ref={ref}
            type="file"
            // value={croppedImage}
            style={{ display: "none" }}
            onChange={handleImage}
          />
          {photoSelected && (
            <>
              <div className={styles.PhotoUpload__crop}>
                <Cropper
                  image={photoSelected}
                  crop={crop}
                  cropShape={`round`}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className={styles.PhotoUpload__buttons}>
                <div className={styles.PhotoUpload__zoom}>
                  <Button
                    style={{ fontSize: 14 }}
                    Tag="span"
                    onClick={() => setZoom((prev) => prev + 0.3)}
                    // transparent
                    type="transparent"
                  >
                    Aumentar zoom
                  </Button>
                  <Button
                    style={{ fontSize: 14 }}
                    Tag="span"
                    onClick={() =>
                      setZoom((prev) => (prev > 1 ? prev - 0.3 : prev))
                    }
                    // transparent
                    type="transparent"
                  >
                    Diminuir zoom
                  </Button>
                </div>
                <Button
                  style={{ marginTop: 12 }}
                  Tag="span"
                  onClick={() => showCroppedImage()}
                  // transparent
                  type="green"
                >
                  Enviar
                </Button>
              </div>
            </>
          )}
        </Dialog>
      )}
    </>
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
  SelectInputMulti,
};
