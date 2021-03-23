import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { cpf } from 'cpf-cnpj-validator'

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { 
    PhotoUpload, 
    InputGroup,
    Input,
    SelectInput,
    AddGroup,
    // RemoveGroup,
    // InputWithMask,
    Textarea
 } from 'components/Inputs'
import Button from 'components/Button'
import { ButtonGroup } from 'components/ButtonGroup'


// TODO
// 1 - Adicionar e remover mais números
// 2 - '' '' '' redes socias


const Step1 = ({action, type}) => {

    const history = useHistory()

    const { register, errors, control, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(JSON.stringify(data))
        history.push(`/join/${type}/2`)
    }

    // // Add More Tels
    // const [moreTels, setMoreTels] = useState(0)
    // const handleMoreTels = (e) => {
    //     // e.prevent.default
    //     setMoreTels(prev => ++prev)
    // }
    // const handleLessTels = (e) => {
    //     // e.prevent.default
    //     setMoreTels(prev => --prev)
    // }

    const handleNascimento = val => {
        let value = val
        let array = value.split('/').map( x => +x )
    
        return (new Date(array[2]+18, array[1]-1, array[0]) <= new Date())
    }

    const typeTel = [
        { value: 'celular', label: 'Celular' },
        { value: 'profissional', label: 'Profissional' },
        { value: 'pessoal', label: 'Pessoal' },
    ]

    const typeSocial = [
        { value: 'Instagram', label: 'Instagram' },
        { value: 'Facebook', label: 'Facebook' },
        { value: 'Linkedin', label: 'Linkedin' },
        { value: 'Twitter', label: 'Twitter' },
        { value: 'TikTok', label: 'TikTok' },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Card>
                <Title style={{ marginBottom: 32 }}>Dados pessoais</Title>

                <PhotoUpload name="image" ref={register} />

                <InputGroup>
                    <Input
                        ref={register({ required: true, maxLength: 20 })}
                        errors={errors}
                        errorMessage="Máximo 20 caracteres"
                        name="name"
                        placeholder="Digite seu primeiro nome">
                        Nome
                    </Input>
                    <Input
                        ref={register({ required: true, maxLength: 20 })}
                        name="last-name" 
                        errors={errors}
                        errorMessage="Máximo 20 caracteres"
                        placeholder="Digite seu sobrenome">
                        Sobrenome
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true, validate: val => cpf.isValid(val) })}
                        name="CPF"
                        errors={errors}
                        errorMessage="Digite um CPF válido"
                        placeholder="Somente números"
                        >
                        CPF
                    </Input>
                    <Input
                        ref={register({ required: true, validate: val => handleNascimento(val) })}
                        name="birthdate"
                        errors={errors}
                        errorMessage="Você precisa ter mais que 18 anos"
                        placeholder="Somente números">
                        Data de nascimento
                    </Input>
                </InputGroup>
            </Card>

            <Card>
                <Title style={{ marginBottom: 32 }}>Contato</Title>

                <InputGroup>
                    <Input
                        ref={register({ required: true, maxLength: 20 })}
                        errors={errors}
                        errorMessage="Somente números"
                        name={ `tel.${[0]}.number` }
                        placeholder="Digite seu telefone">
                        Telefone
                    </Input>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`tel.${[0]}.type`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione o tipo de telefone"
                        options={ typeTel }>
                        Tipo de telefone
                    </SelectInput>
                    <AddGroup text="Adicionar telefone" />
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                        name="email"
                        errors={errors}
                        errorMessage="Digite um e-mail válido"
                        placeholder="Digite seu melhor e-mail"
                        >
                        E-mail
                    </Input>
                    <AddGroup text="Adicionar e-mail" />
                </InputGroup>
            </Card>

            <Card>
                <Title style={{ marginBottom: 32 }}>Redes sociais</Title>

                <InputGroup>
                    <Input
                        ref={register({ required: true, maxLength: 20 })}
                        errors={errors}
                        errorMessage="Somente números"
                        name={ `social.${[0]}.link` }
                        placeholder="Link da rede social">
                        Cole aqui
                    </Input>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`social.${[0]}.type`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione a rede social"
                        options={ typeSocial }>
                        Tipo de rede
                    </SelectInput>

                    <AddGroup text="Adicionar rede social" />
                </InputGroup>
            </Card>

            <Card>
                <Title style={{ marginBottom: 32 }}>Redes sociais</Title>

                <InputGroup>
                    <Textarea
                        ref={register({ required: true, maxLength: 200 })}
                        errors={errors}
                        errorMessage="Máximo de 200 caracteres"
                        name={ `bio` }
                        placeholder="Digite sua biografia">
                        Minha biografia
                    </Textarea>
                </InputGroup>

            </Card>

            <ButtonGroup>   
                <Button
                    to="/"
                type="outlineWhite">
                    Salvar e sair
                </Button>
                <Button
                    Tag="button"
                    type="secondary">
                    Continuar
                </Button>
            </ButtonGroup>        

        </form>
    )
}

export {
    Step1
}