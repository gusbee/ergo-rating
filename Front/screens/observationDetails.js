import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import globalStyle from "../globalStyle";
import Header from "../components/header";
import ButtonSM from "../components/buttonSM";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import ChartLine from "../components/chartLine";

const { height } = Dimensions.get("window");

export default class ObservationDetails extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            neck: 0,
            shoulders: 0,
            arms: 0,
            wrists: 0,
            trunk: 0,
            legs: 0,
        }
    }

    componentDidMount() {
        Axios.post("http://192.168.1.23:3000/score-details", {
            observationId: this.props.route.params.observation.observation_id,
        })
            .then(response => this.setState({
                    neck: response.data[0].neck_score,
                    shoulders: response.data[0].shoulders_score,
                    arms: response.data[0].arms_score,
                    wrists: response.data[0].wrist_position + response.data[0].wrist_torsion,
                    trunk: response.data[0].trunk_score,
                    legs: response.data[0].legs_score,
                }))
            .catch(error => console.error(error))
    }

    goToRulaArmPosition = () => {
        this.props.navigation.navigate("RulaArmPosition");
    }

    getColorWrist = (score) => {
        if (score > 0 && score < 4) {
            return styles.green;
        } else if (score >= 4 && score < 6) {
            return styles.orange;
        } else if (score >= 6) {
            return styles.red;
        } else {
            return styles.neutral;
        } 
    }

    getColorArm = (score) => {
        if (score === 1) {
            return styles.green;
        } else if (score === 2) {
            return styles.orange;
        } else if (score === 3) {
            return styles.red;
        } else {
            return styles.neutral;
        } 
    }

    getColor = (score) => {
        if (score > 0 && score < 3) {
            return styles.green;
        } else if (score >= 3 && score < 5) {
            return styles.orange;
        } else if (score >= 5 && score < 7) {
            return styles.red;
        } else {
            return styles.neutral;
        } 
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Détails d'une observation"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <ScrollView>
                    <View style={globalStyle.wrapper}>
                    
                        <Text style={globalStyle.title}>
                            {this.props.route.params.observation.employee_name}
                        </Text>
                        <Text style={[globalStyle.text, {width: "100%"}]}>
                            {this.props.route.params.observation.employee_function}
                        </Text>
                        <Text style={[globalStyle.text, {width: "100%"}]}>
                            {this.props.route.params.observation.observation_title}
                        </Text>
                        <Text style={[globalStyle.text, {width: "100%"}]}>
                            {this.props.route.params.observation.observation_method} 
                            {this.props.route.params.observation.final_score}
                        </Text>

                        <ButtonSM
                            title="Lancer une nouvelle observation"
                            disabled={false}
                            onPress={this.goToRulaArmPosition}
                        />
                    
                        <View style={styles.bodyContainer}>
                            <View style={[styles.head, this.getColor(0)]}></View>
                            <View style={[styles.neck, this.getColor(this.state.neck)]}></View>
                            <View style={styles.shouldersLevel}>
                                <View style={[styles.shoulder, this.getColor(this.state.shoulders)]}></View>
                                <View style={[styles.trunkTop, this.getColor(this.state.trunk)]}></View>
                                <View style={ [styles.shoulder, this.getColor(this.state.shoulders)]}></View>
                            </View>
                            <View style={styles.armsTopLevel}>
                                <View style={[styles.armTop, this.getColorArm(this.state.arms)]}></View>
                                <View style={[styles.trunkMiddle, this.getColor(this.state.trunk)]}></View>
                                <View style={[styles.armTop, this.getColorArm(this.state.arms)]}></View>
                            </View>
                            <View style={styles.armsBottomLevel}>
                                <View style={[styles.armBottom, this.getColorArm(this.state.arms)]}></View>
                                <View style={[styles.trunkBottom, this.getColor(this.state.trunk)]}></View>
                                <View style={[styles.armBottom, this.getColorArm(this.state.arms)]}></View>
                            </View>
                            <View style={styles.legsLevel}>
                                <View style={[styles.wrist, this.getColorWrist(this.state.wrists)]}></View>
                                <View style={[styles.legs, this.getColor(this.state.legs)]}></View>
                                <View style={[styles.wrist, this.getColorWrist(this.state.wrists)]}></View>
                            </View>
                            <Image
                                source={require("../images/body.png")}
                                style={styles.image}
                            />
                        </View>

                        <View style={{width: "100%"}}>
                            <ChartLine />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bodyContainer: {
        width: "100%",
        maxWidth: 230,
        height: "100%",
        maxHeight: 512,
        backgroundColor: "black",
        position: "relative",
        marginVertical: height > 500 ? 24 : 12,
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
    },
    head: {
        width: "100%",
        height: "12.71875%",
    },
    neck: {
        width: "100%",
        height: "3.8828125%",
    },
    shouldersLevel: {
        width: "100%",
        height: "12.2109375%",
        flexDirection: "row",
    },
    shoulder: {
        width: "30.3695652173913%",
        height: "100%",
    },
    trunkTop: {
        width: "39.26086956521739%",
        height: "100%",
    },
    armsTopLevel: {
        width: "100%",
        height: "14.9375%",
        flexDirection: "row",
    },
    armTop: {
        width: "30.3695652173913%",
        height: "100%",
    },
    trunkMiddle: {
        width: "39.26086956521739%",
        height: "100%",
    },
    armsBottomLevel: {
        width: "100%",
        height: "3.125%",
        flexDirection: "row",
    },
    armBottom: {
        width: "26.3695652173913%",
        height: "100%",
    },
    trunkBottom: {
        width: "47.26086956521739%",
        height: "100%",
    },
    legsLevel: {
        width: "100%",
        height: "53.125%",
        flexDirection: "row",
    },
    wrist: {
        width: "26.3695652173913%",
        height: "100%",
    },
    legs: {
        width: "47.26086956521739%",
        height: "100%",
    },
    green: {
        backgroundColor: "#BCF3BE",
    },
    orange: {
        backgroundColor: "#F3DFBC",
    },
    red: {
        backgroundColor: "#F3BCBC",
    },
    neutral: {
        backgroundColor: "#999999",
    }

})