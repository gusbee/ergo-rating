import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const getPaddingTopWrapper =() =>{
    if (height / 10 < 72) {
        return 72 + 16;
    } else {
        return height / 10 + 16;
    }
}

export default {
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: getPaddingTopWrapper(), // Header height (72) + 4
        paddingHorizontal: "8%",
        paddingBottom: 16,
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    input: {
        width: "100%",
        maxWidth: 500,
        height: height / 20,
        minHeight: 48,
        borderWidth: 2,
        borderColor: "#203455",
        borderRadius: 12,
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 18,
        color: "#242424",
        paddingHorizontal: 16,
        marginVertical: height > 500 ? 24 : 12,
    },
    inputDisabled: {
        width: "100%",
        maxWidth: 500,
        height: height / 20,
        minHeight: 48,
        borderWidth: 2,
        borderColor: "#242424",
        borderRadius: 12,
        backgroundColor: "#cecece",
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 18,
        color: "#242424",
        paddingHorizontal: 16,
        marginVertical: height > 500 ? 24 : 12,
    },
    text: {
        fontFamily: "openSans",
        fontSize: width > 500 ? 22 : 18,
        color: "#242424",
        marginVertical: 12,
    },
    title: {
        fontFamily: "openSans",
        fontSize: 25,
        color: "#242424",
        marginVertical: 12,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    body: {
        width: "100%",
        flex: 10,
        alignItems: "center",
    },
    bodyCenter: {
        width: "100%",
        flex: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    submit: {
        width: "100%",
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    }
}