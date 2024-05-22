import React, { useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PointsContext } from './Points';

const Header = ({ totalPoints }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Total Points: ${totalPoints}`}</Text>
    </View>
);

const Habit = ({ habit, doHabit }) => (
    <View style={styles.habitContainer}>
        <Text style={styles.habitText}>{habit.text}</Text>
        <Text style={styles.pointsText}>{`Points: ${habit.points}`}</Text>
        <Text style={styles.typeText}>{`Type: ${habit.type}`}</Text>
        <Button title="Do" onPress={() => doHabit(habit.id)} />
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
            const points = habit.type === "bad" ? -habit.points : habit.points;
            addPoints(points);
            doHabit(habitId);
        }
    };
    
    return (
        <View style={styles.container}>
            <Header totalPoints={totalPoints} />
            <Text style={styles.title}>Habits</Text>
            <Button title="Add Habit" onPress={() => navigation.navigate('AddHabit')} />
            <HabitsList habits={habits} doHabit={handleDoHabit} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    habitContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
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
