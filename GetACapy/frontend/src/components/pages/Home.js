import api from "../../utils/api"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from './Home.module.css'

function Home() {
    const [capys, setCapys] = useState([])

    useEffect(() => {
        api.get('/capys')
        .then((response) => {
            setCapys(response.data.capys)
        })
        .catch()
    }, [])
    
    return (
        <section>
            <div className={styles.capy_home_header}>
                <h1>Adote uma capivara</h1>
                <p>Veja os detalhes de cada uma e conheça o tutor de cada uma</p>
            </div>
            <div className={styles.capy_container}>
                {capys.length > 0 &&
                    capys.map((capy) => (
                        <div className={styles.capy_card}>
                            <div 
                            style={{
                                backgroundImage: `url(${process.env.REACT_APP_API}/images/capys/${capy.images[0]})`
                            }} 
                            className={styles.capy_card_image}
                            >

                            </div>
                            <p>Imagem da capivara</p>
                            <h3>{capy.name}</h3>
                            <p><span className="bold">Peso:</span> {capy.weight}kg</p>
                            {capy.available 
                            ? 
                            (<Link to={`capy/${capy._id}`}>Mais detalhes</Link>) 
                            : 
                            (<p className={styles.adopted_text}>Adotado</p>)   
                            }
                        </div>
                    ))
                }
                {capys.length === 0 && (
                    <p>Não existem capivaras cadastradas ou disponíveis para adoção no momento!</p>
                )}
            </div>
        </section>
    )
}

export default Home