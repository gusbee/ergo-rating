import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ButtonXL from "../../components/buttonXL";
import ButtonSM from "../../components/buttonSM";
import CheckBox from "../../components/checkBox";

const data = [
    { value: 1, display: "+1" },
    { value: 2, display: "+2" },
    { value: 3, display: "+3" },
    { value: 3, display: "+3" },
]

class RulaWristPosition extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            checked: false,
            index: null,
        }
    }

    handleScore = (score, index) => {
        this.setState({ score, index });
    }

    handleChecked = (value) => {
        this.setState({ checked: value });
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaWristTorsion");
    }

    handleObservation = () => {
        let score = this.state.score;
        if (this.state.checked) {
            score++;
        }
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                wristPosition: score,
            }
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Analyse bras et poignet"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.body}>

                        <Text style={globalStyle.title}>
                            Position du poignet<Text style={{color: "red"}}>*</Text>
                        </Text>

                        <View style={styles.options}>

                            {data.map((data, index) => (
                                <ButtonXL
                                    key={index}
                                    index={index}
                                    currentIndex={this.state.index}
                                    source={data.display}
                                    onPress={() => this.handleScore(data.value, index)}
                                />
                            ))}
                            
                        </View>

                        <CheckBox
                            label="Abduction du poignet"
                            checked={() => { this.handleChecked(true) }}
                            unchecked={() => {this.handleChecked(false)}}
                        />

                    </View>

                    <View style={globalStyle.submit}>

                        <ButtonSM
                            title="Etape suivante"
                            disabled={this.state.score < 1 ? true : false}
                            onPress={this.goToNextStep}
                        />

                    </View>                    

                </View>
            </View>
        )
    }

}

export default connect()(RulaWristPosition)

const styles = StyleSheet.create({
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    }
})