import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet,Image} from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            
              <Image
                style={styles.image}
                source={{uri:"https://www.canva.com/design/DAGjmf10AMs/H_JnQRfJYUqp6Fa44ajHuw/edit?utm_content=DAGjmf10AMs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"}}
            />
       
            <View style={styles.buttonContainer}>
                <Link href="/(deteccionGases)" asChild>
                    <Pressable style={styles.button}>
                        <Text>Inicio</Text>
                    </Pressable>
                </Link>

                <Link href="/aunth/profile" asChild>
                    <Pressable style={styles.button}>
                        <Text>Perfil</Text>
                    </Pressable>
                </Link>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        flex: 1,
        alignItems: "center",
        backgroundColor:"#E8F5E9",
    },
    image: {
        width: 300, 
        height: 300, 
        borderRadius: 10, 
        marginBottom: 20, 
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10, 
    },
    button: {
        width: "45%", 
        height: 60,   
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: "#20d407",
        borderBlockColor: "#0006cf"
    },
}); 