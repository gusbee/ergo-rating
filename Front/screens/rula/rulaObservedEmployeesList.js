import React from "react";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import { ScrollView } from "react-native-gesture-handler";
import ButtonSM from "../../components/buttonSM";
import Axios from "axios";

const mapStateToProps = (state) => {
    return {
        userId: state.profileReducer.userId
    }
}

class RulaObservedEmployeesList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            search: "",
        }
    }

    //Get all observed employees
    componentDidMount() {
        Axios.get("http://192.168.1.23:3000/observations/?userId=" + this.props.userId)
            .then(response => this.clearDuplicates(response.data))
            .catch(error => console.error(error))
    }

    handleSearch = (search) => {
        this.setState({ search });
    }

    searchEmployee = (search) => {
        this.handleSearch(search);
        this.filteredList = this.state.list.filter(
            (item) => item.employee_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
    }

    // Clear all duplicates employees.
    clearDuplicates = (list) => {
        const indexes = [];
        const noDuplicates = [];
        list.map((item, index) => {
            if (indexes.indexOf(item.employee_id) < 0) {
                indexes.push(item.employee_id);
                noDuplicates.push(item);
            }
        })
        this.setState({list: noDuplicates})
    }

    handleObservation = (id) => {
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                employeeId: id
            }
        }
        this.props.dispatch(action);
    }

    goToNextStep = (id, data) => {
        this.handleObservation(id);
        this.props.navigation.navigate("RulaStart", {data: data});
    }

    render() {
        return (
            <View style={globalStyle.container}>
                
                <Header
                    title="Personnes observées"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />

                <View style={globalStyle.wrapper}>

                    <TextInput
                        style={globalStyle.input}
                        placeholder="Recherche"
                        placeholderTextColor="rgba(0,0,0,0.6)"
                        onChangeText={this.handleSearch}
                    />

                    
                    
                    {/* Display list of observed employees */}
                    <ScrollView
                        style={{ width: "100%" }}
                        contentContainerStyle={{paddingBottom: 60}}
                    >
                        {this.state.list
                            .filter(item => item.employee_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
                            .map((item, index) => (
                            <ButtonSM
                                key={index}
                                title={item.employee_name}
                                disabled={false}
                                onPress={() => this.goToNextStep(item.employee_id, item)}
                            />
                        ))}
                    </ScrollView>

                    <ButtonSM
                        title="La personne n'est pas dans la liste"
                        onPress={() => this.goToNextStep(this.state.list.length + 1)}
                    />

                </View>

            </View>
        );
    }
}

export default connect(mapStateToProps)(RulaObservedEmployeesList);