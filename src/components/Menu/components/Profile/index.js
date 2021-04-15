import React from 'react'

import * as T from 'components/Text' 

import styles from './styles.module.sass'

import logo from 'assets/logo/logo_white.svg'

const Profile = ({ location, image, name }) => {

    return (
        <>
            <div className={ styles.profile }>
                <div className={ styles.image }>
                    <img src={ image ? image : logo } alt={ name } />
                    <T.Text weight="bold" size={ 12 } className={ styles.location }>
                        { location }º
                    </T.Text>
                </div>
            </div>
            <T.Title size={ 18 } className={ styles.name } color={ "white" }>
                { name }
            </T.Title>
        </>
    )
}

export {
    Profile
}