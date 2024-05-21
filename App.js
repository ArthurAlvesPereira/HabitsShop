import { View, StyleSheet, ScrollView } from 'react-native';
import React, { Component } from 'react';
import Heading from './Heading';
import Input from './Input';
import TaskList from './TaskList';
import Button from './Button';
import TabBar from './TabBar';

//Parte de navigation

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {AddItemShop} from './src/AddItemShop';
import {TaskScreen} from './src/TaskScreen';

let taskIndex = 0;

const Tab = createMaterialBottomTabNavigator();
class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      tasks: [],
      type: 'All'
    };

    this.submitTask = this.submitTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setType = this.setType.bind(this);
  }

  inputChange(inputValue) {
    console.log('Input Value:', inputValue);
    this.setState({ inputValue });
  }

  submitTask() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return;
    }

    const task = {
      title: this.state.inputValue,
      taskIndex,
      complete: false
    };
    
    taskIndex++;
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks, inputValue: '' }, () => {
      console.log('State:', this.state);
    });
  }

  toggleComplete(taskIndex) {
    const tasks = this.state.tasks.map(task => {
      if (task.taskIndex === taskIndex) {
        return { ...task, complete: !task.complete };
      }
      return task;
    });

    this.setState({ tasks });
  }

  deleteTask(taskIndex) {
    const tasks = this.state.tasks.filter(task => task.taskIndex !== taskIndex);
    this.setState({ tasks });
  }

  setType(type) {
    this.setState({ type });
  }

  render() {
    const { inputValue, tasks, type } = this.state;

    // return (
    //   <View style={styles.container}>
    //     <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
    //       <Heading />
    //       <Input inputValue={inputValue} inputChange={(text) => this.inputChange(text)} />
    //       <TaskList type={type} toggleComplete={this.toggleComplete} deleteTask={this.deleteTask} tasks={tasks} />
    //       <Button submitTask={this.submitTask} />
    //     </ScrollView>
    //     <TabBar type={type} setType={this.setType} />
    //   </View>
    // );

    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="TaskScreen" />
          <Tab.Screen name="AddItem" component={AddItemShop} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f326e',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
