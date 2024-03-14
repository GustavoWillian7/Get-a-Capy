import api from '../../../utils/api'

import styles from './AddCapy.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CapyForm from '../../form/CapyForm'

import useFlashMessage from '../../../hooks/useFlashMessage'

function AddCapy() {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerCapy(capy) {
        let msgType = 'sucess'

        const formData = new FormData()

        await Object.keys(capy).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < capy[key].length; i++) {
                    formData.append('images', capy[key][i]) 
                }
            } else {
                formData.append(key, capy[key])
            }
        })
        const data = await api.post('capys/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        })
        .then((response) => {
            return (response.data)
        })
        .catch((error) => {
            msgType = 'error'

            return (error.response.data)
        })

        setFlashMessage(data.message, msgType)
        
        if (msgType !== 'error') {
            navigate('/capy/mycapys')
        }
    }

    return (
        <section className={styles.addcapy_header}>
            <div>
                <h1>Cadastre uma capivara</h1>
                <p>Ao adicionar uma capivara, ela ficará disponível para adoção!</p>
            </div>
            <CapyForm handleSubmit={registerCapy} btnText='Cadastrar capivara' />
        </section>
    )
}

export default AddCapy