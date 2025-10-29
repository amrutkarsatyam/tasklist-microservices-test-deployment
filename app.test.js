import { addTask, deleteTask, toggleComplete, tasks } from './public/app.js';

describe('Task Management Logic', () => {

    // Reset the tasks array before each test
    beforeEach(() => {
        tasks.length = 0;
    });

    test('should add a new task to the tasks array', () => {
        addTask('Learn Jest');
        expect(tasks.length).toBe(1);
        expect(tasks[0].text).toBe('Learn Jest');
        expect(tasks[0].completed).toBe(false);
    });

    test('should not add a task if the text is empty', () => {
        addTask('   '); // Add empty string
        expect(tasks.length).toBe(0);
    });

    test('should delete a task from the array', () => {
        addTask('Task to be deleted');
        const taskId = tasks[0].id;
        
        deleteTask(taskId);
        expect(tasks.length).toBe(0);
    });

    test('should toggle the completed status of a task', () => {
        addTask('Task to complete');
        const taskId = tasks[0].id;
        
        // First toggle: should become true
        toggleComplete(taskId);
        expect(tasks[0].completed).toBe(true);

        // Second toggle: should become false
        toggleComplete(taskId);
        expect(tasks[0].completed).toBe(false);
    });
});