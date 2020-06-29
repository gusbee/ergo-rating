import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import { TextInput } from "react-native-gesture-handler";
import ButtonSM from "../../components/buttonSM";
import Axios from "axios";

const mapStateToProps = (state) => {
    return {
        userId: state.profileReducer.userId,
        observation: state.observationReducer
    }
}

class RulaComment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
        }
    }

    lastInsertedId = null;

    handleComment = (comment) => {
        this.setState({ comment });
    }

    saveObservation = () => {
        Axios.post("http://192.168.1.23:3000/add-observation/score-details", {
            userId: this.props.userId,
            method: this.props.observation.method,
            gender: this.props.observation.gender,
            employeeName: this.props.observation.employeeName,
            employeeId: this.props.observation.employeeId,
            observerName: this.props.observation.observerName,
            functionName: this.props.observation.functionName,
            title: this.props.observation.title,
            score1: this.props.observation.score1,
            score2: this.props.observation.score2,
            finalScore: this.props.observation.rulaScore,
            comment: this.state.comment,
            shoulderScore: this.props.observation.shoulderScore,
            neckScore: this.props.observation.neckPosition,
            elbowScore: this.props.observation.elbowPosition,
            wristPosition: this.props.observation.wristPosition,
            wristTorsion: this.props.observation.wristTorsion,
            trunkScore: this.props.observation.trunkPosition,
            legsScore: this.props.observation.legsPosition,
            activityScore1: this.props.observation.activityScore1,
            activityScore2: this.props.observation.activityScore2,
        })
            .then(response => this.props.navigation.navigate("Home"))
            .catch(error => console.error(error))
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Commentaire"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.body}>
                        <Text style={globalStyle.title}>Ajouter un commentaire à l'observation</Text>

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Commentaire"
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            onChangeText={this.handleComment}
                            multiline={true}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={globalStyle.submit}>
                        <ButtonSM
                            title="Terminer l'observation"
                            disabled={false}
                            onPress={this.saveObservation}
                        />
                    </View>

                </View>
            </View>
        )
    }

}

export default connect(mapStateToProps)(RulaComment)

const styles = StyleSheet.create({

})