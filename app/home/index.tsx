import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet,Image} from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            
              <Image
                style={styles.image}
                source={{uri:"https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/480969572_650363100844587_4839487325235903104_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEZlzJiARep8qCCgheeON30n9GUFt75a3Cf0ZQW3vlrcF2x-n5-2aS9cLQbIJFaqs48W-NQ2nKjS6tfAvPQG8Nx&_nc_ohc=JTwuHoMNcpoQ7kNvgEWYqWC&_nc_oc=Adh-4D9FlNKzOoH0iEiMMbj7nsO-ocfajWPHLtywWYpjgqLQwvSP3D7S9kVbjTRmRVo&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=AY252YzyD9KBItu-Tj_WRm5&oh=00_AYDyM_hrTt8nGrC7JvJpmDlNnAMZHF01zmGJOfZZ0lv36Q&oe=67C6AB72"}}
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