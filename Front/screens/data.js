import React from "react";
import Axios from "axios";
import globalStyle from "../globalStyle";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/header";
import ButtonSM from "../components/buttonSM";
import ChartPie from "../components/chartPie";

const mapStateToProps = (state) => {
    return {
        userId: state.profileReducer.userId,
    }
}

class Data extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            observations: [],
            proportions: [],
        }
    }

    componentDidMount() {
        Axios.post("http://192.168.1.23:3000/observations", {userId: this.props.userId})
            .then(response => {
                this.setState({ observations: response.data });
                this.proportions();
            })
            .catch(error => console.error(error))
    }

    averageScore = () => {
        let averageScore = 0;
        this.state.observations.map((obs) => averageScore += obs.final_score);
        averageScore = averageScore / this.state.observations.length;
        return averageScore;
    }

    proportions = () => {
        let proportions = [0, 0, 0, 0];
        this.state.observations.map((obs) => {
            if (obs.final_score < 3) {
                proportions[0]++;
            } else if (obs.final_score >= 3 && obs.final_score < 5) {
                proportions[1]++;
            } else if (obs.final_score >= 5 && obs.final_score < 7) {
                proportions[2]++;
            } else if (obs.final_score >= 7) {
                proportions[3]++;
            }
        })
        this.setState({ proportions });
    }

    goToObservationsList = () => {
        this.props.navigation.navigate("ObservationsList", {observations: this.state.observations})
    }


    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Données et statistiques"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />                
                <View style={styles.wrapper}>

                    <Text style={globalStyle.text}>Nombre d'observations : {this.state.observations.length}</Text>
                    
                    <ButtonSM
                        title="Accéder à la liste"
                        disabled={false}
                        onPress={this.goToObservationsList}
                    />

                    <Text style={globalStyle.text}>Note moyenne : {this.averageScore().toFixed(2)}</Text>

                    <Text style={globalStyle.text}>Proportions :</Text>

                    <ChartPie data={this.state.proportions} />

                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Data);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "yellowgreen",
        paddingTop: 88, // Header height (72) + 16 
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    wrapper: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        fontFamily: "openSans",
        fontSize: 20,
        color: "#242424",
    }
})