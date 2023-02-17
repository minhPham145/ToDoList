import React, { Component } from 'react';
import { Container } from '../Components/Container';
import { ThemeProvider } from 'styled-components';
import { Dropdown } from '../Components/Dropdown';
import { Heading3 } from '../Components/Heading';
import { TextField } from '../Components/TextField';
import { Button } from '../Components/Button';
import { Hr } from '../Components/Hr';
import { Table, Thead, Tr, Th } from '../Components/Table';
import { connect } from 'react-redux';
import { addTaskAction, changThemeAction, deleteTaskAction, doneTaskAction, editTaskAction, updateTaskAction } from '../redux/actions/ToDoListActions';
import { arrTheme } from '../Theme/ThemeManager';

class ToDoList extends Component {
	state = {
		taskName: '',
		disabled: true,
	};

	renderTaskToDo = () => {
		return this.props.taskList
			.filter(task => !task.done)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th>{task.taskName}</Th>
						<Th className='text-right'>
							<Button
								className='ml-1'
								onClick={() => {
									this.setState({ disabled: false }, () => {
										this.props.dispatch(editTaskAction(task));
									});
								}}>
								<i className='fa fa-edit'></i>
							</Button>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(doneTaskAction(task.id));
								}}>
								<i className='fa fa-check'></i>
							</Button>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(deleteTaskAction(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};

	renderTaskComplete = () => {
		return this.props.taskList
			.filter(task => task.done)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th>{task.taskName}</Th>
						<Th className='text-right'>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(deleteTaskAction(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};

	renderTheme = () => {
		return arrTheme.map((theme, index) => {
			return (
				<option key={index} value={theme.id}>
					{theme.name}
				</option>
			);
		});
	};
	render() {
		return (
			<ThemeProvider theme={this.props.themeToDoList}>
				<Container className='w-50'>
					<Dropdown
						className='mb-2'
						onChange={e => {
							let { value } = e.target;
							this.props.dispatch(changThemeAction(value));
						}}>
						{this.renderTheme()}
					</Dropdown>
					<Heading3>To do list</Heading3>
					<TextField
						value={this.state.taskName}
						name='taskName'
						label='Task name'
						className='w-50'
						onChange={e => {
							this.setState({ taskName: e.target.value });
						}}></TextField>
					<Button
						className='ml-2'
						onClick={() => {
							let { taskName } = this.state;
							let newTask = {
								id: Date.now(),
								taskName: taskName,
								done: false,
							};
							this.props.dispatch(addTaskAction(newTask));
						}}>
						<i className='fa fa-plus'></i> Add task
					</Button>
					{this.state.disabled ? (
						<Button
							disabled
							className='ml-2'
							onClick={() => {
								this.props.dispatch(updateTaskAction(this.state.taskName));
							}}>
							<i className='fa fa-upload'></i> Update task
						</Button>
					) : (
						<Button
							className='ml-2'
							onClick={() => {
								let { taskName } = this.state;
								this.setState({ disabled: true, taskName: '' }, () => {
									this.props.dispatch(updateTaskAction(taskName));
								});
							}}>
							<i className='fa fa-upload'></i> Update task
						</Button>
					)}

					<Hr></Hr>
					<Heading3>Task to do</Heading3>
					<Table>
						<Thead>{this.renderTaskToDo()}</Thead>
					</Table>
					<Heading3>Task complete</Heading3>
					<Table>
						<Thead>{this.renderTaskComplete()}</Thead>
					</Table>
				</Container>
			</ThemeProvider>
		);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
			this.setState({
				taskName: this.props.taskEdit.taskName,
			});
		}
	}
}

const mapStateToProps = state => {
	return {
		themeToDoList: state.ToDoListReducer.themeToDoList,
		taskList: state.ToDoListReducer.taskList,
		taskEdit: state.ToDoListReducer.taskEdit,
	};
};
export default connect(mapStateToProps)(ToDoList);
