import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ButtonXL from "../../components/buttonXL";
import ButtonSM from "../../components/buttonSM";

const data = [
    { value: 1, display: "+1" },
    { value: 2, display: "+2" }
]

class RulaWristTorsion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            index: null,
        }
    }

    handleScore = (score, index) => {
        this.setState({ score, index });
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaActivityPartOne");
    }

    handleObservation = () => {
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                wristTorsion: this.state.score,
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
                            Torsion du poignet<Text style={{color: "red"}}>*</Text>
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

export default connect()(RulaWristTorsion)

const styles = StyleSheet.create({
    options: {
        alignItems: "center",
    }
})