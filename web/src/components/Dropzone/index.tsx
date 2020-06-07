import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import "./styles.css"
import { FiUpload } from "react-icons/fi"

interface Props {
    onFileSubmit: (file: File) => void
}

const Dropzone: React.FC<Props> = ({onFileSubmit}) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState("")

    const onDrop = useCallback(acceptedFiles => {
        let file = acceptedFiles[0]
        setSelectedImageUrl(URL.createObjectURL(file))
        onFileSubmit(file)
    }, [onFileSubmit])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*"
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {
                selectedImageUrl ?
                    <img src={selectedImageUrl} alt="Imagem thumbnail" />
                    :
                    (
                        <p>
                            <FiUpload />
                        Selecione a imagem do estabelecimento<br />
                        Clique aqui para selecionar ou arraste uma imagem</p>
                    )
            }
        </div>
    )
}

export default Dropzone