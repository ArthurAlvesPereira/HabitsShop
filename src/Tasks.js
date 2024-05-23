import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PointsContext } from './Points';
import { Colors, Styles } from './Theme';

const Header = ({ totalPoints }) => (
  <View style={Styles.headerContainer}>
    <Text style={Styles.headerText}>Pontos: {totalPoints}</Text>
  </View>
);

const Task = ({ task, toggleTaskCompletion }) => (
  <View style={styles.taskContainer}>
    <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>{task.text}</Text>
    </TouchableOpacity>
    <Text style={styles.pointsText}>{`Pontos: ${task.points}`}</Text>
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

  const handleToggleTaskCompletion = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      addPoints(task.points);
    }
    toggleTaskCompletion(taskId, () => {
      navigation.navigate('Tasks');

    });
  };

  return (
    <View style={Styles.containerDisplay}>
      <Header totalPoints={totalPoints} />
      <Text style={Styles.title}>Tarefa</Text>
      <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('AddTask')} />
      <TasksList tasks={tasks} toggleTaskCompletion={handleToggleTaskCompletion} />
    </View>
  );
};

const styles = StyleSheet.create({

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
