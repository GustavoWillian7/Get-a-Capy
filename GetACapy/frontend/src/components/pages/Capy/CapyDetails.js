import api from '../../../utils/api'

import styles from './CapyDetails.module.css'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

function CapyDetails() {
    const [capy, setCapy] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '') 
    
    useEffect(() => {
        api.get(`/capys/${id}`)
        .then((response) => {
            setCapy(response.data.capy)
        })
    }, [id])

    async function schedule() {
        let msgType = 'sucess'

        const data = await api.patch(`capys/schedule/${capy._id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
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
        <>
            {capy.name && (
                <section className={styles.capy_details_container}>
                    <div className={styles.capy_details_header}>
                        <h1>Conhecendo a {capy.name}: </h1>
                        <p>Se estiver interessado, marque uma visita para conhecê-la melhor.</p>
                    </div>
                    <div className={styles.capy_images}>
                        {capy.images.map((image, index) => (
                            <img 
                                src={`${process.env.REACT_APP_API}/images/capys/${image}`} 
                                alt={capy.name}
                                key={index}
                            />
                        ))}
                    </div>
                    <p>
                        <span className='bold'>Peso:</span> {capy.weight}kg
                    </p>
                    <p>
                        <span className='bold'>Idade:</span> {capy.age} anos
                    </p>
                    {token ?
                        (<button onClick={schedule}>Agendar visita</button>) 
                        : 
                        (<p>Você precisa <Link to='/register'>criar uma conta</Link> ou <Link to='/login'>estar logado</Link> para agendar uma visita!</p>)
                    }
                </section>
            )}
        </>
    )
}

export default CapyDetails