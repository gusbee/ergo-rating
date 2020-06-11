import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Header from "../components/header";
import Axios from "axios";
import Button from "../components/button";

export default class SignIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            message: "",
        }
    }

    canValidate = () => {
        if (this.state.login !== "" && this.state.password !== "") {
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

    controlLogin = (login) => {
        let reg = new RegExp("^[a-zA-Z][a-zA-Z0-9_\-]{5,255}$");
        return reg.test(login);
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

    goToSignUp = () => {
        this.props.navigation.navigate("SignUp");
    }

    userChecking = () => {
        Axios.post("http://192.168.1.23:3000/user/sign-in", {
            login: this.state.login,
            password: this.state.password,
        })
            .then(response => {
                if (response.data === "wrong password") {
                    this.setState({message: "Mot de passe incorrect."})
                }
                else if (response.data === "logged in"){
                    this.setState({ message: "Connexion en cours..." });
                    this.props.navigation.navigate("Home");
                } else if (response.data === "This account doesn't exist.") {
                    this.setState({message: "Aucun compte existant avec cet identifiant."})
                }
            })
            .catch(error => console.error(error))
    }

    render() {
        return (
            <View style = { styles.container }>
                <Header
                    title="ErgoRating"
                    canBack={false}
                    canSignOut={false}
                    navigation={this.props.navigation}
                />

                <Button
                    title="Créer un nouveau compte"
                    onPress={this.goToSignUp}
                />

                <Text>
                    OU
                </Text>

                <TextInput
                    style = {styles.input}
                    placeholder = "Identifiant"
                    placeholderTextColor = "rgba(0,0,0,0.6)"
                    onChangeText={this.handleLogin}
                    onEndEditing = {() => this.controlLogin(this.state.login)}
                />
                
                <TextInput
                    style = {styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor = "rgba(0,0,0,0.6)"
                    onChangeText={this.handlePassword}
                    onEndEditing = { () => this.controlPassword(this.state.password)}
                />

                <Button
                    title="Valider"
                    onPress={this.userChecking}
                    disabled={this.canValidate() ? true : false}
                />

                <Text>{this.state.message}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
})