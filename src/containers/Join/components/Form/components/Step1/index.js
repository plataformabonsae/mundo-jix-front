import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { cpf, cnpj } from 'cpf-cnpj-validator'

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { 
    PhotoUpload, 
    InputGroup,
    Input,
    InputFile,
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

    const typeFuncionarios = [
        { value: '1 - 5', label: '1 - 5' },
        { value: '6 - 15', label: '6 - 15' },
        { value: '16 - 50', label: '16 - 50' },
        { value: '51 - 100', label: '51 - 100' },
        { value: '+100', label: '+100' },
    ]

    const typeEstado = [
        { value: 'Pernambuco', label: 'Pernambuco' },
        { value: 'Alagoas', label: 'Alagoas' },
        { value: 'Sergipe', label: 'Sergipe' },
    ]

    const typeCidade = [
        { value: 'Recife', label: 'Recife' },
        { value: 'Maceió', label: 'Maceió' },
        { value: 'Aracaju', label: 'Aracaju' },
    ]

    if (type === 'talento') {
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
    } else if (type === 'empresa') {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
    
                <Card>
                    <Title style={{ marginBottom: 32 }}>Dados cadastrais</Title>
    
                    <PhotoUpload name="image" ref={register} />
    
                    <InputGroup>
                        <Input
                            ref={register({ required: true, maxLength: 20 })}
                            errors={errors}
                            errorMessage="Máximo 20 caracteres"
                            name="name"
                            placeholder="Digite o nome da empresa">
                            Nome da empresa
                        </Input>
                    </InputGroup>

                    <InputGroup>
                        <Input
                            ref={register({ required: true, maxLength: 20 })}
                            errors={errors}
                            errorMessage="Máximo 20 caracteres"
                            name="atuacao"
                            placeholder="Digite area da atuação">
                            Área de atuação
                        </Input>
                    </InputGroup>
    
                    <InputGroup>
                        <Input
                            ref={register({ required: true, validate: val => cnpj.isValid(val) })}
                            name="CNPJ"
                            errors={errors}
                            errorMessage="Digite um CPF válido"
                            placeholder="Somente números"
                            >
                            CNPJ
                        </Input>
                    </InputGroup>

                    <InputGroup>
                        <SelectInput
                            ref={register({ required: true })}
                            name={`funcionarios`} 
                            control={control}
                            errors={errors}
                            errorMessage="Selecione uma quantidade"
                            placeholder="Selecione a quantidade de funcionários"
                            options={ typeFuncionarios }>
                            Quantidade de funcionários
                        </SelectInput>
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
                    <Title style={{ marginBottom: 32 }}>Localização</Title>

                    <InputGroup>
                        <SelectInput
                            ref={register({ required: true })}
                            name={`localizacao.estado`} 
                            control={control}
                            errors={errors}
                            errorMessage="Selecione um tipo"
                            placeholder="Selecione o estado"
                            options={ typeEstado }>
                            Estado
                        </SelectInput>

                        <SelectInput
                            ref={register({ required: true })}
                            name={`localizacao.cidade`} 
                            control={control}
                            errors={errors}
                            errorMessage="Selecione um tipo"
                            placeholder="Selecione a cidade"
                            options={ typeCidade }>
                            Cidade
                        </SelectInput>
                    </InputGroup>

                    <InputGroup>
                        <Input
                            ref={register({ required: true })}
                            name="cep"
                            errors={errors}
                            errorMessage="Digite um CEP válido"
                            placeholder="Digite o CEP"
                            >
                            CEP
                        </Input>
                    </InputGroup>

                    <InputGroup>
                        <Input
                            ref={register({ required: true })}
                            name="rua"
                            errors={errors}
                            errorMessage="Digite a rua da empresa"
                            placeholder="Digite a rua"
                            >
                            Rua
                        </Input>
                    </InputGroup>

                    <InputGroup>
                        <Input
                            ref={register({ required: true })}
                            name="bairro"
                            errors={errors}
                            errorMessage="Digite a rua da empresa"
                            placeholder="Digite o bairro"
                            >
                            Bairro
                        </Input>
                    </InputGroup>

                    <InputGroup>
                        <Input
                            ref={register({ required: true })}
                            name="numero"
                            errors={errors}
                            errorMessage="Digite a número da empresa"
                            placeholder="Digite o número"
                            >
                            Número
                        </Input>
                    </InputGroup>

                    <InputGroup>
                        <Input
                            ref={register({ required: true })}
                            name="complemento"
                            errors={errors}
                            errorMessage="Digite o complemento"
                            placeholder="Digite o complemento"
                            >
                            Complemento
                        </Input>
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
                    <Title style={{ marginBottom: 32 }}>Biografia</Title>
    
                    <InputGroup>
                        <Textarea
                            ref={register({ required: true, maxLength: 200 })}
                            errors={errors}
                            errorMessage="Máximo de 200 caracteres"
                            name={ `bio` }
                            placeholder="Digite sua biografia">
                            Biografia
                        </Textarea>
                    </InputGroup>
                </Card>

                <Card>
                    <Title style={{ marginBottom: 32 }}>Fotos da empresa</Title>
    
                    <InputGroup>
                        <InputFile
                            >
                        </InputFile>
                    </InputGroup>
                </Card>

                <Card>
                    <Title style={{ marginBottom: 32 }}>Vídeo da empresa</Title>


                    <InputGroup>
                        <Input
                            ref={register()}
                            name="empresa.video"
                            errors={errors}
                            errorMessage="Campo necessário"
                            placeholder="Cole o link">
                            Link do youtube
                        </Input>
                    </InputGroup>

                </Card>
    
                <ButtonGroup style={{ justifyContent: 'center' }}>   
                    {/* <Button
                        to="/"
                    type="outlineWhite">
                        Salvar e sair
                    </Button> */}
                    <Button
                        Tag="button"
                        type="secondary">
                        Continuar
                    </Button>
                </ButtonGroup>        
    
            </form>
        )
    }
}

export {
    Step1
}