// Theme.js

export const Colors = {
    primary: '#050c54',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#ffffff',
    dark: '#272d2f',
    background: '#D7D7D7',
    black: '#000000',
    container: '#ffc529',
    orange: 'fe7240',
};

export const Fonts = {
    regular: 'Arial',
    bold: 'Arial-Bold',
    italic: 'Arial-Italic',
};

export const Styles = {

    // Basicos


    containerDisplay: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },

    headerContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.dark,
        textAlign: 'center',
    },
    taskContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: Colors.light,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskText: {
        fontSize: 18,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    pointsText: {
        fontSize: 16,
        color: '#888',
    },
    background: {
        backgroundColor: Colors.background,
    },
    text: {
        color: Colors.dark,
    },

    // ADDS

    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#333333",
        color: "#ffffff",
        padding: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        alignItems: "center",
    },
    button: {
        backgroundColor: "#55c2da",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#ffffff",
    },
};
