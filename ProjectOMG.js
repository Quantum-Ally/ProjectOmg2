class ProjectManager {
    constructor() {
        this.projects = [];
        this.lastId = 0;
    }

    addProject(name, description) {
        const project = {
            id: ++this.lastId,
            name,
            description,
            tasks: [],
            createdAt: new Date(),
            status: 'active'
        };
        this.projects.push(project);
        return project;
    }

    getProject(id) {
        return this.projects.find(project => project.id === id);
    }

    addTask(projectId, taskName, priority = 'medium') {
        const project = this.getProject(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const task = {
            id: Date.now(),
            name: taskName,
            priority,
            completed: false,
            createdAt: new Date()
        };

        project.tasks.push(task);
        return task;
    }

    completeTask(projectId, taskId) {
        const project = this.getProject(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const task = project.tasks.find(task => task.id === taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        task.completed = true;
        task.completedAt = new Date();
        return task;
    }

    getProjectSummary(projectId) {
        const project = this.getProject(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter(task => task.completed).length;

        return {
            projectName: project.name,
            totalTasks,
            completedTasks,
            progress: totalTasks ? (completedTasks / totalTasks) * 100 : 0
        };
    }
}


const projectManager = new ProjectManager();


const newProject = projectManager.addProject(
    'Website Redesign',
    'Redesign company website with modern UI/UX'
);

// Add tasks to the project
projectManager.addTask(newProject.id, 'Design mockups', 'high');
projectManager.addTask(newProject.id, 'Develop frontend', 'high');
projectManager.addTask(newProject.id, 'Setup backend API', 'medium');
projectManager.addTask(newProject.id, 'Write documentation', 'low');


const task = projectManager.addTask(newProject.id, 'Create project plan');
projectManager.completeTask(newProject.id, task.id);


const summary = projectManager.getProjectSummary(newProject.id);
console.log('Project Summary:', summary);

export default ProjectManager;
