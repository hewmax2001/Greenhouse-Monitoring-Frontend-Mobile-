import {Button, Modal, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import Constants from "expo-constants";

export default class ThresholdMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleFooter: false,
            modalVisible: false,
            selectVisible: true,
            minValue: "0",
            maxValue: "50",
            threshTitle: "",
        };
    }

    renderModal = () => {
        const {selectVisible} = this.state;
        if (selectVisible) {
            return (
                <View>
                    <Text>Select Variable</Text>
                    <View>
                        <Button title={"Temperature"} onPress={() => this.setTemperature()}></Button>
                        <Button title={"Humidity"}></Button>
                        <Button title={"Soil Moisture"}></Button>
                        <Button title={"Light Intensity"}></Button>
                    </View>
                </View>
            );
        }
        return (
            <View>
                <Text>{this.state.threshTitle}</Text>
                <TextInput
                    value={this.state.minValue}
                    placeholder=""
                    keyboardType="numeric"
                />
                <TextInput
                    value={this.state.maxValue}
                    placeholder=""
                    keyboardType="numeric"
                />
                <Button title="Set"/>
                <Button title="Close" onPress={() => {
                    this.setState(() => ({selectVisible: true}))
                }}/>
            </View>
        );
    };

    handleModal = () => {
        this.setState(() => ({modalVisible: !modalVisible}));
        const {modalVisible} = this.state;
    };

    setTemperature = () => {
        this.setState(() => ({
            selectVisible: false,
            minValue: 0,
            maxValue: 50,
            threshTitle: "Temperature",
        }));
    }

    onPressVisible = () => {
        this.setState(() => ({isVisibleFooter: !isVisibleFooter}));
        const {isVisibleFooter} = this.state;
    };

    render() {
        return (
            <View>
                <Button title="Set Thresholds" onPress={() => this.handleModal()}/>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState(() => ({modalVisible: false}));
                    }}
                >
                    <Button title="Hide modal" onPress={() => {
                        this.setState(() => ({modalVisible: false}));
                    }}/>
                    <View style={styles.popupContainer}>
                        <View style={styles.modalView}>
                            {this.renderModal()}
                        </View>
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
        margin: 20,
        minWidth: '50%',
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
    },
});