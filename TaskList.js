import React from 'react'
import { View } from 'react-native'
import Task from './Task'


const TaskList = ({ tasks, deleteTask, toggleComplete, type }) => {

    console.log('type: ', tasks)

    const getVisibleTasks = (tasks, type) => {
        switch(type){
            case 'All':
                return tasks
            case 'Complete':
                return tasks.filter((t) => t.complete)
            case 'Active':
                return tasks.filter((t) => !t.complete)
        }
    }

    tasks = getVisibleTasks(tasks, type)
   tasks = tasks.map((task, i) => {
       return (
           <Task
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                key={task.taskIndex}
                task={task} />
       )
   })


  
   return(
       <View>
           {tasks}
       </View>
   )
}


export default TaskList