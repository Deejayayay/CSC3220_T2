import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  buttons: {
    height: 220,
    borderRadius: 20,
    marginTop: 30,
    elevation: 3,
    flexDirection: "column",
    backgroundColor: "#BCD4A7",
  },
  modalButt: {
    width: 100,
    height: 100,
  },  
  debugBtn: {
    height: 50,
    borderRadius: 20,
    elevation: 3,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    backgroundColor: "#BCD4A7",
  },
  headers: {
    fontSize: 24,
    fontWeight: '500'
  },
  subHeaders: {
    fontSize: 17,
    fontWeight: '400'
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  marginText: {
    marginLeft: 20,
  },
  buttonSpace: {
    marginTop: 20,
  },
  img: {
    marginLeft: 30,
    marginRight: 30,
    width: 300,
    height: 300,
  },
  space: {
    marginTop: 8
  }
});
