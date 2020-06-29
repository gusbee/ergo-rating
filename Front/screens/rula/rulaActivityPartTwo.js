import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ButtonRadio from "../../components/buttonRadio";
import ButtonSM from "../../components/buttonSM";

const muscleActivityItems = [
    { label: "Posture statique supérieure à 10 minutes", value: 1 },
    {label:"Action répétée plus de 4 fois par minutes", value: 1},
]

const chargeItems = [
    { label: "Charge inférieure à 2kg par intermittence", value: 0 },
    { label: "Charge entre 2 et 10kg par intermittence", value: 1 },
    { label: "Charge entre 2 et 10kg en posture statique ou répétée", value: 2 },
    {label: "Charge supérieure à 10kg avec répétitivité ou chocs", value: 3},
]

class RulaActivityPartTwo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            activityIndex: null,
            chargeIndex: null,
        }
    }

    handleMuscleActivityIndex = (activityIndex) => {
        this.setState({ activityIndex });
    }

    handleChargeIndex = (chargeIndex) => {
        this.setState({ chargeIndex });
    }

    canValidate = () => {
        if (this.state.chargeIndex === null) {
            return true;
        }
        return false;
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaFinalScore");
    }

    handleObservation = () => {
        let activityScore;
        let chargeScore;
        if (this.state.activityIndex === null) {
            activityScore = 0;
        } else {
            activityScore = muscleActivityItems[this.state.activityIndex].value;
        }
        if (this.state.chargeIndex === null) {
            chargeScore = 0;
        } else {
            chargeScore = chargeItems[this.state.chargeIndex].value;
        }
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                activityScore2: activityScore + chargeScore,
            }
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Analyse nuque, tronc et jambes"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.body}>

                        <Text style={globalStyle.title}>Activité musculaire</Text>

                        <ButtonRadio
                            items={muscleActivityItems}
                            index={this.state.activityIndex}
                            onPress={this.handleMuscleActivityIndex}
                        />

                        <Text style={globalStyle.title}>
                            Effort et charge<Text style={{color: "red"}}>*</Text>
                        </Text>

                        <ButtonRadio
                            items={chargeItems}
                            index={this.state.chargeIndex}
                            onPress={this.handleChargeIndex}
                        />

                    </View>

                    <View style={globalStyle.submit}>

                        <ButtonSM
                            title="Terminer l'analyse"
                            disabled={this.canValidate() ? true : false}
                            onPress={this.goToNextStep}
                        />

                    </View>
                    

                </View>
            </View>
        )
    }

}

export default connect()(RulaActivityPartTwo)