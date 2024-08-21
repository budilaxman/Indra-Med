"use client"

import React from 'react'

const TASK_TYPES = [
    { label: 'Tasks Pending', count: 2 },
    { label: 'Payments to be done', count: 0 }
]

const Tasks = () => {
    return (
        <div className="w-full px-3 py-2 flex flex-col justify-start items-start gap-3 h-full">
            {TASK_TYPES.map((task, index) => (
                <TaskItem key={index} label={task.label} count={task.count} />
            ))}
        </div>
    )
}

const TaskItem = ({ label, count }) => (
    <div className="flex justify-between items-center w-full">
        <p className="text-bold text-gray-600 text-sm font-bold">{label}</p>
        <div className="bg-[#F898A3] text-center text-gray-600 rounded-sm text-sm font-bold p-2">
            {count.toString().padStart(2, '0')}
        </div>
    </div>
)

export default Tasks