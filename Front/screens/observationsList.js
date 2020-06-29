import React from "react";
import { View } from "react-native";
import globalStyle from "../globalStyle";
import Header from "../components/header";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import ButtonSM from "../components/buttonSM";

export default class observationsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
        }
    }

    observationsFiltered = this.props.route.params.observations;

    handleSearch = (search) => {
        this.setState({ search });
    }

    searchObservation = (search) => {
        this.handleSearch(search);
        this.observationsFiltered = this.props.route.params.observations.filter(
            (observation) => observation.employee_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
    }

    goToObservationDetails = (observation) => {
        this.props.navigation.navigate("ObservationDetails", {observation: observation})
    }
    
    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="Liste des observations"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>
                    <TextInput
                        style={globalStyle.input}
                        placeholder="Personne observée"
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        onChangeText={this.searchObservation}
                    />
                    <ScrollView
                        style={{ width: "100%" }}
                        contentContainerStyle={{ alignItems: "center",  paddingBottom: 40,}}
                    >
                        {this.observationsFiltered
                            .map((observation, index) => (
                                <ButtonSM
                                    key={index}
                                    title={observation.employee_name}
                                    disabled={false}
                                    onPress={() => this.goToObservationDetails(observation)}
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}