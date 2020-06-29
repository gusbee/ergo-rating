import React from "react";
import { View, Text } from "react-native";
import globalStyle from "../globalStyle";
import Header from "../components/header";
import ButtonSM from "../components/buttonSM";
import { TextInput } from "react-native-gesture-handler";

export default class Settings extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Paramètres"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>
                    <View style={globalStyle.bodyCenter}>
                        <TextInput
                            style={globalStyle.input}
                            placeholder="Nom entreprise"
                        />

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Nombre d'employés"
                        />

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Identifiant"
                        />

                        <Text style={[globalStyle.text, {width: "100%"}]}>Changer de mot de passe :</Text>

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Ancien mot de passe"
                        />

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Nouveau mot de passe"
                        />
                    </View>
                    <View style={globalStyle.submit}>
                        <ButtonSM
                            title="Modifier"
                        />
                    </View>
                </View>
            </View>
        )
    }
}