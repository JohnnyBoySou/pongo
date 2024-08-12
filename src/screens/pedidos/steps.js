import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';

const WizardForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(prevStep => prevStep + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    };

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const renderStepContent = () => {
        switch (step) {/*
            case 1:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.label}>Step 1: Enter Your Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={formData.name}
                            onChangeText={text => handleChange('name', text)}
                        />
                        <Button title="Next" onPress={handleNext} />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.label}>Step 2: Enter Your Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={text => handleChange('email', text)}
                        />
                        <Button title="Previous" onPress={handlePrevious} />
                        <Button title="Next" onPress={handleNext} />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.label}>Step 3: Set Your Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={text => handleChange('password', text)}
                        />
                        <Button title="Previous" onPress={handlePrevious} />
                        <Button title="Submit" onPress={() => console.log('Form Submitted', formData)} />
                    </View>
                );
            default:
                return null;
        */}
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.stepsContainer}>
                <View style={[styles.stepCircle, step === 1 && styles.activeStepCircle]}>
                    <Text style={[styles.stepText, step === 1 && styles.activeStepText]}>1</Text>
                </View>


                <View style={[styles.stepCircle, step === 2 && styles.activeStepCircle]}>
                    <Text style={[styles.stepText, step === 2 && styles.activeStepText]}>2</Text>
                </View>
                <View style={[styles.stepCircle, step === 3 && styles.activeStepCircle]}>
                    <Text style={[styles.stepText, step === 3 && styles.activeStepText]}>3</Text>
                </View>
                <View style={[styles.stepLine, { width: `${(step - 1) * 50}%` }]} />
                <View style={[styles.stepLineEmpty, { width: '100%' }]} />
            </View>
            <View style={styles.stepsContainerLabel}>
                <Text style={{ fontSize: 10 }}>Processando</Text>
                <Text style={{ fontSize: 10 }}>Enviado</Text>
                <Text style={{ fontSize: 10 }}>Entregue</Text>
            </View>
            {renderStepContent()}
        </ScrollView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 32,
        marginBottom: 20,
        position: 'relative',
    },
    stepsContainerLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 32,
        marginBottom: 20,
        position: 'relative',
    },
    stepCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3
    },
    activeStepCircle: {
        backgroundColor: '#91A6C4',
        zIndex: 2
    },
    stepText: {
        color: '#000',
        fontWeight: 'bold',
    },
    activeStepText: {
        color: '#fff',
    },
    stepLine: {
        height: 2,
        backgroundColor: '#3498db',
        position: 'absolute',
        top: 20,
        left: 0,
        zIndex: 1
    },
    stepLineEmpty: {
        height: 2,
        backgroundColor: '#918C8B',
        position: 'absolute',
        top: 20,
        left: 0,
        zIndex: 0
    },
    stepContent: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default WizardForm;
