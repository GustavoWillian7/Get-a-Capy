import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import RoundedImage from '../../layout/RoundedImage' 

import styles from './Dashboard.module.css'

function MyAdoptions() {
    const [capys, setCapys] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('/capys/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setCapys(response.data.capys)
        })
    }, [token])

    return (
        <section>
            <div className={styles.capylist_header}>
                <h1>Minhas adoções</h1>
            </div>
            <div className={styles.capylist_container}>
                {capys.length > 0 &&
                    capys.map((capy) => (
                        <div className={styles.capylist_row} key={capy._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/capys/${capy.images[0]}`} 
                                alt={capy.name}
                                width='px75'
                            />
                            <span className='bold'>{capy.name}</span>
                            <div className={styles.contacts}>
                                <p>
                                    <span className='bold'>Para confirmar a adoção, ligue para:</span> {capy.user.name}
                                </p>
                                <p>
                                    <span className='bold'>Telefone para contato:</span> {capy.user.phone}
                                </p>
                            </div>
                            <div className={styles.actions}>
                                {capy.available ? 
                                    (<p>Adoção em processo</p>)
                                    : 
                                    (<p>Parabéns por finalizar o processo de adoção!</p>)
                                } 
                            </div>
                        </div>
                    ))
                }
                {capys.length === 0 && <p>Ainda não há adoções de capivara.</p>}
            </div>
        </section>
    )
}

export default MyAdoptions