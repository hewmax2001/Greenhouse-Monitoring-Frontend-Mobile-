import {Button, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import Constants from "expo-constants";
import axios from "axios";
import {APP_ID, APP_TOKEN, BASE_URL} from "../constants";
import {registerIndieID} from "native-notify";

export default class ThresholdMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleFooter: false,
            modalVisible: false,
            selectVisible: true,
            minValue: "",
            maxValue: "",
            threshTitle: "",
            postfix: "",
            selectedVar: "",
        };
    }

    renderModal = () => {
        const {selectVisible, minValue, maxValue, threshTitle, postfix} = this.state;
        if (selectVisible) {
            return (
                <View style={styles.modalView}>
                    <Text>Select Variable</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.rowView}>
                            <View style={styles.buttonVariable}>
                                <Button title={"Temperature"} onPress={() => this.changeTemp()}></Button>
                            </View>
                            <View style={styles.buttonVariable}>
                                <Button title={"Humidity"} onPress={() => this.changeHum()}></Button>
                            </View>

                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.buttonVariable}>
                                <Button title={"Soil Moisture"} onPress={() => this.changeSoil()}></Button>
                            </View>
                            <View style={styles.buttonVariable}>
                                <Button title={"Light Intensity"} onPress={() => this.changeLight()}></Button>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.modalView}>
                <Text>{threshTitle}</Text>
                <Text>Minimum Threshold</Text>
                <View style={styles.rowView}>
                    <TextInput
                        style={styles.inputVariable}
                        value={minValue}
                        placeholder=""
                        keyboardType="numeric"
                        textAlign={'right'}
                        onChangeText={ value => {this.changeMin(value)}}
                    />
                    <Text>{postfix}</Text>
                </View>
                <Text>Maximum Threshold</Text>
                <View style={styles.rowView}>
                    <TextInput
                        style={styles.inputVariable}
                        value={maxValue}
                        placeholder=""
                        keyboardType="numeric"
                        textAlign={'right'}
                        onChangeText={ value => {this.changeMax(value)}}
                    />
                    <Text>{postfix}</Text>
                </View>
                <View style={styles.buttonVariable}>
                    <Button title="Set" onPress={() => {this.setThresholds().then(this.handleModal())}}/>
                </View>
                <View style={styles.buttonVariable}>
                    <Button title="Close" onPress={() => {
                        this.setState(() => ({selectVisible: true}))
                    }}/>
                </View>
            </View>
        );
    };

    handleModal = () => {
        this.setState(() => ({modalVisible: !modalVisible, selectVisible: true}));
        const {modalVisible} = this.state;
    };

    changeTemp = () => {
        const {profile} = this.props;
        let minValue = (profile.minTemp) ? profile.minTemp.toString() : "";
        let maxValue = (profile.maxTemp) ? profile.maxTemp.toString() : "";

        this.setState(() => ({
            selectVisible: false,
            minValue: minValue,
            maxValue: maxValue,
            threshTitle: "Temperature",
            postfix: "°C",
            selectedVar: "temp",
        }));
    }

    changeHum = () => {
        const {profile} = this.props;
        let minValue = (profile.minHumidity) ? profile.minHumidity.toString() : "";
        let maxValue = (profile.maxHumidity) ? profile.maxHumidity.toString() : "";

        this.setState(() => ({
            selectVisible: false,
            minValue: minValue,
            maxValue: maxValue,
            threshTitle: "Humidity",
            postfix: "%",
            selectedVar: "hum",
        }));
    }

    changeSoil = () => {
        const {profile} = this.props;
        let minValue = (profile.minSoil) ? profile.minSoil.toString() : "";
        let maxValue = (profile.maxSoil) ? profile.maxSoil.toString() : "";

        this.setState(() => ({
            selectVisible: false,
            minValue: minValue,
            maxValue: maxValue,
            threshTitle: "Soil Moisture",
            postfix: "%",
            selectedVar: "soil",
        }));
    }

    changeLight = () => {
        const {profile} = this.props;
        let minValue = (profile.minLight) ? profile.minLight.toString() : "";
        let maxValue = (profile.maxLight) ? profile.maxLight.toString() : "";

        this.setState(() => ({
            selectVisible: false,
            minValue: minValue,
            maxValue: maxValue,
            threshTitle: "Light Intensity",
            postfix: "",
            selectedVar: "light",
        }));
    }

    setThresholds = async () => {
        const {minValue, maxValue, selectedVar} = this.state;
        const {profile} = this.props;
        await axios.post(BASE_URL + 'set_' + selectedVar + '_alert/', {
            expo_token: profile.expoUserToken,
            min: minValue,
            max: maxValue,
        }).then(async response => {
            alert(response.data.message)
            await axios.post(BASE_URL + 'get_alert_profile/', {
                expo_token: profile.expoUserToken,
            }).then(function (response) {
                return response.data
            }).catch(error => console.log(error))
        })
    }

    changeMin = (value) => {
        this.setState(() => ({minValue: value}));
    }

    changeMax = (value) => {
        this.setState(() => ({maxValue: value}));
    }

    setAlertProfile = (profile) => {
        this.props.profile = profile;
    }


    render() {
        return (
            <View>
                <Button title="Threshold Alert Settings" onPress={() => this.handleModal()}/>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState(() => ({modalVisible: false}));
                    }}
                >
                    <Button title="Close Threshold Settings" onPress={() => {this.handleModal()}}/>
                    <View style={styles.popupContainer}>
                        {this.renderModal()}
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#80808080',
        alignItems: 'center',
    },
    modalView: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        margin: 20,
        minWidth: '70%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderStyle: "solid",
        borderColor: '#000',
        borderWidth: 2,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    rowView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 5,
    },
    buttonVariable: {
        width: "50%",
    },
    inputVariable: {
        flex: 1,
        marginLeft: 10,
        borderStyle: "solid",
        borderColor: '#000',
        borderWidth: 1,
    }
});