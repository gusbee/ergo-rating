import React from "react";
import { View } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";

export default class Modele extends React.Component{

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="RULA"
                    canBack={true}
                    canSignOut={true}
                />
                <View style={globalStyle.wrapper}>

                    

                </View>
            </View>
        )
    }

}