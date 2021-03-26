import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { 
    InputGroup,
    Input,
    SelectInput,
    AddGroup,
    InputFile,
    Checkbox,
    Textarea,
    // AddGroup,
    // RemoveGroup,
    // InputWithMask,
    // Textarea
 } from 'components/Inputs'
import { Text } from 'components/Text'
import Button from 'components/Button'
import { ButtonGroup } from 'components/ButtonGroup'


// TODO
// 1 - Adicionar e remover mais números
// 2 - '' '' '' redes socias


const Profissional = ({action, type, noShadow}) => {

    const history = useHistory()
    // const { pathname } = useLocation()


    const { register, errors, control, handleSubmit } = useForm()
    const onSubmit = (data) => {
        history.push(`/dashboard/${type}`)
    }

    const typeSituacao = [
        { value: 'Tenho emprego', label: 'Tenho emprego' },
        { value: 'Sou freelancer', label: 'Sou freelancer' },
        { value: 'Não tenho emprego', label: 'Não tenho emprego' },
    ]

    const typeBusca = [
        { value: 'Jovem aprendiz', label: 'Jovem aprendiz' },
        { value: 'Estágio', label: 'Estágio' },
        { value: 'PJ', label: 'PJ' },
        { value: 'Trainee', label: 'Trainee' },
        { value: 'CLT', label: 'CLT' },
        { value: 'Empreender', label: 'Empreender' },
    ]

    const typePortifolio = [
        { value: 'Github', label: 'Github' },
        { value: 'Site', label: 'Site' },
        { value: 'Outro', label: 'Outro' },
    ]

    const typeSkill = [
        { value: 'Programação', label: 'Programação' },
        { value: 'Skill dois', label: 'Skill dois' },
        { value: 'Skill três', label: 'Skill três' },
        { value: 'Skill quatro', label: 'Skill quatro' },
    ]

    const typeLinks = [
        { value: 'Youtube', label: 'Youtube' },
        { value: 'Blog', label: 'Blog' },
        { value: 'Outro', label: 'Outro' },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Card noShadow={ noShadow }>
                <Title style={{ marginBottom: 32 }}>Perspectivas</Title>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`situacao-atual`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione a situação atual"
                        options={ typeSituacao }>
                        Situação atual
                    </SelectInput>
                </InputGroup>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`o-que-busca`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione um tipo"
                        placeholder="Selecione o que busca"
                        options={ typeBusca }>
                        O que busca?
                    </SelectInput>
                </InputGroup>

            </Card>

            <Card noShadow={ noShadow }>
                <Title style={{ marginBottom: 32 }}>Skills</Title>

                <InputGroup>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`skills`} 
                        control={control}
                        isMulti
                        errors={errors}
                        errorMessage="Digite pelo menos uma skill"
                        placeholder="Digite sua skill"
                        options={ typeSkill } />
                </InputGroup>
                
            </Card>

            <Card noShadow={ noShadow }>
                <Title style={{ marginBottom: 32 }}>Portfolio</Title>

                <InputGroup>
                    <Input
                        ref={register()}
                        errors={errors}
                        errorMessage="Máximo 20 caracteres"
                        name="plataforma.link"
                        placeholder="Colo aqui o link">
                        Link
                    </Input>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`plafatorma.url`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione pelo menos uma plataforma"
                        placeholder="Selecione a plataforma"
                        options={ typePortifolio }>
                        Plataforma
                    </SelectInput>

                    <AddGroup text="Adicionar portfolio" />
                </InputGroup>
                
            </Card>

            <Card noShadow={ noShadow }>
                <Title style={{ marginBottom: 32 }}>Currículo</Title>

                <InputGroup>
                    <Text size={12} weight={'bold'}>
                        Anexe seu currículo em PDF ou Doc:
                    </Text>
                    <InputFile
                        ref={register({ required: true })}
                        name={`curriculo`} 
                        control={control}
                        // errors={errors}
                        // errorMessage="Selecione pelo menos uma plataforma"
                        // placeholder="Selecione a plataforma"
                        options={ typePortifolio }>
                        {/* Plataforma */}
                    </InputFile>
                </InputGroup>
                
            </Card>

            <Card noShadow={ noShadow }>
                <Title style={{ marginBottom: 32 }}>Portfolio</Title>

                <InputGroup>
                    <Input
                        ref={register()}
                        name="cargo"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="Digite o cargo">
                        Cargo
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register()}
                        name="empresa.nome"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="Digite o nome da empresa">
                        Empresa
                    </Input>
                </InputGroup>

                <InputGroup>
                    <Input
                        ref={register()}
                        name="empresa.inicio"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="__/__/____">
                        Início
                    </Input>
                    <Input
                        ref={register()}
                        name="empresa.termino"
                        errors={errors}
                        errorMessage="Campo necessário"
                        placeholder="__/__/____">
                        Término
                    </Input>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Checkbox>
                            Meu Emprego atual
                        </Checkbox>
                    </div>
                </InputGroup>

                <InputGroup>
                    <Textarea
                        ref={register({ required: true, maxLength: 400 })}
                        errors={errors}
                        errorMessage="Máximo de 400 caracteres"
                        name={ `atividades` }
                        placeholder="Digite suas principais atividades">
                        Principais atividades
                    </Textarea>
                </InputGroup>

                <AddGroup text="Adicionar experiência" />
            </Card>

            <Card noShadow={ noShadow }>
                <Title style={{ marginBottom: 32 }}>Outros links</Title>

                <InputGroup>
                    <Input
                        ref={register()}
                        errors={errors}
                        errorMessage="Máximo 20 caracteres"
                        name="plataforma.link"
                        placeholder="Cole aqui o link">
                        Link
                    </Input>
                    <SelectInput
                        ref={register({ required: true })}
                        name={`plafatorma.url`} 
                        control={control}
                        errors={errors}
                        errorMessage="Selecione pelo menos uma plataforma"
                        placeholder="Selecione a plataforma"
                        options={ typeLinks }>
                        Plataforma
                    </SelectInput>

                    <AddGroup text="Adicionar link" />
                </InputGroup>
                
            </Card>

            <ButtonGroup>   
                <Button
                    to={`/dashboard/${type}`}
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
    Profissional
}