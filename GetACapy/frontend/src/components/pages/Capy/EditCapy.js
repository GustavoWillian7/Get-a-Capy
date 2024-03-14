import api from "../../../utils/api"

import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import styles from './AddCapy.module.css'

import CapyForm from '../../form/CapyForm'

import useFlashMessage from "../../../hooks/useFlashMessage"

function EditCapy() {
    const [capy, setCapy] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get(`/capys/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
        .then((response) => {
            setCapy(response.data.capy)
        })
        .catch()
    }, [token, id])
    
    async function updateCapy(capy) {
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

        const data = await api.patch(`capys/${capy._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
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
            <div className={styles.addcapy_header}>
                <h1>Editando a capivara: {capy.name}</h1>
                <p>Após confirmar a edição os dados serão atualizados no sistema.</p>
            </div>
            {capy.name && (
                <CapyForm 
                handleSubmit={updateCapy}
                btnText='Atualizar'
                capyData={capy}
                />
            )}
        </section>
    )
}

export default EditCapy