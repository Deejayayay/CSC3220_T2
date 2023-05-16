import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  buttons: {
    shadowColor: "#171717",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 4 },
    height: 220,
    borderRadius: 20,
    marginTop: 20,
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
});
