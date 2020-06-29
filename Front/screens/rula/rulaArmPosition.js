import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ButtonXL from "../../components/buttonXL";
import ButtonSM from "../../components/buttonSM";

const data = [
    { value: 1, display: "+1" },
    { value: 2, display: "+2" },
    { value: 2, display: "+2" },
    { value: 3, display: "+3" },
    { value: 4, display: "+4" }
]

class RulaArmPosition extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            score: null,
            index: null,
        }
    }

    handleScore = (score, index) => {
        this.setState({ score, index });
    }

    handleObservation = () => {
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                shoulderScore: this.state.score,
            }
        }
        this.props.dispatch(action);
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaArmAdjustment");
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
                            Position du bras<Text style={{color: "red"}}>*</Text>
                        </Text>

                        <View style={styles.options}>

                            {data.map((data, index) => (
                                <ButtonXL
                                    key={index}
                                    source={data.display}
                                    onPress={() => this.handleScore(data.value, index)}
                                    index={index}
                                    currentIndex={this.state.index}
                                />
                            ))}
                        
                        </View>

                    </View>

                    <View style={globalStyle.submit}>
                        <ButtonSM
                            title="Etape suivante"
                            disabled={this.state.score === null ? true : false}
                            onPress={this.goToNextStep}
                        />
                    </View>

                </View>
            </View>
        )
    }

}

export default connect()(RulaArmPosition);

const styles = StyleSheet.create({
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    }
})