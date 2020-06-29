import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import globalStyle from "../globalStyle";
import Header from "../components/header";
import Axios from "axios";
import ButtonSM from "../components/buttonSM";

class SignIn extends React.Component{

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

    handleProfile = (data) => {
        const action = {
            type: "HANDLE_PROFILE",
            value: {
                userId: data.user_id,
                companyName: data.company_name,
                numberOfEmployees: data.number_of_employees
            }
        }
        this.props.dispatch(action);
    }

    userChecking = () => {
        Axios.post("http://192.168.1.23:3000/user/sign-in", {
            login: this.state.login,
            password: this.state.password,
        })
            .then(response => {
                if (typeof response.data === "string") {
                    this.setState({message: "Identifiant incorrect."})
                } else {
                    this.handleProfile(response.data[0]);
                    this.handleLogin("");
                    this.handlePassword("");
                    this.props.navigation.navigate("Home");
                }
            })
            .catch(error => console.error(error))
    }

    render() {
        return (
            <View style = { globalStyle.container }>
                <Header
                    title="ErgoRating"
                    canBack={false}
                    canSignOut={false}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={styles.body}>

                        <View style={{width: "100%", alignItems: "center"}}>
                            <TextInput
                                style = {globalStyle.input}
                                placeholder = "Identifiant"
                                placeholderTextColor="rgba(0,0,0,0.6)"
                                value={this.state.login}
                                onChangeText={this.handleLogin}
                                onEndEditing = {() => this.controlLogin(this.state.login)}
                            />
                            
                            <TextInput
                                style = {globalStyle.input}
                                placeholder="Mot de passe"
                                value={this.state.password}
                                placeholderTextColor = "rgba(0,0,0,0.6)"
                                onChangeText={this.handlePassword}
                                onEndEditing={() => this.controlPassword(this.state.password)}
                                secureTextEntry={true}
                            />

                            <ButtonSM
                                title="Valider"
                                onPress={this.userChecking}
                                disabled={this.canValidate() ? true : false}
                            />
                        </View>

                        <ButtonSM
                            title="Créer un nouveau compte"
                            onPress={this.goToSignUp}
                        />

                    </View>

                </View>

            </View>
        )
    }
}

export default connect()(SignIn);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
    }
})