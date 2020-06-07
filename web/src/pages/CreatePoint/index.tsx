import React, { useEffect, useState, ChangeEvent, FormEvent } from "react"
import "./styles.css"
import logo from "../../assets/logo.svg"
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { Map, TileLayer, Marker } from "react-leaflet"
import Api from "../../services/api"
import Axios from "axios"
import { LeafletMouseEvent } from "leaflet"
import Dropzone from "../../components/Dropzone"

interface Item {
    id: number,
    title: string,
    image_url: string
}
interface IBGEUFs { sigla: string }
interface IBGECitys { nome: string }

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUFs] = useState<string[]>([])
    const [selectedUF, setSelectedUF] = useState("0")
    const [cities, setCities] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState("0")
    const [initialPosition, setInitialPosition] = useState<[number, number]>([-8.0543744, -34.9043105])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        whatsapp: ""
    })
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [selectedImage, setSelectedImage] = useState<File>()

    const history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            let { latitude, longitude } = position.coords
            setInitialPosition([latitude, longitude])
            console.log(position.coords)
        }, erro => console.log(erro))
    }, [])

    useEffect(() => {
        Api.get("items").then(res => {
            setItems(res.data)
        })
    }, [])

    useEffect(() => {
        Axios.get<IBGEUFs[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados/").then(res => {
            let ufInitials = res.data.map(uf => uf.sigla)
            ufInitials.sort()
            setUFs(ufInitials)
        })
    }, [])

    useEffect(() => {
        Axios.get<IBGECitys[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(res => {
            let cities = res.data.map(uf => uf.nome)
            setCities(cities)
        })
    }, [selectedUF])

    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) { setSelectedUF(event.target.value) }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) { setSelectedCity(event.target.value) }

    function handleMapClick(event: LeafletMouseEvent) { setSelectedPosition([event.latlng.lat, event.latlng.lng]) }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target;
        setFormInput({ ...formInput, [name]: value })
    }

    function handleSelectItem(id: number) {
        let alreadySelected = selectedItems.findIndex(item => item === id)
        if (alreadySelected === -1) setSelectedItems([...selectedItems, id])
        else {
            let filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault() //impede o form do html de mudar de pagina

        let { name, email, whatsapp } = formInput
        let uf = selectedUF
        let city = selectedCity
        let [latitude, longitude] = selectedPosition
        let items = selectedItems

        let data = new FormData()
        data.append("name", name)
        data.append("email", email)
        data.append("whatsapp", whatsapp)
        data.append("uf", uf)
        data.append("city", city)
        data.append("latitude", String(latitude))
        data.append("longitude", String(longitude))
        data.append("items", items.join(","))
        if(selectedImage) data.append("image", selectedImage)

        await Api.post("points", data)
        alert("Ponto de Coleta Cadastrado com Sucesso")
        history.push("/")
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Logo" />
                <Link to="/">
                    <FiArrowLeft />Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br />Ponto de Coleta</h1>

                <Dropzone onFileSubmit={setSelectedImage} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleSelectUF}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf =>
                                    <option key={uf} value={uf}>{uf}</option>)}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city =>
                                    <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item =>
                            <li key={item.id} onClick={() => handleSelectItem(item.id)} className={selectedItems.includes(item.id) ? "selected" : ""}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        )}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
}
export default CreatePoint