import { useState } from "react"

import formStyles from './form.module.css'

import Input from "./Input"

function CapyForm({ handleSubmit, capyData, btnText }) {
    const [capy, setCapy] = useState(capyData || {})
    const [preview, setPreview] = useState([])
    
    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setCapy({ ...capy, images: [...e.target.files] })
    }

    function handleChange(e) {
        setCapy({ ...capy, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(capy)
    }

    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_capy_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img 
                            src={URL.createObjectURL(image)} 
                            alt={capy.name} 
                            key={`${capy.name}+${index}`} 
                        />
                    )) :
                    capy.images &&
                    capy.images.map((image, index) => (
                        <img 
                            src={`${process.env.REACT_APP_API}/images/capys/${image}`} 
                            alt={capy.name} 
                            key={`${capy.name}+${index}`} 
                        />
                    ))
                }
            </div>
            <Input
                text='Imagens da Capivara'
                type='file'
                name='images'
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text='Nome da capivara'
                type='text'
                name='name'
                placeholder='Digite o nome da capivara'
                handleOnChange={handleChange}
                value={capy.name || ''}
            />
            <Input
                text='Idade da capivara'
                type='text'
                name='age'
                placeholder='Digite a idade da capivara'
                handleOnChange={handleChange}
                value={capy.age || ''}
            />
            <Input
                text='Peso da capivara'
                type='number'
                name='weight'
                placeholder='Digite o peso da capivara'
                handleOnChange={handleChange}
                value={capy.weight || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default CapyForm