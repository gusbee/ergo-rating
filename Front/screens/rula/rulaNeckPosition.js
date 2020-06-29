import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ButtonXL from "../../components/buttonXL";
import CheckBox from "../../components/checkBox";
import ButtonSM from "../../components/buttonSM";

const data = [
    { value: 1, display: "+1" },
    { value: 2, display: "+2" },
    { value: 3, display: "+3" },
    { value: 4, display: "+4" }
]

class RulaNeckPosition extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            index: null,
            rotateChecked: false,
            sideBendingChecked: false,
        }
    }

    handleScore = (score, index) => {
        this.setState({ score, index });
    }

    handleRotateChecked = () => {
        if (this.state.rotateChecked) {
            this.setState({rotateChecked: false})
        } else {
            this.setState({rotateChecked: true})
        }
    }

    handleSideBendingChecked = () => {
        if (this.state.sideBendingChecked) {
            this.setState({sideBendingChecked: false})
        } else {
            this.setState({sideBendingChecked: true})
        }
    }

    handleObservation = () => {
        let score = this.state.score;
        this.state.rotateChecked ? score++ : score;
        this.state.sideBendingChecked ? score++ : score;
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                neckPosition: score,
            }
        }
        console.log(action.value);
        this.props.dispatch(action);
    }

    goToNextStep = () => {
        this.handleObservation();
        this.props.navigation.navigate("RulaTrunkPosition");
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Analyse tronc, nuque et jambes"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.body}>

                        <Text style={globalStyle.title}>
                            Position de la nuque<Text style={{color: "red"}}>*</Text>
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

                        <CheckBox
                            label="Rotation de la nuque"
                            checked={this.handleRotateChecked}
                            unchecked={this.handleRotateChecked}
                        />

                        <CheckBox
                            label="Inclinaison de la nuque"
                            checked={this.handleSideBendingChecked}
                            unchecked={this.handleSideBendingChecked}
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

export default connect()(RulaNeckPosition)

const styles = StyleSheet.create({
    options: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    }
})