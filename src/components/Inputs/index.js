import React from 'react'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Select from 'react-select' 

import { Text } from 'components/Text'

import styles from './styles.module.sass'

import Photo from 'assets/components/Input/PhotoUpload.svg'


// TODO
// 1 - Mascaras https://codesandbox.io/s/react-hook-form-gv5su?file=/src/App.js:149-457
// 2 - Mudar a posição dos elementos isMulti do Select

const InputGroup = ({ children, name, key }) => (
    <fieldset name={name} key={key} className={ styles.wrapper }>
        { children }
    </fieldset>
)

const AddGroup = ({children, text, onClick}) => {

    return (
        <button
            type="button"
            onClick={ onClick } 
            className={ styles.addGroup }><span>+</span>{ text ? text : 'Adicionar' }</button>
    )
}

const RemoveGroup = ({children, text, onClick}) => {

    return (
        <button
            type="button"
            onClick={ onClick } 
            className={ styles.removeGroup }>{ text ? text : 'Remover' }</button>
    )
}

const InputFile = ({ children, file }) => (
    <div className={ styles.upload }>
        <button type="button">
            Escolher arquivo
        </button>
        Nenhum arquivo selecionado
    </div>
)

const Input = React.forwardRef(({name, value, placeholder, type, onChange, children, checked, errors, errorMessage }, ref) => (
    <label className={` ${styles.input} ${errors?.[name]?.type === 'required' ? styles.required : '' } `}>
        <span className={ styles.name }>{ children }</span>
        <input
            name={ name }
            type={ type ? type : 'text' }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            ref={ ref } />
        <div className={styles.error}>{ errors?.[name] && errorMessage }</div>
    </label>
))

const Textarea = React.forwardRef(({name, rows, value, placeholder, type, onChange, children, checked, errors, errorMessage }, ref) => (
    <label className={` ${styles.input} ${errors?.[name]?.type === 'required' ? styles.required : '' } `}>
        <span className={ styles.name }>{ children }</span>
        <textarea
            rows={ rows ? rows : 8 }
            name={ name }
            type={ 'textarea' }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            ref={ ref } />
        <div className={styles.error}>{ errors?.[name] && errorMessage }</div>
    </label>
))

const SelectInput = React.forwardRef(({name, value, placeholder, type, onChange, children, control, errors, errorMessage, options, isMulti }, ref) => (
    <label className={` ${styles.input} ${errors?.[name]?.type === 'required' ? styles.required : '' } `}>
        <span className={ styles.name }>{ children }</span>
        <Controller
            isMulti
            name={ name }
            control={control}
            options={ options }
            placeholder={ placeholder }
            as={ <Select
                styles={{
                    placeholder: (provided, state) => ({
                        ...provided,
                        fontFamily: 'Noto Sans',
                        fontSize: 12
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        fontSize: 12
                    }),
                    singleValue: (provided, state) => ({
                        ...provided,
                        fontSize: 12
                    }),
                    indicatorSeparator: () => ({
                        display: 'none'
                    }),
                    input: (provided, state) => ({
                        ...provided,
                        fontSize: 12
                    }),
                    menu: (provided, state) => ({
                        ...provided,
                        zIndex: 12
                    }),
                    control: (provided, state) => ({
                        ...provided,
                        border: '1px solid #B3BBBE',
                        minHeight: 42
                    }),
                    container: (provided, state) => ({
                        ...provided,
                        width: '100%'
                    })
                }} innerRef={ ref } /> } />
        <div className={styles.error}>{ errors?.[name] && errorMessage }</div>
    </label>
))

// const InputWithMask = ({name, mask, value, placeholder, type, onChange, children, errors, control, errorMessage }) => {

//     return (
//         <label className={` ${styles.input} ${errors?.[name]?.type === 'required' ? styles.required : '' } `}>
//             <span className={ styles.name }>{ children }</span>
//             <Controller
//                 as={<InputMask />}
//                 control={ control }
//                 name={ name }
//                 type={ type ? type : 'text' }
//                 value={ value }
//                 placeholder={ placeholder }
//                 onChange={ onChange }
//                 mask={ mask }
//                 defaultValue={''} />
//             <div className={styles.error}>{ errors?.[name] && errorMessage }</div>
//         </label>
//     )
// }

const InputWithMask = React.forwardRef(({name, mask, value, placeholder, type, onChange, children, errors, control, errorMessage }, ref) => {

    // https://unform.dev/examples/react-input-mask/

    return (
        <label className={` ${styles.input} ${errors?.[name]?.type === 'required' ? styles.required : '' } `}>
            <span className={ styles.name }>{ children }</span>
            <Controller
                control={ control }
                name={ name }
                render={({ value, name, ref, mask, placeholder }) => (
                    <InputMask 
                        placeholder={ placeholder } 
                        value={value} 
                        name={name} 
                        mask={mask}
                        defaultValue={''}
                        inputRef={ref} />
                )}
                />
            <div className={styles.error}>{ errors?.[name] && errorMessage }</div>
        </label>
    )
    }
)

// const InputWithMask = React.forwardRef(({name, mask, value, placeholder, type, onChange, children, errors, control, errorMessage }, ref) => (
//     <label className={` ${styles.input} ${errors?.[name]?.type === 'required' ? styles.required : '' } `}>
//         <span className={ styles.name }>{ children }</span>
//         <InputMask
//             name={ name }
//             type={ type ? type : 'text' }
//             value={ value }
//             placeholder={ placeholder }
//             onChange={ onChange }
//             mask={ mask }
//             defaultValue={''}>
//             { props => <input {...props} ref={props.ref}  /> }
//         </InputMask>
//         <div className={styles.error}>{ errors?.[name] && errorMessage }</div>
//     </label>
// )
// )

const Checkbox = React.forwardRef(({name, value, placeholder, onChange, children, checked }, ref) => (
    <label className={ styles.inputCheckbox }>
        <input
            name={ name }
            type='checkbox'
            value={ value }
            checked={ checked }
            placeholder={ placeholder }
            onChange={ onChange }
            ref={ ref } />
        <span>{ children }</span>
    </label>
))

const PhotoUpload = React.forwardRef(({name, value, placeholder, onChange, onClick, children, checked }, ref) => {

    const handleClick = () => {
        alert('clicou')
    }

    return (
        <div className={ styles.PhotoUpload }>
            <button onClick={ handleClick }>
                <img src={Photo} alt="Upload de foto"/>
                <Text tag="span" size="10" weight="bold">Inserir foto</Text>
                <input name={name} ref={ref} type="file" style={{ display: 'none' }} onChange={onChange}/>
            </button>
        </div>

    )
})

export {
    InputGroup,
    AddGroup,
    RemoveGroup,
    Input,
    Textarea,
    SelectInput,
    Checkbox,
    InputWithMask,
    PhotoUpload,
    InputFile
}