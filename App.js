import React, { Component } from 'react';
import { NavigationContainer, Keyboard } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AddProduct from './src/AddProduct';
import AddTask from './src/AddTask';
import Tasks from './src/Tasks';
import Products from './src/Products';
import Habits from './src/Habits';
import AddHabit from './src/AddHabit';
import { PointsProvider } from './src/Points';
import { Colors } from './src/Theme';

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

  toggleTaskCompletion = (taskId, callback) => {
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
    if (callback) {
      callback();
    }

    if (completedTask) {
      alert(`Tarefa "${completedTask.text}" Concluida!`);
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
      alert("S", "Product purchased successfully!");
    } else {
      alert("Error", "Not enough points to purchase this product.");
    }
  };

  addHabit = (habit) => {
    const habits = [...this.state.habits, habit];
    this.setState({ habits });
  };

  doHabit = (habitId) => {
    const habit = this.state.habits.find(h => h.id === habitId);
    if (habit) {
      const points = habit.type === "Bom" ? habit.points : -habit.points;
      this.setState(prevState => ({
        totalPoints: prevState.totalPoints + points
      }));
    }
  };

  TaskStackScreen = () => (
    <TaskStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.background },
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.dark,
      }}>
      <TaskStack.Screen name="Tasks"
        options={{ title: 'Tarefas' }}>
        {(props) => <Tasks {...props} tasks={this.state.tasks} addTask={this.addTask} toggleTaskCompletion={this.toggleTaskCompletion} />}
      </TaskStack.Screen>
      <TaskStack.Screen name="AddTask"
        options={{ title: 'Adicionar Tarefa' }
        }>
        {(props) => <AddTask {...props} addTask={this.addTask} />}
      </TaskStack.Screen>
    </TaskStack.Navigator>
  );

  ProductStackScreen = () => (
    <ProductStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.background },
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.dark,
      }}>
      <ProductStack.Screen name="Products"
      
        options={{ title: 'Recompensas' }}>
        {(props) => <Products {...props} products={this.state.products} purchaseProduct={this.purchaseProduct} totalPoints={this.state.totalPoints} />}
      </ProductStack.Screen>
      <ProductStack.Screen name="AddProduct"
        options={{ title: 'Adicionar Recompensa' }}>
        {(props) => <AddProduct {...props} addProduct={this.addProduct} />}
      </ProductStack.Screen>
    </ProductStack.Navigator>
  );

  HabitsStackScreen = () => (
    <HabitsStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.background },
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.dark,
      }}>
      <HabitsStack.Screen name="Habits"
        options={{ title: 'Habitos' }}>
        {(props) => <Habits {...props} habits={this.state.habits} doHabit={this.doHabit} />}
      </HabitsStack.Screen>
      <HabitsStack.Screen name="AddHabit"
        options={{ title: 'Adicionar Habitos' }}>
        {(props) => <AddHabit {...props} addHabit={this.addHabit} />}
      </HabitsStack.Screen>
    </HabitsStack.Navigator>
  );

  render() {
    return (
      <PointsProvider>
        <NavigationContainer>
          <Tab.Navigator
            shifting={false}
            initialRouteName='Tasks'
            barStyle={{ backgroundColor: Colors.dark }}
            activeColor= {Colors.light}
            inactiveColor= {Colors.light}
            screenOptions={{
              tabBarStyle: { borderTopWidth: 2, borderTopColor: '#000000' }

            }}
          >
            <Tab.Screen
              name="Habits"
              component={this.HabitsStackScreen}
              options={{
                tabBarLabel: 'Habitos',
              }}
            />
            <Tab.Screen
              name="Tasks"
              component={this.TaskStackScreen}
              options={{
                tabBarLabel: 'Tarefas',
              }}
            />
            <Tab.Screen
              name="Recompensas"
              component={this.ProductStackScreen}
              options={{
                tabBarLabel: 'Loja',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PointsProvider>
    );
  }
}
