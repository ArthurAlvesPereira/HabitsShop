import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AddProduct from './src/AddProduct';
import AddTask from './src/AddTask';
import Tasks from './src/Tasks';
import Products from './src/Products';
import Habits from './src/Habits';
import AddHabit from './src/AddHabit';
import { PointsProvider } from './src/Points';

const Tab = createMaterialBottomTabNavigator();
const TaskStack = createStackNavigator();
const ProductStack = createStackNavigator();
const HabitsStack = createStackNavigator();

export default class App extends Component {
  state = {
    tasks: [],
    products: [],
    habits: [],
    totalPoints: 0,
  };
  
  addTask = (task) => {
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };

  toggleTaskCompletion = (taskId) => {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });
  
    const completedTask = updatedTasks.find(task => task.id === taskId && task.completed);
    const newPoints = updatedTasks.reduce((totalPoints, task) => {
      return totalPoints + (task.completed ? task.points : 0);
    }, 0);
  
    this.setState({
      tasks: updatedTasks,
      totalPoints: newPoints
    });
  
    if (completedTask) {
      alert(`Task "${completedTask.text}" completed!`)
    }
  };

  addProduct = (product) => {
    const products = [...this.state.products, product];
    this.setState({ products });
  };

  purchaseProduct = (productId) => {
    const product = this.state.products.find(p => p.id === productId);
    if (product && this.state.totalPoints >= product.price) {
      this.setState(prevState => ({
        totalPoints: prevState.totalPoints - product.price
      }));
    } else {
      alert("Not enough points to purchase this product.");
    }
  };

  addHabit = (habit) => {
    const habits = [...this.state.habits, habit];
    this.setState({ habits });
  };

  doHabit = (habitId) => {
    const habit = this.state.habits.find(h => h.id === habitId);
    if (habit) {
      const points = habit.type === "good" ? habit.points : -habit.points;
      this.setState(prevState => ({
        totalPoints: prevState.totalPoints + points
      }));
    }
  };

  TaskStackScreen = () => (
    <TaskStack.Navigator>
      <TaskStack.Screen name="Tasks">
        {(props) => <Tasks {...props} tasks={this.state.tasks} addTask={this.addTask} toggleTaskCompletion={this.toggleTaskCompletion} />}
      </TaskStack.Screen>
      <TaskStack.Screen name="AddTask">
        {(props) => <AddTask {...props} addTask={this.addTask} />}
      </TaskStack.Screen>
    </TaskStack.Navigator>
  );

  ProductStackScreen = () => (
    <ProductStack.Navigator>
      <ProductStack.Screen name="Products">
        {(props) => <Products {...props} products={this.state.products} purchaseProduct={this.purchaseProduct} />}
      </ProductStack.Screen>
      <ProductStack.Screen name="AddProduct">
        {(props) => <AddProduct {...props} addProduct={this.addProduct} />}
      </ProductStack.Screen>
    </ProductStack.Navigator>
  );

  HabitsStackScreen = () => (
    <HabitsStack.Navigator>
      <HabitsStack.Screen name="Habits">
        {(props) => <Habits {...props} habits={this.state.habits} doHabit={this.doHabit} />}
      </HabitsStack.Screen>
      <HabitsStack.Screen name="AddHabit">
        {(props) => <AddHabit {...props} addHabit={this.addHabit} />}
      </HabitsStack.Screen>
    </HabitsStack.Navigator>
  );
  
  render() {
    return (
      <PointsProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Tasks"
            component={this.TaskStackScreen}
            options={{
              tabBarLabel: 'Tasks',
            }}
          />
          <Tab.Screen
            name="Products"
            component={this.ProductStackScreen}
            options={{
              tabBarLabel: 'Products',
            }}
          />
          <Tab.Screen
            name="Habits"
            component={this.HabitsStackScreen}
            options={{
              tabBarLabel: 'Habits',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </PointsProvider>
    );
  }
}
