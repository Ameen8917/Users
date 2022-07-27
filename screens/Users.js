import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Checkbox, Appbar, IconButton, Colors, Button } from "react-native-paper"
import { UserContext } from '../context/usersContext'

const Users = ({ navigation }) => {
    const { users, deleteUser } = useContext(UserContext);
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Users" />
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('addUser')} />
            </Appbar.Header>
            <ScrollView>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    {users.length > 0 ? users.map((item) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("addUser", {
                                user: item
                            })} key={item.id} style={{ backgroundColor: '#fff', marginBottom: 10, borderRadius: 15, paddingHorizontal: 15, paddingVertical: 10, elevation: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={styles.imgWrapper}>
                                        <Image source={{ uri: item.profileUrl }}
                                            style={{ width: 100, height: 100, }} />
                                    </View>

                                    <View style={{ flex: 2, flexDirection: 'column', }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View>
                                                <Text style={styles.labelTxt}>Name</Text>
                                                <Text style={styles.mainTxt}>{item.firstName} {item.lastName}</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.labelTxt}>Date Of Birth</Text>
                                                <Text style={styles.mainTxt}>{item.dob}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                            <View>
                                                <View>
                                                    <Text style={styles.labelTxt}>Is Married</Text>
                                                </View>
                                                <View>
                                                    <Checkbox
                                                        color="#6200EE"
                                                        status={checked || item.isMarried === true ? 'checked' : 'unchecked'}
                                                    />
                                                </View>
                                            </View>
                                            <IconButton
                                                icon="delete"
                                                color={Colors.red800}
                                                iconColor={Colors.red50}
                                                // style={{ margin: 0 }}
                                                size={25}
                                                onPress={() => deleteUser(item.id)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }) : <View style={styles.centerElement}><Text style={{ textAlign: 'center', fontSize: 20 }}>There is no users!</Text></View>}

                </View>
            </ScrollView>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    centerElement: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgWrapper: {
        marginRight: 10
    },
    labelTxt: { fontWeight: '400', fontSize: 12 },
    mainTxt: { fontWeight: '500', fontSize: 14, color: '#000' }
})
