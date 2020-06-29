import React from "react";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import globalStyle from "../../globalStyle";
import Header from "../../components/header";
import ButtonSM from "../../components/buttonSM";
import ButtonRadio from "../../components/buttonRadio";
import Axios from "axios";
import WarningMsg from "../../components/warningMsg";

const gender = [
    { label: "Femme", value: "F" },
    { label: "Homme", value: "H" }
];

const mapStateToProps = (state) => {
    return {
        userId: state.profileReducer.userId,
        employeeId: state.observationReducer.employeeId
    }
}

class RulaStart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            employeeName: "",
            genderIndex: null,
            observerName: "",
            functionName: "",
            title: "",
            displayWarning: false,
            observedEmployeesList: [],
        }
    }

    componentDidMount() {
        if (this.props.route.params.data !== undefined) {
            let genderIndex = 0;
            if (this.props.route.params.data.employee_gender === "H") {
                genderIndex = 1;
            } 
            this.setState({
                employeeName: this.props.route.params.data.employee_name,
                employeeId: this.props.route.params.employee_id,
                genderIndex: genderIndex,
                functionName: this.props.route.params.data.employee_function,
            })
        }
    }

    handleEmployeeName = (employeeName) => {
        this.setState({ employeeName });
    }

    handleObserverName = (observerName) => {
        this.setState({ observerName });
    }

    handleFunctionName = (functionName) => {
        this.setState({ functionName });
    }

    handleTitle = (title) => {
        this.setState({ title });
    }

    handleGenderIndex = (genderIndex) => {
        this.setState({ genderIndex });
    }

    closeWarningMessage = () => {
        this.setState({ displayWarning: false });
    }

    goToNextStep = () => {
        // this.employeeExists();
        this.handleObservation();
        this.props.navigation.navigate("RulaArmPosition");
    }

    employeeExists = () => {
        Axios.get(
            "http://192.168.1.23:3000/observations/?id=" +
            this.props.userId +
            "&name=" +
            this.state.employeeName
        )
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        displayWarning: true,
                        observedEmployeesList: response.data,
                    });
                }
            })
            .catch(error => console.error(error))
    }

    handleObservation = () => {
        const action = {
            type: "HANDLE_OBSERVATION",
            value: {
                method: "RULA",
                gender: gender[this.state.genderIndex].value,
                employeeName: this.state.employeeName,
                functionName: this.state.functionName,
                title: this.state.title,
                observerName: this.state.observerName
            }
        }
        this.props.dispatch(action);
    }

    canValidate = () => {
        if (
            this.state.genderIndex === null ||
            this.state.employeeName === "" ||
            this.state.functionName === "" ||
            this.state.title === "" ||
            this.state.observerName === ""
        ) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <Header
                    title="RULA"
                    canBack={true}
                    canSignOut={true}
                    navigation={this.props.navigation}
                />
                <View style={globalStyle.wrapper}>

                    <View style={globalStyle.bodyCenter}>
                        <ButtonRadio
                            items={gender}
                            index={this.state.genderIndex}
                            onPress={this.handleGenderIndex}
                            flexDirectionRow={true}
                        />
                        
                        <TextInput
                            style={this.props.route.params.data === undefined ? globalStyle.input : globalStyle.inputDisabled}
                            value={this.state.employeeName}
                            placeholder="Personne observée"
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            onChangeText={this.handleEmployeeName}
                            editable={this.props.route.params.data === undefined ? true : false}
                        />

                        <TextInput
                            style={globalStyle.input}
                            value={this.state.functionName}
                            placeholder="Intitulé du poste"
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            onChangeText={this.handleFunctionName}
                        />

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Titre (ex: première observation)"
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            onChangeText={this.handleTitle}
                        />

                        <TextInput
                            style={globalStyle.input}
                            placeholder="Observateur"
                            placeholderTextColor="rgba(0,0,0,0.6)"
                            onChangeText={this.handleObserverName}
                        />
                    </View>

                    <View style={globalStyle.submit}>
                        <ButtonSM
                            title="Commencer"
                            disabled={this.canValidate() ? false : true}
                            onPress={this.goToNextStep}
                        />
                    </View>
                </View>
                
                {this.state.displayWarning ? (
                    <WarningMsg
                        employeesList={this.state.observedEmployeesList}
                        onClickNo={this.closeWarningMessage}
                    />
                ): (
                    <></>
                )}
                
            </View>
        )
    }

}

export default connect(mapStateToProps)(RulaStart);