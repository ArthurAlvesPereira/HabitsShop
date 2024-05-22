import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PointsContext } from './Points';

const Header = ({ totalPoints }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Total Points: {totalPoints}</Text>
  </View>
);

const Task = ({ task, toggleTaskCompletion }) => (
  <View style={styles.taskContainer}>
    <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>{task.text}</Text>
    </TouchableOpacity>
    <Text style={styles.pointsText}>{`Points: ${task.points}`}</Text>
  </View>
);

const TasksList = ({ tasks, toggleTaskCompletion }) => {
  return tasks.map(task => (
    <Task key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} />
  ));
};

const Tasks = ({ tasks, toggleTaskCompletion }) => {
  const navigation = useNavigation();
  const { totalPoints, addPoints } = useContext(PointsContext);

  useEffect(() => {
    let points = 0;
    tasks.forEach(task => {
      if (task.completed) {
        points += task.points;
      }
    });

  }, [tasks]);

  const handleToggleTaskCompletion = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      addPoints(task.points);
    }
    toggleTaskCompletion(taskId);
  };

  return (
    <View style={styles.container}>
      <Header totalPoints={totalPoints} />
      <Text style={styles.title}>Tasks</Text>
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <TasksList tasks={tasks} toggleTaskCompletion={handleToggleTaskCompletion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
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
});

export default Tasks;
