import React, { useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PointsContext } from './Points';
import { Colors, Styles } from './Theme';

const Header = ({ totalPoints }) => (
    <View style={Styles.headerContainer}>
        <Text style={Styles.headerText}>{`Pontos: ${totalPoints}`}</Text>
    </View>
);

const Habit = ({ habit, doHabit }) => (
    <View style={styles.habitContainer}>
        <Text style={styles.habitText}>{habit.text}</Text>
        <Text style={styles.pointsText}>{`Pontos: ${habit.points}`}</Text>
        <Text style={styles.typeText}>{`Tipo: ${habit.type}`}</Text>
        <Button color={'#fe7240'} title="+" onPress={() => doHabit(habit.id)} />
    </View>
);

const HabitsList = ({ habits, doHabit }) => {
    return habits.map(habit => (
        <Habit key={habit.id} habit={habit} doHabit={doHabit} />
    ));
};

const Habits = ({ habits, doHabit }) => {
    const navigation = useNavigation();
    const { totalPoints, addPoints } = useContext(PointsContext);

    useEffect(() => {
        let points = 0;
        habits.forEach(habit => {
            if (habit.completed) {
                points += habit.points;
            }
        });
        addPoints(points);
    }, [habits, addPoints]);

    const handleDoHabit = (habitId) => {
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            const points = habit.type === "Ruim" ? -habit.points : habit.points;
            addPoints(points);
            doHabit(habitId);
        }
    };

    return (
        <View style={Styles.containerDisplay}>
            <Header totalPoints={totalPoints} />
            <Text style={Styles.title}>Habitos</Text>
            <View style={Styles.buttonContainer}>
                <TouchableOpacity style={Styles.button} onPress={() => navigation.navigate('AddHabit')}>
                    <Text style={Styles.buttonText}>Adicionar Hábito</Text>
                </TouchableOpacity>
            </View>
            <HabitsList habits={habits} doHabit={handleDoHabit} />
        </View>
    );
}


const styles = StyleSheet.create({

    habitContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 10,
        marginVertical: 5,
        backgroundColor: Colors.container,
        borderRadius: 5,
        maxWidth: "100%", // Garante que o container não ultrapasse a largura da tela
        width: "100%", // Garante que o container ocupe toda a largura disponível
      },
    habitText: {
        fontSize: 16,
    },
    pointsText: {
        fontSize: 14,
    },
    typeText: {
        fontSize: 14,
    },
});

export default Habits;
