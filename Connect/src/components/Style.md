// if (item.firstName) {
// return (
// <View
// style={{
    //         flex: 1,
    //         borderBottomWidth: StyleSheet.hairlineWidth,
    //         padding: 10,
    //         borderColor: "#ddd",
    //       }}
// >
// <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
// <View
// style={{
    //             backgroundColor: "#40a0a8",
    //             width: 50,
    //             height: 50,
    //             borderRadius: 25,
    //             justifyContent: "center",
    //             alignItems: "center",
    //             overflow: "hidden",
    //           }}
// >
// <Text
// style={{
    //               fontSize: 20,
    //               color: "#fff",
    //               fontWeight: "bold",
    //             }}
// >
// {item.firstName.charAt(0)}
// </Text>
// </View>
// <Text
// style={{
    //             paddingHorizontal: 20,
    //             alignSelf: "center",
    //             fontWeight: "500",
    //             fontSize: 18,
    //           }}
// >
// {item.firstName}
// </Text>
// </View>
// </View>
// );
// }

Object {
"contactType": "person",
"firstName": "Kishore Uncle",
"id": "33105",
"imageAvailable": false,
"lastName": "Rd",
"lookupKey": "0r20473-3D394D37454B3151432D3F312F313F394D3F314B2F.3789r32300-3D394D37454B3151432D3F312F313F394D3F314B2F.2986r32515-3D394D37454B3151432D3F312F313F394D3F314B2F",
"middleName": "Delisle",
"name": "Kishore Uncle Delisle Rd",
"phoneNumbers": Array [
Object {
"id": "105956",
"isPrimary": 0,
"label": "mobile",
"number": "+91 98691 74873",
"type": "2",
},
Object {
"id": "105957",
"isPrimary": 0,
"label": "mobile",
"number": "+919869174873",
"type": "2",
},
Object {
"data3": "WhatsApp",
"id": "157875",
"isPrimary": 0,
"label": "mobile",
"number": "+919869174873",
"type": "2",
},
],
}

else {
return (
<View
style={{
              flex: 1,
              borderBottomWidth: StyleSheet.hairlineWidth,
              padding: 10,
              borderColor: "#ddd",
            }} >
<View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
<View
style={{
                  backgroundColor: "#40a0a8",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }} >
<Text
style={{
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "bold",
                  }} >
A
</Text>
</View>
<Text
style={{
                  paddingHorizontal: 20,
                  alignSelf: "center",
                  fontWeight: "500",
                  fontSize: 18,
                }} >
{item.firstName}
</Text>
</View>
</View>
);
}

       if (numberUser.startsWith("+91") || numberUser.startsWith("022")) {
        newNumber = numberUser.slice(2);
        if (userContacts.includes(newNumber.replace(/\s+/g, "").trim())) {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: StyleSheet.hairlineWidth,
                padding: 10,
                borderColor: "#ddd",
              }}
            >
              <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#40a0a8",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    alignSelf: "center",
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {item.firstName}
                </Text>
              </View>
            </View>
          );
        }
      }
    }

//Last seen
const userStatusRef = firebase.database().ref('/status/').child(`${this.props.route.params.contactss}`)

    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const isOnlineForDatabase = {
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    firebase.database().ref('.info/connected').on('value', (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        return;
      };

      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
        // The promise returned from .onDisconnect().set() will
        // resolve as soon as the server acknowledges the onDisconnect()
        // request, NOT once we've actually disconnected:
        // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

        // We can now safely set ourselves as 'online' knowing that the
        // server will mark us as offline once we lose connection.
        userStatusRef.set(isOnlineForDatabase);
      });
