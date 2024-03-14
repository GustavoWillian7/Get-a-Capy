import { useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import api from '../../../utils/api'

import styles from './Dashboard.module.css'
import RoundedImage from '../../layout/RoundedImage'

import useFlashMessage from '../../../hooks/useFlashMessage'

function MyCapys() {
    const [capys, setCapys] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/capys/mycapys', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setCapys(response.data.capys)
        })
    }, [token])

    async function removeCapy(id) {
        let msgType = 'sucess'

        const data = await api.delete(`/capys/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            const updatedCapys = capys.filter((capy) => capy._id !== id)

            setCapys(updatedCapys)

            return (response.data)
        })
        .catch((error) => {
            msgType = 'error'
            
            return (error.response.data)
        })

        setFlashMessage(data.message, msgType)
    }

    async function concludeAdoption(id) {
        let msgType = 'sucess'

        const data = await api.patch(`/capys/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            msgType = 'error'
            return (error.response.data)
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.capylist_header}>
                <h1>Minhas Capivaras</h1> 
                <Link to='/capy/add'>Cadastrar capivara</Link>
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
                            <div className={styles.actions}>
                                {capy.available ? 
                                (<>
                                    {capy.adopter && (
                                        <button
                                        onClick={() => {
                                            concludeAdoption(capy._id)
                                        }}
                                        className={styles.conclude_btn}>
                                            Concluir adoção
                                        </button>
                                    )}
                                    <Link to={`/capy/edit/${capy._id}`}>Editar</Link>
                                    <button onClick={() => {removeCapy(capy._id)}}>Excluir</button>
                                </>)
                                : 
                                (<p>Capivara já adotada</p>)
                                } 
                            </div>
                        </div>
                    ))
                }
                {capys.length === 0 && <p>Não há capivaras cadastradas</p>}
            </div>
        </section>
    )
}

export default MyCapys