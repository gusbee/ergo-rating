import React from "react";
import Axios from "axios";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Header from "../components/header";
import ButtonSM from "../components/buttonSM";
import globalStyle from "../globalStyle";

export default class SignIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            companyName: "",
            numberOfEmployees: "",
            message: "",
        }
    }

    canValidate = () => {
        if (this.allControls(
            this.state.companyName,
            this.state.numberOfEmployees,
            this.state.login,
            this.state.password
        )) {
            return false;
        }
        return true;
    }

    handleLogin = (login) => {
        this.setState({ login });
    }

    handlePassword = (password) => {
        this.setState({ password });
    }

    handleCompanyName = (companyName) => {
        this.setState({ companyName });
    }

    handleNumberOfEmployees = (numberOfEmployees) => {
        this.setState({ numberOfEmployees });
    }

    controlLogin = (login) => {
        let reg = new RegExp("^[a-zA-Z][a-zA-Z0-9_\-]{5,255}$");
        return reg.test(login);
    }

    controlNumberOfEmployees = (noe) => {
        if (parseInt(noe) !== NaN && parseInt(noe) > 0) {
            return true;
        }
        return false;
    }

    controlCompanyName = (name) => {
        if (name.length > 0) {
            let reg = /\<\>/;
            return !reg.test(name);
        }
        return false;
    }

    controlPassword = (password) => {
        if (password.match(/[0-9]/g) &&
            password.match(/[a-z]/g) &&
            password.match(/[A-Z]/g) &&
            password.match(/[^a-zA-Z\d]/g) &&
            password.length >= 8
        ) {
            return true;
        } 
        return false;
    }

    allControls = (companyName, NoE, login, password) => {
        if (
            this.controlCompanyName(companyName) &&
            this.controlNumberOfEmployees(NoE) &&
            this.controlLogin(login) &&
            this.controlPassword(password)
        ) {
            return true;
        }
        return false;
    }


    createNewUser = () => {
        Axios.post("http://192.168.1.23:3000/user/add", {
            login: this.state.login,
            password: this.state.password,
            companyName: this.state.companyName,
            numberOfEmployees: this.state.numberOfEmployees
        })
            .then(response => {
                console.log(response.data);
                if (response.data === "success") {
                    this.setState({ message: "Nouvel utilisateur enregistré avec succès." })
                    this.props.navigation.navigate("Home");
                } else {
                    this.setState({message: "Un compte existe déjà avec cet identifiant."})
                }
            })
            .catch(error => console.error(error))
    }

    render() {
        return (
            <View style = { globalStyle.container }>
                <Header
                    title="ErgoRating"
                    canBack={true}
                    canSignOut={false}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.body}>
                
                        <Text style = {styles.message}>{this.state.message}</Text>
                        
                        <TextInput
                            style = {globalStyle.input}
                            placeholder = "Nom de l'entreprise"
                            placeholderTextColor = "rgba(0,0,0,0.6)"
                            onChangeText={this.handleCompanyName}
                            onEndEditing = {() => this.controlCompanyName(this.state.companyName)}
                        />

                        <TextInput
                            style={globalStyle.input}
                            keyboardType = "number-pad"
                            placeholder = "Nombre d'employés"
                            placeholderTextColor = "rgba(0,0,0,0.6)"
                            onChangeText={this.handleNumberOfEmployees}
                            onEndEditing = {() => this.controlNumberOfEmployees(this.state.numberOfEmployees)}
                        />

                        <TextInput
                            style = {globalStyle.input}
                            placeholder = "Identifiant de connexion"
                            placeholderTextColor = "rgba(0,0,0,0.6)"
                            onChangeText={this.handleLogin}
                            onEndEditing = { () => this.controlLogin(this.state.login)}
                        />
                        
                        <TextInput
                            style = {globalStyle.input}
                            placeholder="Mot de passe"
                            placeholderTextColor = "rgba(0,0,0,0.6)"
                            onChangeText={this.handlePassword}
                            onEndEditing = { () => this.controlPassword(this.state.password)}
                        />
                    </View>

                    <View style={globalStyle.submit}>
                        <ButtonSM
                            title="Valider"
                            onPress={this.createNewUser}
                            disabled={this.canValidate() ? true : false}
                        />
                    </View>

                    
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    message: {
        fontFamily: "openSans",
        fontSize: 15,
        color: "#242424",
    },
    input: {
        width: 300,
        height: 48,
        borderWidth: 1,
        borderColor: "#203455",
        fontFamily: "openSans",
        fontSize: 15,
        color: "#242424",
        paddingHorizontal: 16,
        marginVertical: 12,
    },
    button: {
        width: 300,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#203455",
        marginVertical: 12,
    },
    buttonText: {
        fontFamily: "openSans",
        fontSize: 15,
        color: "#FFFFFF"
    },
    buttonDisabled: {
        width: 300,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#404040",
        marginVertical: 12,
    },
    buttonTextDisabled: {
        fontFamily: "openSans",
        fontSize: 15,
        color: "#979797"
    },
})