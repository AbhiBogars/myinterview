package toto.abhi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toto.abhi.modal.Task;
import toto.abhi.repository.TaskRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/tasks")
public class TaskController {
	
	@Autowired
	private TaskRepository taskRepository;

	@GetMapping("/hi-abhi")
	public String hiAbhi() {
		return "Hi Abhi";
	}
	
	@PostMapping
	public Task createTask(@RequestBody Task task) {

		taskRepository.save(task);
		
		return task;
		
	}
	@GetMapping("/{id}")
	public Task getTask(@PathVariable Long id, @RequestBody Task task) {
		return task;
	}
	
	@GetMapping
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}
	
	@PutMapping("/{id}")
	public Task updateTasks(@PathVariable Long id, @RequestBody Task task) {
		task.setId(id);
		return taskRepository.save(task);
	}
	
	@DeleteMapping("/{id}")
	public void deteleTask(@PathVariable Long id) {
		taskRepository.deleteById(id);
	}
	
}