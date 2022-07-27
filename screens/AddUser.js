import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { TextInput, Appbar, Checkbox, Button, Badge, Colors, HelperText, IconButton } from "react-native-paper"
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { UserContext } from '../context/usersContext'
import DocumentPicker from 'react-native-document-picker';

const AddUser = ({ route, navigation }) => {

    const { addUser, updateUser, users } = useContext(UserContext);
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        id: null,
        firstName: '',
        lastName: '',
        profileUrl: '',
        isMarried: false,
        dob: moment(date).format('l')
    })

    let errorKey = { firstNameError: "", lastNameError: "", profileUrlError: "", isMarriedError: "", dobError: "" };
    let [errorObj, seterrorObj] = useState(errorKey);

    let validateForm = () => {
        let newError = {}


        if (!user.firstName) {
            newError.firstNameError = "First Name is required"
        }
        if (!user.lastName) {
            newError.lastNameError = "Last Name is required"
        }
        if (!user.profileUrl) {
            newError.profileUrlError = "Profile is required"
        }
        if (!user.dob) {
            newError.dobError = "DOB is required"
        }
        // if (!user.isMarried == "") {
        //     newError.isMarriedError = "Marital status is required"
        // }

        if (Object.keys(newError).length) {
            seterrorObj(newError);
            return false;
        }
        return true;

    }

    const hanldeSave = () => {
        if (!validateForm()) {
            return
        }

        if (route?.params) {
            updateUser(user?.id, user);
        } else {
            user.id = users.length + 1
            addUser(user);
        }

        setUser({
            id: null,
            firstName: '',
            lastName: '',
            profileUrl: '',
            isMarried: false,
            dob: moment(date).format('l')
        })

        navigation.navigate("Home")
    }

    const handleUploadProfile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            if (res) {
                setUser({ ...user, profileUrl: res.uri });
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }

    const handleRemoveProfile = () => {
        setUser({ ...user, profileUrl: null })
    }

    useEffect(() => {
        if (route?.params) {
            const { user } = route?.params;
            setChecked(user?.isMarried);
            setUser(user);
        }
    }, [route?.params])

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title={route?.params ? "Update User" : "Add User"} />
            </Appbar.Header>
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="First Name"
                            value={user.firstName}
                            onChangeText={(text) => setUser({ ...user, firstName: text })}
                            mode="outlined"
                            style={{ backgroundColor: '#fff' }}
                        />
                        {errorObj.firstNameError ? <HelperText padding='none' type="error" visible={errorObj && errorObj.firstNameError}>{errorObj.firstNameError}</HelperText> : null}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Last Name"
                            value={user.lastName}
                            mode="outlined"
                            onChangeText={(text) => setUser({ ...user, lastName: text })}
                            style={{ backgroundColor: '#fff' }}
                        />
                        {errorObj.lastNameError ? <HelperText padding='none' type="error" visible={errorObj && errorObj.lastNameError}>{errorObj.lastNameError}</HelperText> : null}
                    </View>

                    {/* <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Profile Url"
                            value={user.profileUrl}
                            mode="outlined"
                            onChangeText={(text) => setUser({ ...user, profileUrl: text })}
                            style={{ backgroundColor: '#fff' }}
                        />
                        {errorObj.profileUrlError ? <HelperText padding='none' type="error" visible={errorObj && errorObj.profileUrlError}>{errorObj.profileUrlError}</HelperText> : null}
                    </View> */}

                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            mode="outlined"
                            label="Date Of Birth"
                            value={moment(date).format('l')}
                            style={{ backgroundColor: '#fff' }}
                            right={<TextInput.Icon onPress={() => setOpen(true)} name="calendar" />}
                        />
                        <DatePicker
                            modal
                            open={open}
                            mode="date"
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date);
                                setUser({ ...user, dob: moment(date).format('l') })
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                        {errorObj.dobError ? <HelperText padding='none' type="error" visible={errorObj && errorObj.dobError}>{errorObj.dobError}</HelperText> : null}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                    setUser({ ...user, isMarried: !checked })
                                }}
                                color="#6200EE"
                            />
                            <Text>Is Married</Text>
                        </View>
                        {errorObj.isMarriedError ? <HelperText padding='none' type="error" visible={errorObj && errorObj.isMarriedError}>{errorObj.isMarriedError}</HelperText> : null}
                    </View>


                    <View style={{ backgroundColor: '#fff', paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 2, marginBottom: 20 }}>
                        {user.profileUrl ?
                            <TouchableOpacity
                                onPress={handleUploadProfile}
                                style={{ position: 'relative' }}
                            >
                                <IconButton
                                    icon="close-circle"
                                    size={20}
                                    style={{ position: 'absolute', top: -22, right: -15, zIndex: 1000, }}
                                    onPress={handleRemoveProfile}
                                />
                                <Image source={{ uri: user.profileUrl }}
                                    style={{ width: 100, height: 100, }} />
                                <Text style={{ textAlign: 'center', fontWeight: '500', marginTop: 10 }}>Update Profle</Text>
                            </TouchableOpacity> :

                            <TouchableOpacity>
                                <IconButton
                                    icon="upload"
                                    color={"#6200EE"}
                                    size={40}
                                    style={{ alignSelf: 'center', }}
                                    onPress={() => handleUploadProfile()}
                                />
                                <Text style={{ textAlign: 'center', fontWeight: '500' }}>Upload Profle</Text>
                            </TouchableOpacity>

                        }
                        {errorObj.profileUrlError ? <HelperText padding='none' type="error" visible={errorObj && errorObj.profileUrlError}>{errorObj.profileUrlError}</HelperText> : null}

                    </View>

                    <View>
                        <Button mode="contained" style={{ paddingVertical: 5 }} onPress={hanldeSave}>
                            {route?.params ? "Update" : "Save"}
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default AddUser

const styles = StyleSheet.create({})
