import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import globalStyle from "../globalStyle";
import ButtonSM from "./buttonSM";

const { width, height } = Dimensions.get("window");

export default function WarningMsg(props) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={globalStyle.title}>
                    {props.employeeName}
                </Text>

                <Text style={[globalStyle.text, {textAlign: "center"}]}>
                    Une personne déjà observée a été trouvée avec cette identité. 
                    Dernière observation le <Text style={{ fontWeight: "bold" }}>{props.lastDate}</Text>.
                </Text>

                <Text style={[globalStyle.text, {textAlign: "center"}]}>
                    Est-ce la même personne ?
                </Text>

                <ButtonSM
                    title="Oui"
                    disabled={false}
                />

                <ButtonSM
                    title="Non"
                    disabled={false}
                    onPress={props.onClickNo}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height / 10 > 72 ? height - height / 10 : height - 72,
        marginTop: height / 10 > 72 ? height / 10 : 72,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: 'center',
    },
    content: {
        width: "90%",
        height: "90%",
        padding: 16,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    }
})