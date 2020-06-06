import React, { useState, useEffect } from "react"
import { Feather as Icon } from "@expo/vector-icons"
import { View, Image, StyleSheet, Text, ImageBackground, TextInput, Alert } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import RNPickerSelect from 'react-native-picker-select';
import Axios from "axios"

interface IBGEUFs { sigla: string }
interface IBGECitys { nome: string }

const Home = () => {
    const navigation = useNavigation()
    const [selectedUF, setSelectedUF] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [ufs, setUFs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    function handleNavToPoint() {
        if (!selectedUF || !selectedCity) {
            Alert.alert("Selecione a área!", "A área selecionada é inválida!")
            return
        }
        navigation.navigate("Points", {
            uf: selectedUF,
            city: selectedCity
        })
    }

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
        setSelectedCity("")
    }, [selectedUF])

    function handleUF(uf: string) { setSelectedUF(uf) }

    function handleCity(selectedcity: string) { setSelectedCity(selectedcity) }

    return (
        <ImageBackground
            source={require("../../assets/home-background.png")}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}>
            <View style={styles.main}>
                <Image source={require("../../assets/logo.png")} />
                <Text style={styles.title}>Bem vindo ao marketplace de resíduos recicláveis</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
            </View>

            <View style={styles.footer}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={uf => handleUF(uf)}
                    items={ufs.map(uf => ({ label: uf, value: uf }))}
                    placeholder={{ label: "Escolha a UF..." }} />
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={city => handleCity(city)}
                    items={cities.map(city => ({ label: city, value: city }))}
                    placeholder={{ label: "Escolha a Cidade..." }} />
                <RectButton style={styles.button} onPress={handleNavToPoint}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32
    },

    main: {
        flex: 1,
        justifyContent: 'center'
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        color: "#111111",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        color: "#111111",
        paddingRight: 30, // to ensure the text is never behind the icon
    }
});
export default Home