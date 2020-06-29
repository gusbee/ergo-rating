import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ScoreDisplay from "../../components/scoreDisplay";
import ButtonSM from "../../components/buttonSM";
import TableA from "../../tables/rulaTableA";
import TableB from "../../tables/rulaTableB";
import TableC from "../../tables/rulaTableC";

const { width, height } = Dimensions.get("window");

const mapStateToProps = (state) => {
    return {
        observation: state.observationReducer
    }
}

class RulaFinalScore extends React.Component{
    
    rowIndexTableA = (this.props.observation.shoulderScore - 1) * 3 + this.props.observation.elbowPosition;
    colIndexTableA = this.props.observation.wristPosition * this.props.observation.wristTorsion;
    
    rowIndexTableB = this.props.observation.neckPosition;
    colIndexTableB = (this.props.observation.trunkPosition - 1) * 2 + this.props.observation.legsPosition;

    rowIndexTableC = TableA[this.rowIndexTableA - 1][this.colIndexTableA - 1] + this.props.observation.activityScore1
    colIndexTableC = TableB[this.rowIndexTableB - 1][this.colIndexTableB - 1] + this.props.observation.activityScore1

    getFinalScore = () => {
        if (this.rowIndexTableC > 7) {
            this.rowIndexTableC = 7;
        }
        if (this.colIndexTableC > 6) {
            this.colIndexTableC = 6;
        }
        return TableC[this.rowIndexTableC - 1][this.colIndexTableC - 1]
    }
    
    getTextResult = (score) => {
        if (score < 3) {
            return <Text style={styles.noRisk}>Risque négligeable, pas d'action nécessaire.</Text>
        } else if (score >= 3 && score < 5) {
            return <Text style={styles.lowRisk}>Risque faible, un changement peut-être nécessaire.</Text>
        } else if (score >= 5 && score < 7) {
            return <Text style={styles.mediumRisk}>Risque moyen, enquêter, à améliorer bientôt.</Text>
        } else if (score >= 7) {
            return <Text style={styles.highRisk}>Risque fort, à améliorer maintenant.</Text>
        }
    }

    getStyle = (score) => {
        if (score < 3) {
            return styles.noRiskContainer;
        } else if (score >= 3 && score < 5) {
            return styles.lowRiskContainer;
        } else if (score >= 5 && score < 7) {
            return styles.mediumRiskContainer;
        } else if (score >= 7) {
            return styles.highRiskContainer;
        }
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaComment");
    }

    handleObservation = () => {
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                score1: TableA[this.rowIndexTableA - 1][this.colIndexTableA - 1],
                score2: TableB[this.rowIndexTableB - 1][this.colIndexTableB - 1],
                rulaScore: this.getFinalScore(),
            }
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Résultats"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.body}>

                        <ScoreDisplay
                            label="Score bras et poignet"
                            score={TableA[this.rowIndexTableA - 1][this.colIndexTableA - 1]}
                        />

                        <ScoreDisplay
                            label="Score nuque, tronc et jambes"
                            score={TableB[this.rowIndexTableB - 1][this.colIndexTableB - 1]}
                        />

                        <ScoreDisplay
                            label="Score RULA"
                            score={this.getFinalScore()}
                        />
                        
                        <View style={this.getStyle(this.getFinalScore())}>
                            <Text>{this.getTextResult(this.getFinalScore())}</Text>
                        </View>

                    </View>

                    <View style={globalStyle.submit}>

                        <ButtonSM
                            title="Ajouter un commentaire"
                            disabled={false}
                            onPress={this.goToNextStep}
                        />

                    </View>

                </View>
            </View>
        )
    }

}

export default connect(mapStateToProps)(RulaFinalScore)

const styles = StyleSheet.create({
    noRiskContainer: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#BCF3BE",
        borderRadius: 12,
        padding: "5%",
        marginVertical: 12,
    }, 
    lowRiskContainer: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#EFF3BC",
        borderRadius: 12,
        padding: "5%",
        marginVertical: 12,
    },
    mediumRiskContainer: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#F3DFBC",
        borderRadius: 12,
        padding: "5%",
        marginVertical: 12,
    },
    highRiskContainer: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#F3BCBC",
        borderRadius: 12,
        padding: "5%",
        marginVertical: 12,
    },
    noRisk: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 25 : 20,
        color: "#149800",
    },
    lowRisk: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 25 : 20,
        color: "#AA8200",
    },
    mediumRisk: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 25 : 20,
        color: "#A34C00",
    },
    highRisk:{
        fontFamily: "openSans",
        fontSize: width > 500 ? 25 : 20,
        color: "#780101",
    }
})