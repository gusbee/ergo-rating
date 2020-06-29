import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import CheckBox from "../../components/checkBox";
import ButtonSM from "../../components/buttonSM";

const data = [
    { value: 1, display: "Les épaules sont relevées" },
    { value: 1, display: "Le bras est en abduction" },
    { value: 1, display: "Le bras est soutenu ou la personne est penchée" }
]

const mapStateToProps = (state) => {
    return {
        shoulderScore: state.observationReducer.shoulderScore
    }
}

class RulaArmAdjustment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    }

    incrementScore = (value) => {
        this.setState({score: this.state.score + value})
    }

    decrementScore = (value) => {
        this.setState({score: this.state.score - value})
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaElbowPosition");
    }

    handleObservation = () => {
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                shoulderScore: this.props.shoulderScore + this.state.score,
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

                        <Text style={globalStyle.title}>Ajustement du bras</Text>

                        {data.map((data, index) => (
                            <CheckBox
                                key={index}
                                label={data.display}
                                checked={this.incrementScore}
                                unchecked={this.decrementScore}
                                value={data.value}
                            />
                        ))}

                    </View>
                    
                    <View style={globalStyle.submit}>

                        <ButtonSM
                            title="Etape suivante"
                            onPress={this.goToNextStep}
                        />

                    </View>
                    

                </View>
            </View>
        )
    }

}

export default connect(mapStateToProps)(RulaArmAdjustment);